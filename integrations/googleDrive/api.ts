import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    driveConfig.clientId,
    driveConfig.clientSecret,
    'redirect-uri'
);

export const generateAuthUrl = () => {
    const scopes = ['https://www.googleapis.com/auth/drive'];
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
};