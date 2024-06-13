import { WebClient } from '@slack/web-api';
import { slackConfig } from './config';

const slackClient = new WebClient(slackConfig.token);

export const notifyDocumentUpdate = async (channel: string, message: string, documentId: string) => {
    const messageContent = `${message} for document ID: ${documentId}`;
    return sendSlackMessage(channel, messageContent);
};
export const sendSlackMessage = async (channel: string, message: string) => {
    try {
        const result = await slackClient.chat.postMessage({
            channel,
            text: message,
        });
        console.log('Message sent: ', result.ts);
    } catch (error) {
        console.error('Slack API error: ', error);
    }
};