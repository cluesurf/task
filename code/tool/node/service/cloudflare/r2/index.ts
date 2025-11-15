import 'dotenv/config'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createReadStream } from 'fs'
import { basename } from 'path'

// R2 configuration
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || ''
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || ''
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || ''
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || ''

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto', // R2 uses 'auto' as region
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

/**
 * Upload a file to Cloudflare R2
 * @param filePath - Path to the file to upload
 * @param key - Object key in R2 (optional, defaults to filename)
 * @param contentType - MIME type of the file (optional)
 */
export async function uploadFileToR2(
  filePath: string,
  key?: string,
  contentType?: string,
): Promise<void> {
  try {
    // If key is not provided, use the file name
    const objectKey = key || basename(filePath)

    // Create a read stream for the file
    const fileStream = createReadStream(filePath)

    // Prepare the upload command
    const uploadParams = {
      Bucket: R2_BUCKET_NAME,
      Key: objectKey,
      Body: fileStream,
      ContentType: contentType,
    }

    console.log(
      `Uploading ${filePath} to R2 bucket ${R2_BUCKET_NAME} as ${objectKey}...`,
    )

    // Execute the upload
    const command = new PutObjectCommand(uploadParams)
    const response = await s3Client.send(command)

    console.log('Upload successful:', response)
  } catch (error) {
    console.error('Error uploading file to R2:', error)
    throw error
  }
}

// // Example usage
// async function main() {
//   const args = process.argv.slice(2)

//   if (args.length < 1) {
//     console.error(
//       'Usage: node dist/upload.js <filePath> [objectKey] [contentType]',
//     )
//     process.exit(1)
//   }

//   const [filePath, objectKey, contentType] = args

//   try {
//     await uploadFileToR2(filePath, objectKey, contentType)
//     console.log('File uploaded successfully!')
//   } catch (error) {
//     console.error('Upload failed:', error)
//     process.exit(1)
//   }
// }

// main()
