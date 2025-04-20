import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import './Products.css';

interface ProductListProps {
    currentData: Product[];
    error: Error | null;
}

const ProductList: React.FC<ProductListProps> = ({ currentData, error }) => {
    if (error) {
        return (
            <div className='error-state'>
                <h3>Something went wrong</h3>
                <p>{error.message}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className='product-list'>
            {currentData.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
