import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

interface DocumentPayload {
  id: number;
  title: string;
  content: string;
  // add other properties as needed
}

const mySubscription = supabase
  .from<DocumentPayload>('documents')
  .on('*', payload => {
    console.log('Change received!', payload);
  })
  .subscribe();
