import { supabase } from '../utils/supabaseClient';

/// Log user actions in the database using Supabase.
export const logUserAction = async (userId: number, action: string) => {
    try {
        const { data, error } = await supabase
            .from('user_actions')
            .insert([{ user_id: userId, action }]);
        
        if (error) {
            console.error('Error logging user action:', error);
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Failed to log user action:', error);
        throw error;
    }
};

// Generate a report of user actions grouped by action type from the database.
export const generateUsageReport = async () => {
    try {
        const { data, error } = await supabase
            .from('user_actions')
            .select(`
                action,
                count: supabase.raw('count(*)')
            `);

        if (error) {
            console.error('Error generating usage report:', error);
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Failed to generate usage report:', error);
        throw error;
    }
};