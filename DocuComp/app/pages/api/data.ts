import type { NextApiRequest, NextApiResponse } from 'next/types';
import { supabase } from '../../../utils/supabaseClient';
import rateLimiter from '../../../../middleware/rateLimiter';
import { validateUserInput, authenticateJWT } from '../../../../middleware/security';
import { handleError, AppError, catchAsync } from '../../../services/errorHandlingService';

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
        throw new AppError(`Unauthorized access attempt to '${table}'. This table is not permitted for direct API access.`, 403);
    }

    const { data, error } = await supabase.from(table).select('*');
    if (error) {
        throw new AppError(`Database query failed while attempting to fetch data from '${table}': ${error.message}`, 500);
    }
    return data;
};

/**
 * API route handler function.
 * Applies rate limiting and handles the API request based on the table name provided.
 */
const handler = catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
    // Apply input validation
    for (let validation of validateUserInput) {
        await validation(req, res, (err) => {
            if (err) {
                throw new AppError('Invalid input', 400);
            }
        });
    }

    // Apply authentication
    authenticateJWT(req, res, (err) => {
        if (err) {
            throw new AppError('Forbidden', 403);
        }
    });

    const tableName = req.query.table as string;
    const data = await fetchData(tableName); // Fetch data from the specified table
    res.status(200).json(data);
});

// Apply rate limiting middleware
const rateLimitedHandler = rateLimiter.limit(handler);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await rateLimitedHandler(req, res);
    } catch (err) {
        handleError(err, res);
    }
};
