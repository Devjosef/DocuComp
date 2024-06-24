import { OpenAIApi, Configuration } from 'openai';
import nodemailer from 'nodemailer';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SUPPORT_EMAIL,
    pass: process.env.SUPPORT_EMAIL_PASSWORD,
  },
});

export const handleSupportQuery = async (query: string): Promise<string> => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Answer the following support query:\n\n${query}\n\nResponse:`,
      max_tokens: 150,
    });

    const aiResponse = response.data.choices[0].text.trim();

    if (aiResponse.toLowerCase().includes('i don\'t know')) {
      await transporter.sendMail({
        from: process.env.SUPPORT_EMAIL,
        to: process.env.SUPPORT_FALLBACK_EMAIL,
        subject: 'Support Query Escalation',
        text: `The AI was unable to answer the following query:\n\n${query}`,
      });

      return 'Your query has been escalated to our support team. You will receive a response shortly.';
    }

    return aiResponse;
  } catch (error) {
    console.error('Error during support query handling:', error);
    throw new Error('Failed to handle support query');
  }
}

export default handleSupportQuery;
