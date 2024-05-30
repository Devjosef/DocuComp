const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchContentfulData() {
    const url = `https://cdn.contentful.com/spaces/${contentfulSpaceId}/entries?access_token=${contentfulAccessToken}`;
    const response = await axios.get(url);
    return response.data.items;
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