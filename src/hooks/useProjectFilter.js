import { useState, useMemo, useEffect, useCallback } from 'react';
import { ProjectService } from '../services/projectService.js';

/**
 * Hook that fetches projects from the API and provides
 * client-side filtering by status & search query.
 *
 * Exposes `loading` and `error` states for the UI.
 */
export function useProjectFilter() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ── Fetch projects on mount ────────────────────────────────────
    const fetchProjects = useCallback(async (force = false) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProjectService.getAllProjects(force);
            setProjects(data);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
            setError(err.message || 'Failed to load projects');
            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // ── Client-side filter + search ────────────────────────────────
    const filteredProjects = useMemo(() => {
        let result = projects;

        if (statusFilter !== 'all') {
            result = result.filter((p) => p.status === statusFilter);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.department.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        return result;
    }, [projects, statusFilter, searchQuery]);

    return {
        filteredProjects,
        allProjects: projects,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        refetch: () => fetchProjects(true),
    };
}
