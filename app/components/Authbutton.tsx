import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface AuthButtonProps {
  provider: 'github' | 'google';
}

interface OAuthResponse {
  user?: {
    id: string;
    email: string;
    // Add other user properties as needed
  };
  session?: {
    accessToken: string;
    // Add other session properties as needed
  };
}

const AuthButton: React.FC<AuthButtonProps> = ({ provider }) => {
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider
      }) as { data: OAuthResponse, error: any };

      if (error) throw error;

      const user = data.user;
      const session = data.session;

      console.log('Signed in user:', user || 'User data not available');
      // TODO: Redirect or update UI here, e.g., navigate to a dashboard
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Check if error has a message property
      if (typeof error === 'object' && error !== null && 'message' in error) {
        alert('Failed to sign in: ' + error.message);
      } else {
        alert('Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAuth} disabled={loading}>
      {loading ? 'Signing in...' : `Sign in with ${provider}`}
    </button>
  );
};

export default AuthButton;

