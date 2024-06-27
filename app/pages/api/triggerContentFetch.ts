import { NextApiRequest, NextApiResponse } from 'next/types';
import { fetchContentfulEntry } from '../../../services/contentService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const entryId = req.body.entryId; // Ensure entryId is passed correctly
            const entry = await fetchContentfulEntry(entryId);
            res.status(200).json(entry);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
}

