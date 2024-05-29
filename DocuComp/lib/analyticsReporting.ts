import { supabase } from './supabaseClient';

// Example: Function to log user actions
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

// Example: Function to generate reports
export const generateUsageReport = async () => {
    try {
        const { data, error } = await supabase
            .from('user_actions')
            .select(`
                action,
                count(*)
            `)
            .group('action');

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