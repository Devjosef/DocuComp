import { supabase } from '../supabaseClient';

export const signInWithGitHub = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'github'
  });
  // Handle response, error, etc.
};

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google'
  });
  // Handle response, error, etc.
};