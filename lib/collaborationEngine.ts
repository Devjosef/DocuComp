import { supabase } from '../utils/supabaseClient';

export const subscribeToDocumentChanges = (documentId: number, callback: (changes: any) => void) => {
    const subscription = supabase
        .channel('documents')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'documents' }, payload => {
            if (payload.new.id === documentId) {
                callback(payload.new);
            }
        })
        .subscribe();
    return {
        unsubscribe: () => {
            subscription.unsubscribe();
        }
    };
};

export const updateDocumentContent = async (documentId: number, content: string) => {
    const { data, error } = await supabase
        .from('documents')
        .update({ content })
        .match({ id: documentId });

    if (error) {
        console.error('Error updating document:', error);
        throw new Error(`Error updating document: ${error.message}`);
    }
    return data;
};