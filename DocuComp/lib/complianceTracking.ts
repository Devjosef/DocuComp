import supabase from './supabaseClient';

export const checkCompliance = async (documentId) => {
    const { data, error } = await supabase
        .from('documents')
        .select('compliance')
        .eq('id', documentId);

    if (error) {
        console.error('Error checking compliance:', error);
        return false;
    }
    return data[0].compliance;
};