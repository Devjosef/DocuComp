import { supabase } from '../utils/supabaseClient';

export const saveBackupToFile = async (dataStr: string, path: string) => {
    const { data, error } = await supabase.storage.from('backups').upload(path, dataStr);
    if (error) throw new Error('Failed to save backup file: ' + error.message);
    return data;
};

export const loadBackupFromFile = async (path: string) => {
    const { data, error } = await supabase.storage.from('backups').download(path);
    if (error) throw new Error('Failed to load backup file: ' + error.message);
    return data;
};