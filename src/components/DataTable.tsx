import React, { Suspense, useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import Pagination from './Pagination';
import LoadingSkeleton from './products/LoadingSkeleton';

const LazyProducts = React.lazy(() => import('./products/ProductList'));

const DataTable: React.FC = () => {
    const { data, error, isLoading: loading } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [maxVisiblePages, setMaxVisiblePages] = useState(3);

    const totalItems = data?.length;

    const currentData = !data
        ? []
        : data?.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage,
          );
    useEffect(() => {
        if (itemsPerPage === totalItems) {
            setMaxVisiblePages(0);
        } else if (
            maxVisiblePages > Math.ceil(totalItems / itemsPerPage) ||
            maxVisiblePages === 0
        ) {
            setMaxVisiblePages(Math.ceil(totalItems / itemsPerPage));
        }
    }, [itemsPerPage, maxVisiblePages, totalItems]);

    if (!loading && data?.length === 0) {
        return (
            <div className='empty-state'>
                <h3>No products found</h3>
            </div>
        );
    }

    return (
        <div className='data-table'>
            <h1 style={{ textAlign: 'center' }}>
                Simple Customizable React Pagination
            </h1>
            <Suspense fallback={<LoadingSkeleton />}>
                <Pagination
                    totalItems={totalItems ?? 0}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    maxVisiblePages={maxVisiblePages}
                />

                <div className='flex-center'>
                    <label htmlFor='maxVisiblePages'>
                        Max visible pages:{' '}
                        <input
                            type='number'
                            name='maxVisiblePages'
                            id='maxVisiblePages'
                            value={maxVisiblePages}
                            disabled={itemsPerPage === totalItems}
                            onChange={(e) => {
                                const { value } = e.target;
                                const parsedValue = parseInt(value);
                                if (
                                    !value ||
                                    parsedValue < 1 ||
                                    parsedValue >
                                        Math.ceil(totalItems / itemsPerPage)
                                )
                                    return;

                                setMaxVisiblePages(parsedValue);
                            }}
                        />
                    </label>

                    <label htmlFor='itemsPerPage'>
                        Items per page:{' '}
                        <input
                            type='number'
                            name='itemsPerPage'
                            id='itemsPerPage'
                            value={itemsPerPage}
                            onChange={(e) => {
                                const { value } = e.target;
                                const parsedValue = parseInt(value);
                                if (
                                    !value ||
                                    parsedValue < 1 ||
                                    parsedValue > totalItems
                                )
                                    return;

                                setCurrentPage((prev) =>
                                    parsedValue > itemsPerPage
                                        ? Math.ceil(
                                              Math.min(
                                                  prev * itemsPerPage,
                                                  totalItems,
                                              ) / parsedValue,
                                          )
                                        : Math.ceil(
                                              ((prev - 1) * itemsPerPage + 1) /
                                                  parsedValue,
                                          ),
                                );

                                setItemsPerPage(parsedValue);
                            }}
                        />
                    </label>
                </div>

                <LazyProducts currentData={currentData} error={error} />
            </Suspense>
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default DataTable;
