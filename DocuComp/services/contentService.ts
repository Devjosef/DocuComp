import apolloClient from '../../api/apollo-Client';
import { GET_ENTRY } from '../../api/queries';
import { ContentfulClientApi, createClient, Entry } from 'contentful';

// Interface for a Contentful entry with system metadata included.
interface EntrySkeletonType {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        revision: number; // Added revision as per Contentful sys properties
        contentType: { // Adjusted to match Contentful's structure
            sys: {
                id: string;
            };
        };
        environment: {
            sys: {
                id: string;
                type: string;
            };
        };
        space: {
            sys: {
                id: string;
                type: string;
            };
        };
    };
    fields: {
        [key: string]: any;
    };
    contentTypeId: string;
}

// Define the structure of the fields expected in a Contentful entry.
interface ContentfulEntryFields extends EntrySkeletonType {
    title: string;
    content: any;  // Adjust based on actual RichText structure.
    version: number;
    status: 'Draft' | 'Review' | 'Published';
    lastUpdated: string;
    contentTypeId: string
}

// Define the complete structure of a Contentful entry including system metadata.
interface ContentfulEntry extends Entry<ContentfulEntryFields> {}
// Extend the ContentfulClientApi to include type-specific methods and additional functionality.
interface CustomClient extends ContentfulClientApi<any> {
    getPreviewClient: () => ContentfulClientApi<any>;
}

// Initialize the Contentful client with configuration from environment variables.
const client: CustomClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
    host: 'cdn.contentful.com', // Ensure using the correct API endpoint
}) as CustomClient;

// Method to create a client for accessing preview content in Contentful.
client.getPreviewClient = function(): ContentfulClientApi<any> {
    return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
        host: 'preview.contentful.com',
    }) as unknown as ContentfulClientApi<any>;
};
/**
 * Transforms raw entry data from Contentful into a structured ContentfulEntry.
 * This function maps the raw API data to a more usable format within our application.
 * @param entry The raw entry object from Contentful.
 * @returns A ContentfulEntry object with structured data.
 */

// Function to transform raw Contentful data into a structured format for app usage.
export function transformEntryData(entry: any): ContentfulEntry {
    return {
        sys: entry.sys,
        metadata: entry.metadata, // Added missing metadata property
        fields: {
            title: entry.fields.title as string,
            content: entry.fields.content,
            version: entry.fields.version,
            status: entry.fields.status,
            lastUpdated: entry.fields.lastUpdated,
            contentTypeId: entry.fields.contentTypeId
        }
    };
}

/**
 * Fetches a Contentful entry by its ID and transforms it to a ContentfulEntry.
 * This function is used to retrieve and transform data from Contentful for use in the application.
 * @param entryId The ID of the entry to fetch.
 * @returns A promise that resolves to a ContentfulEntry.
 */

// Fetch and transform a Contentful entry by its ID.
export async function fetchContentfulEntry(entryId: string): Promise<ContentfulEntry> {
    try {
        const { data } = await apolloClient.query({
            query: GET_ENTRY,
            variables: { entryId },
        });
        // Assuming 'data' contains an 'entry' field with the necessary data.
        // You might need to adjust this based on the actual structure of the GraphQL response.
        return transformEntryData(data.entry);
    } catch (error) {
        console.error('Error fetching entry from Contentful:', error);
        throw error;
    }
}