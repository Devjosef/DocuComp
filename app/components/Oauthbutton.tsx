import React from 'react';
import { signInWithGitHub, signInWithGoogle } from '../../lib/auth/oauthHandlers';

const OAuthButton = ({ provider }: { provider: string }) => {
  const handleAuth = () => {
    if (provider === 'github') {
      signInWithGitHub();
    } else if (provider === 'google') {
      signInWithGoogle();
    }
  };

  return (
    <button onClick={handleAuth}>
      Sign in with {provider}
    </button>
  );
};

export default OAuthButton;