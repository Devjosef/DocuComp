import { supabase } from '../utils/supabaseClient';

/**
 * Fetches document versions with pagination.
 * @param {number} documentId - The ID of the document.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of versions per page.
 * @returns {Promise<any>} - Resolves with the data of the document versions.
 * @throws {Error} - Throws an error if the fetching fails.
 */
export const fetchDocumentVersions = async (documentId: number, page: number, limit: number = 10): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('document_versions')
            .select('*')
            .eq('document_id', documentId)
            .order('created_at', { ascending: false })
            .range((page - 1) * limit, page * limit - 1);

        if (error) {
            throw new Error(`Error fetching document versions: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching document versions:', error);
        throw new Error('Failed to fetch document versions. Please try again.');
    }
};

/**
 * Creates a new branch for a document.
 * @param {number} documentId - The ID of the document.
 * @param {string} branchName - The name of the new branch.
 * @returns {Promise<any>} - Resolves with the data of the new branch.
 * @throws {Error} - Throws an error if the branch creation fails.
 */
export const createBranch = async (documentId: number, branchName: string): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('document_branches')
            .insert([{ document_id: documentId, branch_name: branchName }]);

        if (error) {
            throw new Error(`Error creating branch: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error creating branch:', error);
        throw new Error('Failed to create branch. Please try again.');
    }
};

/**
 * Merges two branches of a document.
 * @param {number} documentId - The ID of the document.
 * @param {string} sourceBranch - The name of the source branch.
 * @param {string} targetBranch - The name of the target branch.
 * @returns {Promise<any>} - Resolves with the data of the merged document.
 * @throws {Error} - Throws an error if the merge fails.
 */
export const mergeBranches = async (documentId: number, sourceBranch: string, targetBranch: string): Promise<any> => {
    try {
        const { data, error } = await supabase
            .rpc('merge_branches', { doc_id: documentId, source_branch: sourceBranch, target_branch: targetBranch });

        if (error) {
            throw new Error(`Error merging branches: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error merging branches:', error);
        throw new Error('Failed to merge branches. Please try again.');
    }
};

/**
 * Visualizes the version history of a document.
 * @param {number} documentId - The ID of the document.
 * @returns {Promise<any>} - Resolves with the data of the version history.
 * @throws {Error} - Throws an error if the visualization fails.
 */
export const visualizeVersionHistory = async (documentId: number): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('document_versions')
            .select('*')
            .eq('document_id', documentId)
            .order('created_at', { ascending: true });

        if (error) {
            throw new Error(`Error visualizing version history: ${error.message}`);
        }

        // Transform data for visualization (e.g., create a graph structure)
        const versionHistory = data.map(version => ({
            id: version.id,
            createdAt: version.created_at,
            branch: version.branch_name,
            content: version.content,
        }));

        return versionHistory;
    } catch (error) {
        console.error('Error visualizing version history:', error);
        throw new Error('Failed to visualize version history. Please try again.');
    }
};