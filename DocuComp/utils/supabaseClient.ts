import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';


const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const subscribeToDocuments = () => {
    const subscription = supabase
        .from('documents')
        .on('INSERT', payload => {
            console.log('Change received:', payload);
        })
        .subscribe();

    return {
        unsubscribe: () => subscription.unsubscribe()
    };
};