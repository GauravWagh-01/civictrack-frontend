import {
    X,
    Calendar,
    DollarSign,
    Building2,
    MessageSquare,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { Progress } from '../app/components/ui/progress.jsx';
import { formatCurrency, formatDate } from '../utils/formatters.js';

/**
 * Sliding panel showing full project details
 * @param {Object} props
 * @param {import('../api/mockData.js').InfrastructureProject | null} props.project
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 */
export function ProjectDetailsPanel({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-[1000] lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sliding Panel */}
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[1001] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-label="Project details"
                aria-hidden={!isOpen}
            >
                <div className="h-full overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Project Details
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close panel"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Project Title */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                {project.title}
                            </h3>
                            <StatusBadge status={project.status} />
                        </div>

                        {/* Progress Bar */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Progress
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {project.progress}%
                                </span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Description
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="space-y-3">
                            {/* Budget */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <DollarSign className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {formatCurrency(project.budget)}
                                    </p>
                                </div>
                            </div>

                            {/* Department */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Department</p>
                                    <p className="text-base font-medium text-gray-900">
                                        {project.department}
                                    </p>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div>
                                        <p className="text-sm text-gray-600">Start Date</p>
                                        <p className="text-base font-medium text-gray-900">
                                            {formatDate(project.startDate)}
                                        </p>
                                    </div>
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-sm text-gray-600">
                                            Expected Completion
                                        </p>
                                        <p className="text-base font-medium text-gray-900">
                                            {formatDate(project.expectedCompletion)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Feedback Button */}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <MessageSquare className="w-5 h-5" />
                            Submit Feedback
                        </button>

                        {/* Additional Info */}
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                                Project ID: {project.id} • Last updated: February 22, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
