import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';
import { uploadSchema } from '@/Validation/Server/validator';
import { File } from 'buffer';

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(req: Request): Promise<Response> {
  try {
    // Parse the form data
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get('file');

    // Check if a file is received
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    // Check if the received file is a valid File object
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Uploaded data is not a valid file." }, { status: 400 });
    }

    // Extract the file buffer and metadata (file name, MIME type)
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name; // File name (e.g., 'document.pdf')
    const fileType = file.type; // MIME type (e.g., 'application/pdf')

    // Validate file metadata using a validation schema (if you have one)
    const { error } = uploadSchema.validate({ fileName, fileType });
    if (error) {
      return NextResponse.json({ error: error.details[0].message }, { status: 400 });
    }

    // Prepare S3 upload parameters
    const s3Params = {
      Bucket: process.env.AWS_BUCKET!, // Ensure this is set correctly in your environment
      Key: `grantaly/${Date.now()}_${fileName}`, // Use a unique key for the file
      Body: fileBuffer, // File buffer
      ContentType: fileType, // MIME type
    };

    // Perform the S3 upload
    const uploadResult = await s3.upload(s3Params).promise();

    // Return the uploaded file's URL and S3 key
    return NextResponse.json(
      {
        url: uploadResult.Location,
        key: s3Params.Key,
        name: fileName, // Include the file name in the response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
