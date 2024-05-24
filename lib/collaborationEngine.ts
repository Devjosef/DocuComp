import { supabase } from './supabaseClient';

export const subscribeToDocumentChanges = (documentId: number, callback: (changes: any) => void) => {
    const subscription = supabase
        .from(`documents:id=eq.${documentId}`)
        .on('UPDATE', payload => {
            callback(payload.new);
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
        throw error;
    }
    return data;
};