import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const response = await fetch('http://localhost:3000/api/fetchContentfulData');
        const data = await response.json();
        res.status(200).json(data);
    }
}
