import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

type User = {
  id: string;
  email: string;
  imageUrl?: string;
} | null;

const useUserServices = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const imageUrl = session.user.user_metadata.avatar_url || session.user.user_metadata.picture;
        setUser({
          id: session.user.id,
          email: session.user.email || '', // Ensuring email is always a string
          imageUrl: imageUrl || '' // Ensuring imageUrl is always a string
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email || '', // Ensuring email is always a string
          imageUrl: session.user.user_metadata.avatar_url || session.user.user_metadata.picture || '' // Ensuring imageUrl is always a string
        });
      } else {
        setUser(null);
      }
    });
  
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, error };
};

export default useUserServices;
