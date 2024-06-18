import { supabase } from '../utils/supabaseClient'

export const uploadProfilePicture = async (file) => {
  try {
    // Upload logic
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error('Upload failed');
  }
};

export const removeUserFromCompany = async (userId) => {
  try {
    const { error } = await supabase.from('users').delete().match({ id: userId });
    if (error) throw error;
  } catch (error) {
    console.error('Removal failed:', error);
    throw new Error('Removal failed');
  }
};