import type { NextApiRequest, NextApiResponse } from 'next/types';
import { supabase } from '../../../utils/supabaseClient';
import rateLimiter from '../../../../middleware/rateLimiter';
import { validateUserInput, authenticateJWT } from '../../../../middleware/security';

// List of allowed tables for querying to prevent unauthorized access
const allowedTables = [
    'audit_logs',
    'compliance_requirements',
    'document_compliance_mapping',
    'documents',
    'notifications',
    'user_actions',
    'user_settings',
    'users'
];

/**
 * Fetches data from a specified table if it's allowed.
 * @param {string} table - The name of the table to fetch data from.
 * @returns {Promise<any[]>} - The fetched data.
 * @throws {Error} - If the table is not allowed or there is a query error.
 */
const fetchData = async (table: string): Promise<any[]> => {
    if (!allowedTables.includes(table)) {
        throw new Error(`Unauthorized access attempt to '${table}'. This table is not permitted for direct API access.`);
    }

    const { data, error } = await supabase.from(table).select('*');
    if (error) {
        throw new Error(`Database query failed while attempting to fetch data from '${table}': ${error.message}`);
    }
    return data;
};

/**
 * API route handler function.
 * Applies rate limiting and handles the API request based on the table name provided.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Apply input validation
        for (let validation of validateUserInput) {
            await validation(req, res, (err) => {
                if (err) {
                    return res.status(400).json({ errors: err.array() });
                }
            });
        }

        // Apply authentication
        authenticateJWT(req, res, (err) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden' });
            }
        });

        const tableName = req.query.table as string;
        const data = await fetchData(tableName); // Fetch data from the specified table
        res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};

// Apply rate limiting middleware
export default rateLimiter.limit(handler);
