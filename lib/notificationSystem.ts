import {supabase} from '../utils/supabaseClient'

export const sendNotification = async (userId: any, message: any) => {
    const { data, error } = await supabase
        .from('notifications')
        .insert([{ user_id: userId, message }]);

    if (error) {
        console.error('Error sending notification:', error);
    } else {
        console.log('Notification sent:', data);
    }
};