/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export class APIError extends Error {
    constructor(
        public message: string,
        public statusCode?: number,
        public details?: any,
    ) {
        super(message);
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

export const handleAPIError = (error: unknown): APIError => {
    if (axios.isAxiosError(error)) {
        return new APIError(
            error.response?.data?.message || error.message,
            error.response?.status,
            error.response?.data,
        );
    }
    if (error instanceof Error) {
        return new APIError(error.message);
    }
    return new APIError('An unknown error occurred');
};
