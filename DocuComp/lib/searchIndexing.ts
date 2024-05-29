import { supabase } from './supabaseClient';

export const updateSearchIndex = async (documentId: number, content: string) => {
    const { data, error } = await supabase
        .rpc('update_search_index', { doc_id: documentId, doc_content: content });
    if (error) {
        console.error('Error updating search index:', error);
        throw error;
    }
    return data;
};