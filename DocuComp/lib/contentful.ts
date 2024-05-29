import { ContentfulClientApi, createClient } from 'contentful';

interface ContentfulEntry {
    title: string;       
    content: string;     
    version: number;     
    status: 'Draft' | 'Review' | 'Published';  
    lastUpdated: string; 
}
interface CustomClient extends ContentfulClientApi<any> {
    getPreviewClient: () => ContentfulClientApi<any>;
}

// Initialize the client directly in the declaration.
const client: CustomClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
}) as CustomClient;

// Define the getPreviewClient method.
client.getPreviewClient = function(): ContentfulClientApi<any> {
    return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
        host: 'preview.contentful.com',
    }) as ContentfulClientApi<any>;
};

// Function to transform entry data
export function transformEntryData(entry: any): ContentfulEntry {
    return {
        title: entry.fields.title as string,
        content: entry.fields.content as string,
        version: entry.sys.revision as number,
        status: entry.fields.status as 'Draft' | 'Review' | 'Published',
        lastUpdated: entry.sys.updatedAt as string
    };
}

// Updated fetch function
export async function fetchContentfulEntry(entryId: string): Promise<ContentfulEntry> {
    const entry = await client.getEntry<any>(entryId);
    return transformEntryData(entry);
}

export default client;
