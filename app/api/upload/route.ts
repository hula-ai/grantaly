import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';
import { uploadSchema } from '@/Validation/Server/validator';

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Disable Next.js's default body parser to use formidable
export const config = {
  api: {
    bodyParser: false,  // Disable body parsing to handle file upload manually
  },
};

export async function POST(req: Request) {
  try {
    // Parse the form data
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get('file');

    // Check if a file is received
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    // Extract the file buffer and metadata (file name, MIME type)
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileType = file.type;

    // Validate file metadata
    const { error } = uploadSchema.validate({ fileName, fileType });
    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    // Prepare S3 upload parameters
    const s3Params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `grantaly/${Date.now()}_${fileName}`,  // Use a unique key for the file
      Body: fileBuffer,  // File buffer
      ContentType: fileType,  // MIME type
    };

    // Wrap the S3 upload in a Promise to resolve and return the response correctly
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (uploadErr, data) => {

        if (uploadErr) {
          console.error('Error uploading to S3:', uploadErr);
          resolve(NextResponse.json({ error: 'S3 upload error' }, { status: 500 }));
        }

        // Return the uploaded file's URL and S3 key
        resolve(NextResponse.json({
          url: data.Location,
          key: s3Params.Key,
          fileName: fileName,  // Include the file name in the response
        }, { status: 200 }));
      });
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
