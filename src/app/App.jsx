import { TopNavigation } from '../layouts/TopNavigation.jsx';
import { MapPage } from '../pages/MapPage.jsx';
import { FilterProvider, useFilter } from '../contexts/FilterContext.jsx';
import { ErrorBoundary } from '../components/ErrorBoundary.jsx';
import 'leaflet/dist/leaflet.css';

function AppContent() {
    const { statusFilter, setStatusFilter, searchQuery, setSearchQuery } =
        useFilter();

    return (
        <div className="h-screen w-screen overflow-hidden bg-gray-100">
            <TopNavigation
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />
            <MapPage />
        </div>
    );
}

export default function App() {
    return (
        <ErrorBoundary>
            <FilterProvider>
                <AppContent />
            </FilterProvider>
        </ErrorBoundary>
    );
}
