import { Client } from '@microsoft/microsoft-graph-client';
import { teamsConfig } from './config';

// Initialize Microsoft Graph client
const client = Client.init({
  authProvider: (done) => {
    const appPassword = teamsConfig.appPassword || ''; // Ensure appPassword is not undefined
    done(null, appPassword);
  },
});

// Example function to send a message to a Teams channel
async function sendMessage(teamId: string, message: string) {
  try {
    const result = await client.api(`/teams/${teamId}/sendActivity`).post({ message });
    return result;
  } catch (error) {
    console.error('Microsoft Teams API error:', error);
    throw error;
  }
}

export { sendMessage };