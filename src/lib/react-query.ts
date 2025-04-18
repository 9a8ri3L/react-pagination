/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryClient } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
            refetchOnReconnect: true,
            refetchOnMount: true,
            staleTime: STALE_TIME,
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
            retry: (failureCount, error) => {
                if ((error as any)?.response?.status === 404) return false;
                return failureCount < 3;
            },
        },
    },
});
