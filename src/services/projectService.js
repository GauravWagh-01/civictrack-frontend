import { getAllProjects as fetchAllProjects, getProjectById as fetchProjectById } from '../api/projectApi.js';

/**
 * Project service — async wrapper around the REST API.
 * Provides the same interface as before but now hits the backend.
 */
export class ProjectService {
    /** @type {import('../api/projectTransformer.js').FrontendProject[] | null} */
    static _cache = null;

    /**
     * Fetch all projects from the API.
     * Caches the result for the session to avoid redundant calls.
     * @param {boolean} [forceRefresh=false]
     * @returns {Promise<any[]>}
     */
    static async getAllProjects(forceRefresh = false) {
        if (!forceRefresh && ProjectService._cache) {
            return ProjectService._cache;
        }
        const projects = await fetchAllProjects();
        ProjectService._cache = projects;
        return projects;
    }

    /**
     * Fetch a single project by UUID.
     * @param {string} id
     */
    static async getProjectById(id) {
        return fetchProjectById(id);
    }

    /**
     * Invalidate the project cache (e.g. after submitting feedback).
     */
    static invalidateCache() {
        ProjectService._cache = null;
    }
}
