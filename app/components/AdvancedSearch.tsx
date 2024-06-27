import React, { useState, ChangeEvent } from 'react';
import { cache } from '../../utils/caching'; 

interface SearchParams {
    title: string;
    category: string;
    dateFrom: string;
    dateTo: string;
    status: string;
}

// Component for performing advanced searches with multiple filters.
    const AdvancedSearch = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        title: '',
        category: '',
        dateFrom: '',
        dateTo: '',
        status: ''
    });
    const [searchResults, setSearchResults] = useState<{ title: string }[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };
    // Execute search by checking cache first, then fetching data if not cached.
    const executeSearch = async () => {
        const cacheKey = `search-${JSON.stringify(searchParams)}`;
        const cachedResults = cache.get(cacheKey);
        if (cachedResults) {
            setSearchResults(cachedResults);
            return;
        }

        // Mocked fetch function to simulate fetching data
        const fetchedData = [{ title: 'Document 1' }, { title: 'Document 2' }]; // Example data
        const error = false; // Simulate no error

        if (error) {
            console.error('Error fetching documents:', error);
        } else {
            setSearchResults(fetchedData);
            cache.set(cacheKey, fetchedData, 300); // Cache for 5 minutes
        }
    };

    return (
        <div>
            <input
                type="text"
                name="title"
                value={searchParams.title}
                onChange={handleInputChange}
                placeholder="Document Title"
            />
            <select
                name="category"
                value={searchParams.category}
                onChange={handleInputChange}
            >
                <option value="">Select a Category</option>
                <option value="legal">Legal</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="technology">Technology</option>
                <option value="real_estate">Real Estate</option>
            </select>
            <button onClick={executeSearch}>Search</button>
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
