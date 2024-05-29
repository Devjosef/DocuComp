import { supabase } from '@/lib/supabaseClient';  // Adjusted the import path

// Function to subscribe to notification changes
export const subscribeToNotifications = (userId: number, callback: (notification: any) => void) => {
    return supabase
        .from('notifications')
        .on('INSERT', { filter: `user_id=eq.${userId}` }, (payload: { new: any }) => {
            console.log('New notification:', payload.new);
            callback(payload.new);
        })
        .subscribe();
};

// Function to send a notification
export const sendNotification = async (userId: number, message: string) => {
    const { data, error } = await supabase
        .from('notifications')
        .insert([{ user_id: userId, message }]);

    if (error) {
        console.error('Error sending notification:', error);
        return null;
    }
    return data;
};