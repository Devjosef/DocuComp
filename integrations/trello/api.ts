import axios from 'axios';
import { trelloConfig } from './config';

class TrelloAPI {
  async linkDocumentToCard(listId: string, documentName: string, documentId: string) {
    const description = `Linked to document ID: ${documentId}`;
    return this.createCard(listId, documentName, description);
  }

  async createCard(listId: string, name: string, desc: string) {
    const url = `https://api.trello.com/1/cards?idList=${listId}&name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}&key=${trelloConfig.apiKey}&token=${trelloConfig.accessToken}`;
    try {
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      console.error('Trello API error:', error);
      throw error;
    }
  }
}

const trelloAPI = new TrelloAPI();
export default trelloAPI;