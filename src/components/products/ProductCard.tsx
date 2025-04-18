import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const renderRatingStars = (rate: number) => {
        const stars = [];
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <span key={i} className='star full'>
                        ★
                    </span>,
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <span key={i} className='star half'>
                        ★
                    </span>,
                );
            } else {
                stars.push(
                    <span key={i} className='star empty'>
                        ★
                    </span>,
                );
            }
        }

        return stars;
    };

    return (
        <div className='product-card'>
            <div className='product-image-container'>
                <img
                    src={product.image || '/placeholder-product.png'}
                    alt={product.title}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            '/placeholder-product.png';
                    }}
                    loading='lazy'
                />
            </div>
            <div className='product-details'>
                <h3 className='product-title'>{product.title}</h3>
                <span className='product-category'>{product.category}</span>
                <p className='product-description' title={product.description}>
                    {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                </p>
                <div className='product-rating'>
                    {renderRatingStars(product.rating.rate)}
                    <span className='rating-count'>
                        ({product.rating.count})
                    </span>
                </div>
                <div className='product-price-container'>
                    <span className='product-price'>
                        ${product.price.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
