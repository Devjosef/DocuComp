import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { supabase } from '@/lib/supabaseClient';

const AdvancedSearch = () => {
    const [searchParams, setSearchParams] = useState({
        title: '',
        category: '',
        dateFrom: '',
        dateTo: '',
        status: ''
    });
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const executeSearch = async () => {
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .ilike('title', `%${searchParams.title}%`)
            .eq('category', searchParams.category)
            .gte('created_at', searchParams.dateFrom)
            .lte('created_at', searchParams.dateTo);
        if (error) {
            console.error('Error fetching documents:', error);
        } else {
            setSearchResults(data || []);
        }
    };

    return (
        <div>
            <TextField
                name="title"
                label="Document Title"
                value={searchParams.title}
                onChange={handleInputChange}
            />
            <Select
                name="category"
                value={searchParams.category}
                onChange={handleInputChange}
                displayEmpty
            >
                <MenuItem value="">Select a Category</MenuItem>
                <MenuItem value="legal">Legal</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
            </Select>
            {/* Add other input fields similarly */}
            <Button onClick={executeSearch}>Search</Button>
            <div>
                {searchResults.map((result, index) => (
                    <div key={index}>
                        <p>{result.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvancedSearch;