import React, { useEffect, useState } from 'react';
import { LazyLoadComponent } from '../../utils/lazyloading';
import { cache } from '../../utils/caching';
import usePagination from '../../hooks/usePagination';

const DocumentItem = LazyLoadComponent(() => import('./DocumentItem'));

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const { currentPage, totalPages, goToPage } = usePagination({ initialPage: 1, itemsPerPage: 10, totalItems: 100 }); // Adjust totalItems dynamically based on data

  useEffect(() => {
    const fetchDocuments = async () => {
      const cacheKey = `documents-page-${currentPage}`;
      const cachedDocs = cache.get(cacheKey);
      if (cachedDocs) {
        setDocuments(cachedDocs);
        return;
      }
      // Simulate fetching documents
      const fetchedDocs = await fetchDocumentsFromAPI(currentPage);
      setDocuments(fetchedDocs);
      cache.set(cacheKey, fetchedDocs, 300); // Cache for 5 minutes
    };

    fetchDocuments();
  }, [currentPage]);

  return (
    <div>
      {documents.map(doc => <DocumentItem key={doc.id} doc={doc} />)}
      <div>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default DocumentList;