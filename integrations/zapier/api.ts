import axios from 'axios';
import { zapierConfig } from './config';

// Example function to trigger a Zapier webhook
async function triggerWebhook(data: any) {
  if (!zapierConfig.webhookUrl) {
    throw new Error('Webhook URL is undefined.');
  }
  try {
    const response = await axios.post(zapierConfig.webhookUrl, data);
    return response.data;
  } catch (error) {
    console.error('Zapier API error:', error);
    throw error;
  }
}
export { triggerWebhook };
