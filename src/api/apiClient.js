import axios from 'axios';

/**
 * Axios instance configured for the CivicTrack REST API.
 *
 * - Base URL comes from VITE_API_BASE_URL env (.env file).
 * - Response interceptor unwraps the Spring Boot `ApiResponse<T>` envelope
 *   so callers receive the `data` payload directly.
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// ── Response interceptor ────────────────────────────────────────────
// The backend wraps every response in: { success, message, data, timestamp }
// We unwrap automatically so callers just get the `data` field.
apiClient.interceptors.response.use(
    (response) => {
        const body = response.data;
        // If the response follows ApiResponse shape, unwrap
        if (body && typeof body.success === 'boolean') {
            if (!body.success) {
                return Promise.reject(new Error(body.message || 'API request failed'));
            }
            return body.data;
        }
        // Non-envelope responses (e.g. file upload raw URL)
        return body;
    },
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            'Network error — please try again';
        return Promise.reject(new Error(message));
    }
);

export default apiClient;
