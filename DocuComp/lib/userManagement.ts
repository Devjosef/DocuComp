import { supabase } from './supabaseClient';
export const createUser = async (email: any, password: any) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
};
export const loginUser = async (email: any, password: any) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return user;
};