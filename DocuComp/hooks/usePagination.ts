import { useState } from 'react';

interface PaginationConfig {
  initialPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const usePagination = ({ initialPage, itemsPerPage, totalItems }: PaginationConfig) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      console.error('Page number out of range');
      return;
    }
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage
  };
};

export default usePagination;