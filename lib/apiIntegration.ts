import axios from 'axios';

export const fetchDataFromExternalAPI = async (apiUrl: string) => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        throw error;
    }
};