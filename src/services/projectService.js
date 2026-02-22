import { mockProjects } from '../api/mockData.js';

export class ProjectService {
    static getAllProjects() {
        return mockProjects;
    }

    static getProjectById(id) {
        return mockProjects.find((project) => project.id === id);
    }

    static filterProjectsByStatus(status) {
        if (status === 'all') return mockProjects;
        return mockProjects.filter((project) => project.status === status);
    }

    static searchProjects(query) {
        const lowerQuery = query.toLowerCase();
        return mockProjects.filter(
            (project) =>
                project.title.toLowerCase().includes(lowerQuery) ||
                project.department.toLowerCase().includes(lowerQuery) ||
                project.description.toLowerCase().includes(lowerQuery)
        );
    }
}
