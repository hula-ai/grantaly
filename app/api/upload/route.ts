import formidable from 'formidable';
import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';
import { uploadSchema } from '@/Validation/Server/validator';

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Disable Next.js's default body parser to use formidable
export const config = {
  api: {
    bodyParser: false,  // Disable body parsing to handle file upload manually
  },
};

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();  // This should work after correcting the import

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return resolve(NextResponse.json({ error: 'Form parsing error' }, { status: 400 }));
      }

      // Extract file and metadata
      const file = files.file as formidable.File; // Ensure the file is being extracted correctly
      const fileName = file.originalFilename || file.newFilename;  // Get file name
      const fileType = file.mimetype;  // Get the mime type of the file

      // Validate file metadata
      const { error } = uploadSchema.validate({ fileName, fileType });
      if (error) {
        return resolve(NextResponse.json({ error: error.details[0].message }, { status: 400 }));
      }

      // Prepare parameters for S3 upload
      const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}_${fileName}`,
        Body: file.stream,  // Use the file stream directly
        ContentType: fileType,
      };

      // Upload the file to S3
      s3.upload(s3Params, (uploadErr, data) => {
        if (uploadErr) {
          console.error('Error uploading to S3:', uploadErr);
          return resolve(NextResponse.json({ error: 'S3 upload error' }, { status: 500 }));
        }

        // Return the uploaded file's URL, S3 key, and file name
        return resolve(NextResponse.json({
          url: data.Location, 
          key: s3Params.Key,
          fileName: fileName  // Include the file name in the response
        }, { status: 200 }));
      });
    });
  }).catch((error) => {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  });
}
