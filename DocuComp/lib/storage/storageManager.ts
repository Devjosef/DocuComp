import AWS from 'aws-sdk';

// Initialize S3 client with specific configurations for Supabase S3-like storage
const s3 = new AWS.S3({
    accessKeyId: process.env.SUPABASE_S3_CONNECTION_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_S3_CONNECTION_SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint('https://aysaoorhpttrwvxqmuiu.supabase.co/storage/v1/s3'),
    s3ForcePathStyle: true, // This is necessary for compatibility with Supabase's S3-like storage
    signatureVersion: 'v4'
});

// Uploads a file directly to S3 using the AWS SDK. This function handles the file upload process,
// setting the appropriate access control list (ACL) depending on your bucket's policy.
export const uploadFileS3 = async (path: string, file: File) => {
    const params = {
        Bucket: 'docucomp-storage',
        Key: path,
        Body: file,
        ACL: 'private-read' // Change to 'private' if you require restricted access
    };

    try {
        const data = await s3.upload(params).promise();
        return data;
    } catch (error) {
        console.error(`S3 Upload failed: ${error.message}`, error);
        throw new Error(`S3 Upload failed: ${error.message}`);
    }
};

// Downloads a file directly from S3 using the AWS SDK. This function retrieves the file
// specified by the 'path' parameter from the designated bucket.
export const downloadFileS3 = async (path: string) => {
    const params = {
        Bucket: 'docucomp-storage',
        Key: path
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body;
    } catch (error) {
        console.error(`S3 Download failed: ${error.message}`, error);
        throw new Error(`S3 Download failed: ${error.message}`);
    }
};