import { useState } from 'react';
import { MapView } from '../components/MapView.jsx';
import { MapLegend } from '../components/MapLegend.jsx';
import { StatsBar } from '../components/StatsBar.jsx';
import { ProjectDetailsPanel } from '../components/ProjectDetailsPanel.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { ProjectCounter } from '../components/ProjectCounter.jsx';
import { useFilter } from '../contexts/FilterContext.jsx';
import { Loader2, RefreshCw, WifiOff } from 'lucide-react';

export function MapPage() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const { filteredProjects, allProjects, loading, error, refetch } = useFilter();

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
    };

    return (
        <>
            <StatsBar projects={filteredProjects} loading={loading} error={error} />

            <div className="absolute top-[130px] left-0 right-0 bottom-0">
                {loading ? (
                    /* Full-page loading state */
                    <div className="h-full flex flex-col items-center justify-center bg-gray-50">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                        <p className="text-sm font-medium text-gray-600">Loading projects...</p>
                        <p className="text-xs text-gray-400 mt-1">Connecting to CivicTrack API</p>
                    </div>
                ) : error ? (
                    /* Error state */
                    <div className="h-full flex flex-col items-center justify-center bg-gray-50 px-6">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                            <WifiOff className="w-8 h-8 text-red-400" />
                        </div>
                        <p className="text-base font-semibold text-gray-800 mb-1">
                            Unable to load projects
                        </p>
                        <p className="text-sm text-gray-500 text-center max-w-sm mb-5">
                            {error}. Make sure the backend server is running at localhost:8080.
                        </p>
                        <button
                            onClick={refetch}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                ) : (
                    <MapView
                        projects={filteredProjects}
                        onProjectClick={handleProjectClick}
                    />
                )}
            </div>

            {!loading && !error && (
                <>
                    <ProjectCounter count={filteredProjects.length} total={allProjects.length} />
                    {filteredProjects.length === 0 && <EmptyState />}
                    <MapLegend />
                </>
            )}

            <ProjectDetailsPanel
                project={selectedProject}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
            />
        </>
    );
}
