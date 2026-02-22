import apiClient from './apiClient.js';

/**
 * Auth API — placeholder endpoints matching the Spring Boot AuthController.
 * These will be fully implemented once Firebase JWT is integrated on the backend.
 */

/**
 * Login with a Firebase ID token (placeholder).
 * @param {string} firebaseToken
 */
export async function login(firebaseToken) {
    return apiClient.post('/auth/login', { token: firebaseToken });
}

/**
 * Verify OTP code (placeholder).
 * @param {string} phoneNumber
 * @param {string} otp
 */
export async function verifyOtp(phoneNumber, otp) {
    return apiClient.post('/auth/verify-otp', { phoneNumber, otp });
}

/**
 * Get current authenticated user profile.
 */
export async function getCurrentUser() {
    return apiClient.get('/auth/me');
}
