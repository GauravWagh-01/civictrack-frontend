import apiClient from './apiClient.js';
import { transformProject, transformProjects } from './projectTransformer.js';

/**
 * Project API — public endpoints for reading infrastructure projects.
 *
 * All calls automatically unwrap the ApiResponse envelope via apiClient
 * and transform backend DTOs to the frontend project shape.
 */

/** Fetch all projects */
export async function getAllProjects() {
    const data = await apiClient.get('/projects');
    return transformProjects(data);
}

/** Fetch a single project by UUID */
export async function getProjectById(id) {
    const data = await apiClient.get(`/projects/${id}`);
    return transformProject(data);
}

/** Fetch projects filtered by city */
export async function getProjectsByCity(city) {
    const data = await apiClient.get(`/projects/city/${encodeURIComponent(city)}`);
    return transformProjects(data);
}
