import React from 'react';

const LoadingSkeleton: React.FC = () => {
    return (
        <div className='product-card skeleton'>
            <div className='product-image-container'></div>
            <div className='product-details'>
                <div className='skeleton-line title'></div>
                <div className='skeleton-line category'></div>
                <div className='skeleton-line description'></div>
                <div className='skeleton-line description'></div>
                <div className='skeleton-line rating'></div>
                <div className='skeleton-line price'></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
