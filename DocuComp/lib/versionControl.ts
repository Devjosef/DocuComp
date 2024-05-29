import { supabase } from './supabaseClient';

export const saveDocumentVersion = async (documentId: number, content: string, userId: number) => {
    const { data, error } = await supabase
        .from('document_versions')
        .insert([{ document_id: documentId, content, user_id: userId }]);

    if (error) {
        console.error('Error saving document version:', error);
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