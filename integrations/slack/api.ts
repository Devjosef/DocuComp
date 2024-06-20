import { WebClient } from '@slack/web-api';
import { slackConfig } from './config';

// Initialize Slack client with bot token from configuration
const slackClient = new WebClient(slackConfig.botToken);

// Example function to send a message to a Slack channel
async function sendMessage(channelId: string, message: string) {
  try {
    // Post a message to the specified Slack channel
    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: message,
    });
    return result;
  } catch (error) {
    // Handle error if Slack API call fails
    console.error('Slack API error:', error);
    throw error;
  }
}

export { sendMessage };