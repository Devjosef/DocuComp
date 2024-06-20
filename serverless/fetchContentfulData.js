import client from '../api/apollo-Client'; // Fixed casing to match other imports
import { GET_DOCUMENTS } from '../api/queries';
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

// Fetches document data from Contentful
async function fetchContentfulData() {
    const { data } = await client.query({
      query: GET_DOCUMENTS
    });
    return data.documents.items;
}

// Sanitizes input to prevent XSS attacks
function sanitizeInput(input) {
    return input.replace(/<script.*?>.*?<\/script>/gi, ''); // Basic XSS prevention
}

// Stores sanitized data in Supabase
async function storeDataInSupabase(contentItems, supabaseClient) {
    for (const item of contentItems) {
        const sanitizedTitle = sanitizeInput(item.fields.title);
        const sanitizedContent = sanitizeInput(item.fields.content);
        const { data, error } = await supabaseClient
            .from('your_table')
            .insert([{ title: sanitizedTitle, content: sanitizedContent }]);
        if (error) {
            console.error('Error inserting data:', error);
        }
    }
}

exports.handler = async (event, { supabaseClient }) => {
    const contentItems = await fetchContentfulData();
    await storeDataInSupabase(contentItems, supabaseClient);
    return { statusCode: 200, body: 'Data fetched and stored successfully' };
};