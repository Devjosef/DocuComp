import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const subscribeToDocuments = () => {
    const subscription = supabase
        .from('documents')
        .on('INSERT', (payload: any) => { // Add type annotation
            console.log('New document inserted:', payload);
        })
        .subscribe();
    return subscription;
};
