import { google } from 'googleapis';
import { driveConfig } from './config';

class GoogleDriveAPI {
  private googleDrive;

  constructor(oauthClient) {
    this.googleDrive = google.drive({ version: 'v3', auth: oauthClient });
  }

  async importDocument(fileId: string) {
    try {
      return await this.googleDrive.files.get({ fileId, alt: 'media' });
    } catch (error) {
      console.error('Failed to import document from Google Drive:', error);
      throw error;
    }
  }

  async exportDocument(documentContent: Buffer, fileName: string) {
    const fileMetadata = {
      name: fileName,
      mimeType: 'application/vnd.google-apps.document',
    };
    try {
      return await this.googleDrive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: 'text/plain',
          body: documentContent,
        },
      });
    } catch (error) {
      console.error('Failed to export document to Google Drive:', error);
      throw error;
    }
  }
}

const oauth2Client = new google.auth.OAuth2(
  driveConfig.clientId,
  driveConfig.clientSecret,
  'redirect-uri'
);
const googleDriveAPI = new GoogleDriveAPI(oauth2Client);
export default googleDriveAPI;