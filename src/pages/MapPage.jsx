import { useState } from 'react';
import { MapView } from '../components/MapView.jsx';
import { MapLegend } from '../components/MapLegend.jsx';
import { StatsBar } from '../components/StatsBar.jsx';
import { ProjectDetailsPanel } from '../components/ProjectDetailsPanel.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { ProjectCounter } from '../components/ProjectCounter.jsx';
import { useFilter } from '../contexts/FilterContext.jsx';
import { ProjectService } from '../services/projectService.js';

export function MapPage() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const { filteredProjects } = useFilter();
    const totalProjects = ProjectService.getAllProjects().length;

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
    };

    return (
        <>
            <StatsBar projects={filteredProjects} />

            <div className="absolute top-[130px] left-0 right-0 bottom-0">
                <MapView
                    projects={filteredProjects}
                    onProjectClick={handleProjectClick}
                />
            </div>

            <ProjectCounter count={filteredProjects.length} total={totalProjects} />

            {filteredProjects.length === 0 && <EmptyState />}

            <MapLegend />

            <ProjectDetailsPanel
                project={selectedProject}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
            />
        </>
    );
}
