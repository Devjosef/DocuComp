import client from '../../graphql/apollo-Client';
import { GET_DOCUMENTS, GET_ENTRY } from '../../graphql/queries';
import { createClient } from 'contentful';

const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
    host: 'cdn.contentful.com',
});

export const fetchDocumentsFromContentful = async () => {
    try {
      const { data } = await client.query({
        query: GET_DOCUMENTS
      });
      return data.documents.items;
    } catch (error) {
      console.error('Failed to fetch documents from Contentful:', error);
      throw error;
    }
  };