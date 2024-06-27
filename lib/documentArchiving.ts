import { supabase } from '../utils/supabaseClient';

/**
 * Archives a document by its ID.
 * @param {number} documentId - The ID of the document to archive.
 * @returns {Promise<any>} - Resolves with the data of the archived document.
 * @throws {Error} - Throws an error if the archiving fails.
 */
export const archiveDocument = async (documentId: number): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('documents')
            .update({ archived: true })
            .match({ id: documentId });

        if (error) {
            throw new Error(`Error archiving document: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error archiving document:', error);
        throw new Error('Failed to archive document. Please try again.');
    }
};

/**
 * Retrieves an archived document by its ID.
 * @param {number} documentId - The ID of the archived document to retrieve.
 * @returns {Promise<any>} - Resolves with the data of the retrieved document.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
export const retrieveArchivedDocument = async (documentId: number): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('id', documentId)
            .eq('archived', true)
            .single();

        if (error) {
            throw new Error(`Error retrieving archived document: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error retrieving archived document:', error);
        throw new Error('Failed to retrieve archived document. Please try again.');
    }
};