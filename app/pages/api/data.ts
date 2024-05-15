import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from('your-table')
    .select('*');

  if (error) return res.status(401).json({ error: 'Unauthorized' });
  res.status(200).json(data);
}