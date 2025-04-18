export interface User {
    id: number;
    name: string;
    email: string;
}

export interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    maxVisiblePages: number;
}

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export type ProductList = Product[];
