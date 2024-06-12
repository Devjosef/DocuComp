import { Dropbox } from 'dropbox';
import NodeCache from 'node-cache';
import { dropboxConfig } from './config';

const dbx = new Dropbox({ accessToken: dropboxConfig.accessToken });
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

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