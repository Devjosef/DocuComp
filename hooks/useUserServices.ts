import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

type User = {
  id: string;
  email: string;
  imageUrl?: string;
  role?: string; // Add role property
} | null;

const useUserServices = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        try {
          const imageUrl = session.user.user_metadata.avatar_url || session.user.user_metadata.picture;
          const role = session.user.user_metadata.role || 'Viewer'; // Default role
          setUser({
            id: session.user.id,
            email: session.user.email || '', // Ensuring email is always a string
            imageUrl: imageUrl || '', // Ensuring imageUrl is always a string
            role: role // Set role
          });
        } catch (err) {
          setError('Failed to fetch user metadata');
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = user?.role === 'Admin'; // Determine if the user is an admin

  return { user, isAdmin, error };
};

export default useUserServices;