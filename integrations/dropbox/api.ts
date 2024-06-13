import { dropboxConfig } from './config';
import NodeCache from 'node-cache';
import { Dropbox } from 'dropbox'; 

const dbx = new Dropbox({ accessToken: dropboxConfig.accessToken });
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const syncToDropbox = async (fileContent: Buffer, path: string) => {
    return uploadFile(fileContent, path);
};

export const syncFromDropbox = async (path: string) => {
    return dbx.filesDownload({ path });
};
export const uploadFile = async (fileContent: Buffer, path: string) => {
    const cacheKey = `file-upload-${path}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await dbx.filesUpload({ path, contents: fileContent });
        cache.set(cacheKey, response);
        return response;
    } catch (error) {
        console.error('Dropbox API error: ', error);
    }
};