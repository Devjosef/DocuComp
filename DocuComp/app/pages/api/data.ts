import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

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
// Example of setting up a callback URL in an OAuth setup
supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: 'http://localhost:3000/api/callback' // This is an example callback URL
  }
});
