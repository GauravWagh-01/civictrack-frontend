import apiClient from './apiClient.js';

/**
 * Feedback API — submit feedback and retrieve feedback for projects.
 */

/**
 * Submit feedback for a project.
 * @param {Object} payload
 * @param {string} payload.projectId  — UUID
 * @param {string} payload.userId     — UUID
 * @param {string} payload.comment
 * @param {string} [payload.imageUrl]
 * @param {number} [payload.latitude]
 * @param {number} [payload.longitude]
 * @param {boolean} [payload.isAnonymous]
 */
export async function submitFeedback(payload) {
    return apiClient.post('/feedback', payload);
}

/**
 * Get all feedback for a specific project.
 * @param {string} projectId — UUID
 */
export async function getFeedbackByProject(projectId) {
    return apiClient.get(`/projects/${projectId}/feedback`);
}

/**
 * Upload a file (photo evidence).
 * @param {File} file
 * @returns {Promise<string>} — URL of the uploaded file
 */
export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}
