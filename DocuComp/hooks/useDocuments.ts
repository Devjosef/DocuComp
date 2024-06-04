import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const fetchDocuments = async () => {
  const { data, error } = await supabase.from('documents').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const useDocuments = () => {
  return useQuery('documents', fetchDocuments, {
    staleTime: 5000,  // Adjust based on your needs
    cacheTime: 10000, // Adjust based on your needs
  });
};