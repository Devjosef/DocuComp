import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { removeUserFromCompany, updateUserProfile } from '../services/userServices';

const useUserServices = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const session = supabase.auth.session();

    if (session) {
      setUser({
        ...session.user,
        imageUrl: session.user.user_metadata.avatar_url // Use OAuth provider's avatar URL
      });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          ...session.user,
          imageUrl: session.user.user_metadata.avatar_url
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      const { subscription } = supabase.auth.onAuthStateChange((_event, _session) => {});
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleRemoveUserFromCompany = async (userId) => {
    try {
      await removeUserFromCompany(userId);
    } catch (err) {
      setError('Failed to remove user from company. Please try again.');
    }
  };

  const handleUpdateUserProfile = async (userId, profileData) => {
    try {
      await updateUserProfile(userId, profileData);
    } catch (err) {
      setError('Failed to update user profile. Please try again.');
    }
  };

  return {
    user,
    error,
    handleRemoveUserFromCompany,
    handleUpdateUserProfile
  };
};

export default useUserServices;
