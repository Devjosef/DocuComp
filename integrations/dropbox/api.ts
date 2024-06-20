import { Dropbox } from 'dropbox'; 
import { dropboxConfig } from './config';
import NodeCache from 'node-cache';

class DropboxAPI {
  private dbx;
  private cache;

  constructor(accessToken: string) {
    this.dbx = new Dropbox({ accessToken });
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  async syncToDropbox(fileContent: Buffer, path: string) {
    return this.uploadFile(fileContent, path);
  }

  async syncFromDropbox(path: string) {
    try {
      return await this.dbx.filesDownload({ path });
    } catch (error) {
      console.error('Failed to sync from Dropbox:', error);
      throw error;
    }
  }

  async uploadFile(fileContent: Buffer, path: string) {
    const cacheKey = `file-upload-${path}`;
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    try {
      const response = await this.dbx.filesUpload({ path, contents: fileContent });
      this.cache.set(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Dropbox API error:', error);
      throw error;
    }
  }
}

const dropboxAPI = new DropboxAPI(dropboxConfig.accessToken);
export default dropboxAPI;