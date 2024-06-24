import { useQuery } from 'react-query';
import { cache } from '../utils/caching';
import { supabase } from '../utils/supabaseClient';

// Fetch documents from the database, with caching to improve performance.
const fetchDocuments = async () => {
  try {
    const cachedData = cache.get('documents');
    if (cachedData) return cachedData;

    const { data, error } = await supabase.from('documents').select('*');
    if (error) throw new Error(error.message);
    cache.set('documents', data, 3600); // Cache for 1 hour
    return data;
  } catch (err) {
    console.error('Failed to fetch documents:', err);
    throw err;
  }
};

export const useDocuments = () => {
  return useQuery('documents', fetchDocuments);
};