import { google } from 'googleapis';
import { driveConfig } from './config';

const oauth2Client = new google.auth.OAuth2(
    driveConfig.clientId,
    driveConfig.clientSecret,
    'redirect-uri'
);

const googleDrive = google.drive({ version: 'v3', auth: oauth2Client });

export const importDocument = async (fileId: string) => {
    return googleDrive.files.get({ fileId, alt: 'media' });
};

export const exportDocument = async (documentContent: Buffer, fileName: string) => {
    const fileMetadata = {
        name: fileName,
        mimeType: 'application/vnd.google-apps.document',
    };
    return googleDrive.files.create({
        requestBody: fileMetadata,
        media: {
            mimeType: 'text/plain',
            body: documentContent,
        },
    });
};
export const generateAuthUrl = () => {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
};