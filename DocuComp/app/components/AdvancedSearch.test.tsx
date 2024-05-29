import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdvancedSearch from './AdvancedSearch';

describe('AdvancedSearch Component', () => {
    it('renders correctly', () => {
        render(<AdvancedSearch />);
        expect(screen.getByPlaceholderText('Document Title')).toBeInTheDocument();
        expect(screen.getByText('Select a Category')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('allows input to be entered', () => {
        render(<AdvancedSearch />);
        const titleInput = screen.getByPlaceholderText('Document Title');
        fireEvent.change(titleInput, { target: { value: 'Test Document' } });
        expect((titleInput as HTMLInputElement).value).toBe('Test Document');
    });

    it('handles category selection', () => {
        render(<AdvancedSearch />);
        const categorySelect = screen.getByRole('combobox');
        fireEvent.change(categorySelect, { target: { value: 'legal' } });
        expect((categorySelect as HTMLSelectElement).value).toBe('legal');
    });

    it('calls executeSearch when search button is clicked', () => {
        const mockExecuteSearch = jest.fn();
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [{}, () => {}]) // Mock useState
                                     .mockImplementationOnce(() => [[], mockExecuteSearch]); // Mock setSearchResults to capture the search function call

        render(<AdvancedSearch />);
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);
        expect(mockExecuteSearch).toHaveBeenCalled();
    });
});