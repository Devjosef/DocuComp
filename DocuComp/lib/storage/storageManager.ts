import AWS from 'aws-sdk';

// Sanitize inputs to prevent injection attacks
function sanitizePath(inputPath: string): string {
  return inputPath.replace(/[^a-zA-Z0-9-_./]/g, '');
}

class S3StorageManager {
  private s3: AWS.S3;

  // Constructor with dependency injection for better flexibility and testability
  constructor(s3Client: AWS.S3) {
    this.s3 = s3Client;
  }

  async uploadFile(path: string, file: File): Promise<AWS.S3.ManagedUpload.SendData> {
    const sanitizedPath = sanitizePath(path);
    const params = {
      Bucket: 'docucomp-storage',
      Key: sanitizedPath,
      Body: file,
      ACL: 'private-read'
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (error) {
      console.error(`S3 Upload failed for path: ${path} with error: ${error.message}`, error);
      throw new Error(`S3 Upload failed: ${error.message}`);
    }
  }

  async downloadFile(path: string): Promise<AWS.S3.Body> {
    const sanitizedPath = sanitizePath(path);
    const params = {
      Bucket: 'docucomp-storage',
      Key: sanitizedPath
    };

    try {
      const data = await this.s3.getObject(params).promise();
      if (!data.Body) {
        throw new Error('No file body received');
      }
      return data.Body;
    } catch (error) {
      console.error(`S3 Download failed for path: ${path} with error: ${error.message}`, error);
      throw new Error(`S3 Download failed: ${error.message}`);
    }
  }
}

// Initialize AWS S3 client with necessary configurations
const s3Client = new AWS.S3({
  accessKeyId: process.env.SUPABASE_S3_CONNECTION_ACCESS_KEY,
  secretAccessKey: process.env.SUPABASE_S3_CONNECTION_SECRET_ACCESS_KEY,
  endpoint: new AWS.Endpoint('https://aysaoorhpttrwvxqmuiu.supabase.co/storage/v1/s3'),
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});

// Create an instance of S3StorageManager with the configured S3 client
export const storageManager = new S3StorageManager(s3Client);
