import axios from 'axios';
import { trelloConfig } from './config';

export const linkDocumentToCard = async (listId: string, documentName: string, documentId: string) => {
    const description = `Linked to document ID: ${documentId}`;
    return createCard(listId, documentName, description);
};
export const createCard = async (listId: string, name: string, desc: string) => {
    const url = `https://api.trello.com/1/cards?idList=${listId}&name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}&key=${trelloConfig.apiKey}&token=${trelloConfig.accessToken}`; // Note the change from trelloConfig.token to trelloConfig.accessToken
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Trello API error: ', error);
    }
};