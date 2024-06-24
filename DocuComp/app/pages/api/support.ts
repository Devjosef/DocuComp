import type { NextApiRequest, NextApiResponse } from 'next';
import { handleSupportQuery } from '../../../services/supportService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const response = await handleSupportQuery(query);
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};