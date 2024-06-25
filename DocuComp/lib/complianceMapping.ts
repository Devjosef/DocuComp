import { supabase } from '../utils/supabaseClient';

/**
 * Maps a document to a compliance requirement.
 * @param {number} documentId - The ID of the document to map.
 * @param {string} requirementId - The ID of the compliance requirement.
 * @returns {Promise<any>} - Resolves with the data of the newly created mapping.
 * @throws {Error} - Throws an error if the mapping fails.
 */
export const mapDocumentToCompliance = async (documentId: number, requirementId: string): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('compliance_mappings')
            .insert({
                document_id: documentId,
                compliance_requirement_id: requirementId
            });

        if (error) {
            throw new Error(`Error mapping document to compliance: ${error.message}`);
        }

        console.log('Mapping successful:', data);
        return data; // Return the data for further use
    } catch (error) {
        console.error('Compliance mapping failed:', error);
        throw new Error('Failed to map document to compliance. Please try again.');
    }
};