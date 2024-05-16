import fetchContentfulEntry from '@/lib/contentful';
import { transformEntryData } from '@/lib/contentful';

export async function fetchDocumentation(entryId: string): Promise<string> {
    try {
        const entry = await fetchContentfulEntry.getEntry(entryId);
        const transformedData = transformEntryData(entry);
        if (transformedData) {
            return JSON.stringify(transformedData);
        } else {
            throw new Error('Content not found');
        }
    } catch (error: any) {
        console.error('Error fetching documentation:', error.message);
        throw new Error(`Failed to fetch documentation: ${error.message}`);
    }
}
