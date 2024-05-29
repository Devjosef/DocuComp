import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Types for document payload and OAuth response
interface DocumentPayload {
  id: number;
  title: string;
  content: string;
}

interface OAuthResponse {
  user: User | null;
  session: Session | null;
}

// Function to handle OAuth sign-in
export async function signInWithOAuth(provider: 'github' | 'google'): Promise<OAuthResponse> {
  const { user, session, error } = await supabase.auth.signIn({ provider });

  if (error) {
    console.error('Error during OAuth sign-in:', error.message);
    throw error;
  }

  return { user, session };
}

// Function to subscribe to document changes
export function subscribeToDocuments(): { unsubscribe: () => void } {
  const subscription = supabase
    .from<DocumentPayload>('documents')
    .on('*', (event: string, payload: DocumentPayload) => {
      console.log('Change received!', event, payload);
    })
    .subscribe();
  // Return an object with an unsubscribe method to properly manage the subscription lifecycle
  return {
    unsubscribe: () => subscription.unsubscribe()
  };
}

// Example usage of subscription in a React component (for reference)
/*
useEffect(() => {
  const { unsubscribe } = subscribeToDocuments();

  return () => {
    unsubscribe();
  };
}, []);
*/

// Function to fetch custom data from a specified table
export async function fetchCustomData(tableName: string): Promise<any> {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    console.error('Error fetching data from', tableName, ':', error.message);
    throw error;
  }

  return data;
}
