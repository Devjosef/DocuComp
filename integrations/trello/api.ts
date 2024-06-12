import axios from 'axios';

export const createCard = async (listId: string, name: string, desc: string) => {
    const url = `https://api.trello.com/1/cards?idList=${listId}&name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}&key=${trelloConfig.apiKey}&token=${trelloConfig.token}`;
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error('Trello API error: ', error);
    }
};