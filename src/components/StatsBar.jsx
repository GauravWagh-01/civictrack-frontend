import { useMemo } from 'react';
import { formatCompactNumber } from '../utils/formatters.js';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Stats bar showing project counts by status and total budget.
 * Supports all 5 backend statuses: proposed, in-progress, completed, on-hold, cancelled.
 * @param {Object} props
 * @param {any[]} props.projects
 * @param {boolean} [props.loading]
 * @param {string|null} [props.error]
 */
export function StatsBar({ projects, loading, error }) {
    const stats = useMemo(
        () => ({
            total: projects.length,
            proposed: projects.filter((p) => p.status === 'proposed').length,
            inProgress: projects.filter((p) => p.status === 'in-progress').length,
            onHold: projects.filter((p) => p.status === 'on-hold').length,
            completed: projects.filter((p) => p.status === 'completed').length,
            cancelled: projects.filter((p) => p.status === 'cancelled').length,
            totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
        }),
        [projects]
    );

    return (
        <div
            className="fixed top-[73px] left-0 right-0 z-[998] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
            role="region"
            aria-label="Project statistics"
        >
            <div className="px-4 sm:px-6 lg:px-8 py-3">
                {loading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading projects...
                    </div>
                ) : error ? (
                    <div className="flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                ) : (
                    <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm text-gray-600">Total Projects:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {stats.total}
                            </span>
                        </div>
                        <div className="w-px h-4 bg-gray-300 hidden sm:block" />
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-sm text-gray-600">Proposed:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {stats.proposed}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="text-sm text-gray-600">In Progress:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {stats.inProgress}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-sm text-gray-600">On Hold:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {stats.onHold}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm text-gray-600">Completed:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {stats.completed}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                            <span className="text-sm text-gray-600">Cancelled:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {stats.cancelled}
                            </span>
                        </div>
                        <div className="w-px h-4 bg-gray-300 hidden sm:block" />
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm text-gray-600">Total Budget:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {formatCompactNumber(stats.totalBudget)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
