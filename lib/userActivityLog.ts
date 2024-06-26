import { supabase } from '../utils/supabaseClient';

export const logUserActivity = async (userId: string, activity: string) => {
    const { data, error } = await supabase
        .from('user_activities')
        .insert([{ user_id: userId, activity }]);
    if (error) {
        console.error('Error logging user activity:', error);
        throw new Error(`Error logging user activity: ${error.message}`);
    }
    return data;
};