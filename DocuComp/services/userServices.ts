import { supabase } from '../utils/supabaseClient';

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

export const fetchUserActivities = async () => {
  try {
    const { data, error } = await supabase.from('activities').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Fetching activities failed:', error);
    throw new Error('Fetching activities failed');
  }
};

export const fetchUserMetrics = async () => {
  try {
    const { data, error } = await supabase.rpc('get_user_metrics');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Fetching user metrics failed:', error);
    throw new Error('Fetching user metrics failed');
  }
};

export const userServices = {
  uploadProfilePicture,
  removeUserFromCompany,
  fetchUserActivities,
  fetchUserMetrics,
};

export default userServices;