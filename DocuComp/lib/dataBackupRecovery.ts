import { uploadFileS3, downloadFileS3 } from './storage/storageManager';

// Function to handle data backup using S3
export async function backupData(data: string, path: string) {
    const file = new File([data], "backup.txt", { type: 'text/plain' });
    return await uploadFileS3(path, file);
}

// Function to recover data from backup using S3
export async function recoverData(path: string): Promise<string | undefined> {
    const response = await downloadFileS3(path);
    if (response !== undefined) {
        const file = new Blob([response as BlobPart]); // Ensure response is handled correctly as a Blob
        return file.text();
    }
    return undefined;
}
