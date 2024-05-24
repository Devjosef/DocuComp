import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import supabase from '../supabaseClient';

const DocumentTagging = ({ documentId }) => {
    const [tag, setTag] = useState('');

    const handleAddTag = async () => {
        const { data, error } = await supabase
            .from('document_tags')
            .insert([{ document_id: documentId, tag }]);

        if (error) {
            console.error('Error adding tag:', error);
        } else {
            console.log('Tag added:', data);
        }
    };

    return (
        <div>
            <TextField
                label="Add Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <Button onClick={handleAddTag}>Add Tag</Button>
        </div>
    );
};

export default DocumentTagging;