import { useState } from 'react';
import { uploadProfilePicture, removeUserFromCompany } from '../services/userServices';

const useUserServices = () => {
  const [error, setError] = useState('');

  const handleUploadProfilePicture = async (file) => {
    try {
      await uploadProfilePicture(file);
    } catch (err) {
      setError('Failed to upload profile picture. Please try again.');
    }
  };

  const handleRemoveUserFromCompany = async (userId) => {
    try {
      await removeUserFromCompany(userId);
    } catch (err) {
      setError('Failed to remove user from company. Please try again.');
    }
  };

  return {
    error,
    handleUploadProfilePicture,
    handleRemoveUserFromCompany
  };
};

export default useUserServices;