import client from '../api/apollo-Client'; // Fixed casing to match other imports
import { GET_DOCUMENTS } from '../api/queries';
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchContentfulData() {
    const { data } = await client.query({
      query: GET_DOCUMENTS
    });
    return data.documents.items;
  }

async function storeDataInSupabase(contentItems) {
    for (const item of contentItems) {
        const { data, error } = await supabase
            .from('your_table')
            .insert([{ title: item.fields.title, content: item.fields.content }]);
        if (error) {
            console.error('Error inserting data:', error);
        }
    }
}

exports.handler = async (event) => {
    const contentItems = await fetchContentfulData();
    await storeDataInSupabase(contentItems);
    return { statusCode: 200, body: 'Data fetched and stored successfully' };
};