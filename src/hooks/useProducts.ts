import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { handleAPIError } from '../api/errorHandler';

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const response = await apiClient.get('/products');
                return response.data;
            } catch (error) {
                throw handleAPIError(error);
            }
        },
        retry: 3,
        retryDelay: (attempt) => Math.min(attempt * 1000, 30 * 1000),
    });
}
