import React, { useState, FormEvent } from 'react';

interface DocumentTaggingProps {
    documentId: string;
}

const DocumentTagging: React.FC<DocumentTaggingProps> = ({ documentId }) => {
    const [tag, setTag] = useState<string>('');

    const handleAddTag = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch('/api/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ document_id: documentId, tag }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error adding tag:', errorData.error);
        } else {
            const data = await response.json();
            console.log('Tag added:', data);
            setTag('');
        }
    };

    return (
        <form className="p-4" onSubmit={handleAddTag}>
            <label htmlFor="tag-input" className="sr-only">Add Tag</label>
            <input
                type="text"
                id="tag-input"
                className="input input-bordered w-full max-w-xs"
                placeholder="Add Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-primary mt-2"
            >
                Add Tag
            </button>
        </form>
    );
};

export default DocumentTagging;

