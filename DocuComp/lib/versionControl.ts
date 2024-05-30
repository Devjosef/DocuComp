import { supabase } from './supabaseClient';

export const fetchDocumentVersions = async (documentId: number, page: number, limit: number = 10) => {
    const { data, error } = await supabase
      .from('document_versions')
      .select('*')
      .eq('document_id', documentId)
      .range(page * limit, (page + 1) * limit - 1)
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('Error retrieving document versions:', error);
      throw error;
    }
    return data;
  };

export const getDocumentVersions = async (documentId: number) => {
    const { data, error } = await supabase
        .from('document_versions')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error retrieving document versions:', error);
        throw error;
    }
    return data;
};