import { WebClient } from '@slack/web-api';
import { slackConfig } from './config';

const slackClient = new WebClient(slackConfig.token);

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