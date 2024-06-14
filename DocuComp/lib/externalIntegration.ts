import { createClient } from 'contentful';

// Setup and usage of the Contentful client for fetching documents.
const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? ''
});

// Asynchronously fetch documents from Contentful and handle errors
export const fetchDocumentsFromContentful = async () => {
    try {
        const entries = await contentfulClient.getEntries({ content_type: 'document' });
        return entries.items;
    } catch (error) {
        console.error('Failed to fetch documents from Contentful:', error);
        throw error;
    }
};