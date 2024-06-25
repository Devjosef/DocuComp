import { supabase } from "../utils/supabaseClient";

/**
 * Checks the compliance status of a document by its ID.
 * @param {number} documentId - The ID of the document to check.
 * @returns {Promise<boolean>} - The compliance status of the document.
 * @throws {Error} - Throws an error if there is an issue with fetching the data.
 */
export const checkCompliance = async (documentId: number): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .from('documents')
            .select('compliance')
            .eq('id', documentId)
            .single();

        if (error) {
            throw new Error(`Error checking compliance: ${error.message}`);
        }

        return data.compliance;
    } catch (error) {
        console.error('Compliance check failed:', error);
        throw new Error('Failed to check document compliance. Please try again.');
    }
};
