import { Search } from 'lucide-react';
import { FilterDialog } from '../components/FilterDialog.jsx';

/**
 * @param {Object} props
 * @param {string} props.searchQuery
 * @param {(query: string) => void} props.onSearchChange
 * @param {string} props.statusFilter
 * @param {(status: string) => void} props.onStatusFilterChange
 */
export function TopNavigation({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}) {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-[999] bg-white border-b border-gray-200 shadow-sm"
            aria-label="Main navigation"
        >
            <div className="px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-semibold text-gray-900">
                                CivicTrack
                            </h1>
                            <p className="text-xs text-gray-500">
                                Infrastructure Transparency
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                type="text"
                                placeholder="Search projects, departments..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                aria-label="Search projects"
                            />
                        </div>
                    </div>

                    {/* Filter Button */}
                    <div className="flex-shrink-0">
                        <FilterDialog
                            statusFilter={statusFilter}
                            onStatusFilterChange={onStatusFilterChange}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
