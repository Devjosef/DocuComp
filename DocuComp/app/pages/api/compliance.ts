import type { NextApiRequest, NextApiResponse } from 'next';
import { checkCompliance } from '../../../services/complianceService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { documentContent } = req.body;

    try {
      const complianceStatus = await checkCompliance(documentContent);
      res.status(200).json({ complianceStatus });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};