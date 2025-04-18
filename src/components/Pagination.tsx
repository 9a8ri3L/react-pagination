import React from 'react';
import { PaginationProps } from '../types';
import './Pagination.css';

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    maxVisiblePages,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getVisiblePages = () => {
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2),
        );
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i,
        );
    };

    const visiblePages = getVisiblePages();

    if (totalPages <= 1) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    return (
        <nav aria-label='Pagination' className='pagination-container'>
            <ul className='pagination'>
                <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className='page-link'
                        aria-label='Go to first page'
                    >
                        &laquo;
                    </button>
                </li>
                <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='page-link'
                        aria-label='Go to previous page'
                    >
                        &lsaquo;
                    </button>
                </li>

                {visiblePages[0] > 1 && (
                    <>
                        <li className='page-item'>
                            <button
                                onClick={() => handlePageChange(1)}
                                className='page-link'
                                aria-label={`Go to page 1`}
                            >
                                1
                            </button>
                        </li>
                        {visiblePages[0] > 2 && (
                            <button
                                onClick={() =>
                                    handlePageChange(visiblePages[0] - 1)
                                }
                                className='page-link'
                                aria-label={`Go to page 1`}
                            >
                                &hellip;
                            </button>
                        )}
                    </>
                )}

                {visiblePages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                            onClick={() => handlePageChange(page)}
                            className='page-link'
                            aria-label={`Go to page ${page}`}
                            aria-current={
                                currentPage === page ? 'page' : undefined
                            }
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                        {visiblePages[visiblePages.length - 1] <
                            totalPages - 1 && (
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        visiblePages[visiblePages.length - 1] +
                                            1,
                                    )
                                }
                                className='page-link'
                                aria-label={`Go to page ${
                                    visiblePages[visiblePages.length - 1] + 1
                                }`}
                            >
                                &hellip;
                            </button>
                        )}
                        <li className='page-item'>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                className='page-link'
                                aria-label={`Go to page ${totalPages}`}
                            >
                                {totalPages}
                            </button>
                        </li>
                    </>
                )}

                <li
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='page-link'
                        aria-label='Go to next page'
                    >
                        &rsaquo;
                    </button>
                </li>
                <li
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className='page-link'
                        aria-label='Go to last page'
                    >
                        &raquo;
                    </button>
                </li>
            </ul>

            <div className='page-info'>
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
                {totalItems} items
            </div>
        </nav>
    );
};

export default Pagination;
