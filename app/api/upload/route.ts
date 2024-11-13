// src/controllers/uploadController.ts
import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const generatePresignedUrl = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'File name and type are required' });
  }

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${fileName}`,
    Expires: 60, // URL expiration time in seconds
    ContentType: fileType,
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
    res.status(200).json({ presignedUrl, key: s3Params.Key });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Could not generate presigned URL' });
  }
};
