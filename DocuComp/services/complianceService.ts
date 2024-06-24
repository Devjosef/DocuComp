import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const checkCompliance = async (documentContent: string): Promise<string> => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Check the following document for compliance with regulation XYZ:\n\n${documentContent}\n\nCompliance Status:`,
      max_tokens: 50,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error during compliance check:', error);
    throw new Error('Failed to check compliance');
  }
};
