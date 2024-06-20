import { supabase } from '../utils/supabaseClient';

export const createUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
};

export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
};

export const updateUserProfile = async (userId: string, updates: Record<string, any>) => {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .match({ id: userId });

    if (error) throw error;
    return data;
};

export const removeUserFromCompany = async (userId: string, companyId: string) => {
    const { data, error } = await supabase
        .from('company_users')
        .delete()
        .match({ user_id: userId, company_id: companyId });

    if (error) throw error;
    return data;
};

export const getAllUsers = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) throw error;
    return data;
};

export const addUserToCompany = async (userId: string, companyId: string) => {
    const { data, error } = await supabase
        .from('company_users')
        .insert([{ user_id: userId, company_id: companyId }]);

    if (error) throw error;
    return data;
};