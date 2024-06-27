import openai from './openaiconfig';

export const checkCompliance = async (documentContent: string): Promise<string> => {
  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `Check the following document for compliance with regulation XYZ:\n\n${documentContent}\n\nCompliance Status:`,
      max_tokens: 50,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error during compliance check:', error);
    throw new Error('Failed to check compliance');
  }
};
