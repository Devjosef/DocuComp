import { supabase } from './supabaseClient';

export const archiveDocument = async (documentId: number) => {
    const { data, error } = await supabase
        .from('documents')
        .update({ archived: true })
        .match({ id: documentId });
    if (error) {
        console.error('Error archiving document:', error);
        throw error;
    }
    return data;
};

export const retrieveArchivedDocument = async (documentId: number) => {
    const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .eq('archived', true);
    if (error) {
        console.error('Error retrieving archived document:', error);
        throw error;
    }
    return data;
};