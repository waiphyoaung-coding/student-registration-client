import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    onPageChange(pageNumber);
  };

  const createPaginationItems = () => {
    const items = [];

    // Always show first page
    if (totalPages > 0) {
      items.push(
        <Pagination.Item key={1} active={1 === activePage} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
    }

    // Show ellipsis if necessary
    if (activePage > 4) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // Determine start and end page numbers
    const startPage = Math.max(2, activePage - 2);
    const endPage = Math.min(totalPages - 1, activePage + 2);

    // Create page items between startPage and endPage
    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    // Show ellipsis if necessary
    if (activePage < totalPages - 3) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    // Always show last page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item key={totalPages} active={totalPages === activePage} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} disabled={activePage === 1} />
      <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
      {createPaginationItems()}
      <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={activePage === totalPages} />
    </Pagination>
  );
};

export default PaginationComponent;
