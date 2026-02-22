import { useMemo } from 'react';
import { formatCompactNumber } from '../utils/formatters.js';

/**
 * Stats bar showing project counts by status and total budget
 * @param {Object} props
 * @param {import('../api/mockData.js').InfrastructureProject[]} props.projects
 */
export function StatsBar({ projects }) {
    const stats = useMemo(
        () => ({
            total: projects.length,
            planned: projects.filter((p) => p.status === 'planned').length,
            inProgress: projects.filter((p) => p.status === 'in-progress').length,
            delayed: projects.filter((p) => p.status === 'delayed').length,
            completed: projects.filter((p) => p.status === 'completed').length,
            totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
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
                        <span className="text-sm text-gray-600">Planned:</span>
                        <span className="text-sm font-semibold text-gray-900">
                            {stats.planned}
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
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-sm text-gray-600">Delayed:</span>
                        <span className="text-sm font-semibold text-gray-900">
                            {stats.delayed}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-600">Completed:</span>
                        <span className="text-sm font-semibold text-gray-900">
                            {stats.completed}
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
            </div>
        </div>
    );
}
