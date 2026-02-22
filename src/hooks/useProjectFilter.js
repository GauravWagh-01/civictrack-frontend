import { useState, useMemo } from 'react';
import { ProjectService } from '../services/projectService.js';

export function useProjectFilter() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = useMemo(() => {
        let projects = ProjectService.getAllProjects();

        if (statusFilter !== 'all') {
            projects = projects.filter((project) => project.status === statusFilter);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            projects = projects.filter(
                (project) =>
                    project.title.toLowerCase().includes(query) ||
                    project.department.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query)
            );
        }

        return projects;
    }, [statusFilter, searchQuery]);

    return {
        filteredProjects,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
    };
}
