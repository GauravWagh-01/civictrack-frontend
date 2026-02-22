import { useState } from 'react';
import {
    X,
    Calendar,
    DollarSign,
    Building2,
    MessageSquare,
    MapPin,
    HardHat,
    Clock,
    ImageOff,
    ChevronRight,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge.jsx';
import { Progress } from '../app/components/ui/progress.jsx';
import { formatCurrency, formatDate } from '../utils/formatters.js';
import { STATUS_COLORS } from '../utils/constants.js';
import { FeedbackModal } from './FeedbackModal.jsx';
import { LoginModal } from './LoginModal.jsx';

/**
 * Returns a Tailwind progress-bar color class based on project status.
 * @param {import('../api/mockData.js').ProjectStatus} status
 */
function getProgressBarColor(status) {
    switch (status) {
        case 'completed':
            return 'bg-emerald-500';
        case 'in-progress':
            return 'bg-amber-500';
        case 'delayed':
            return 'bg-red-500';
        case 'planned':
        default:
            return 'bg-blue-500';
    }
}

/**
 * Returns a status-based accent color for the top strip.
 * @param {import('../api/mockData.js').ProjectStatus} status
 */
function getAccentGradient(status) {
    switch (status) {
        case 'completed':
            return 'from-emerald-600 to-emerald-500';
        case 'in-progress':
            return 'from-amber-600 to-amber-500';
        case 'delayed':
            return 'from-red-600 to-red-500';
        case 'planned':
        default:
            return 'from-blue-600 to-blue-500';
    }
}

/**
 * Sliding panel showing full project details — government transparency dashboard style
 * @param {Object} props
 * @param {import('../api/mockData.js').InfrastructureProject | null} props.project
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 */
export function ProjectDetailsPanel({ project, isOpen, onClose }) {
    const [imgError, setImgError] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!project) return null;

    const progressColor = getProgressBarColor(project.status);
    const accentGradient = getAccentGradient(project.status);

    return (
        <>
            {/* Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[1000] transition-opacity duration-300"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sliding Panel */}
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white shadow-2xl z-[1001] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-label="Project details"
                aria-hidden={!isOpen}
            >
                {/* Status accent strip */}
                <div
                    className={`h-1 w-full bg-gradient-to-r ${accentGradient} shrink-0`}
                />

                {/* Sticky header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: STATUS_COLORS[project.status] }} />
                        <h2 className="text-base font-semibold text-gray-800 tracking-tight">
                            Project Details
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                        aria-label="Close panel"
                    >
                        <X className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto">
                    {/* ───────── Image Preview ───────── */}
                    <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                        {project.image && !imgError ? (
                            <>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                                {/* Bottom gradient overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                <ImageOff className="w-8 h-8" />
                                <span className="text-xs">No image available</span>
                            </div>
                        )}
                    </div>

                    <div className="p-5 space-y-5">
                        {/* ───────── Title + Status Badge ───────── */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2.5">
                                {project.title}
                            </h3>
                            <StatusBadge status={project.status} />
                        </div>

                        {/* ───────── Progress Bar ───────── */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Completion
                                </span>
                                <span className="text-sm font-bold text-gray-900">
                                    {project.progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor}`}
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>

                        {/* ───────── Timeline ───────── */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-blue-50 rounded-lg">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                </div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Timeline
                                </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white rounded-lg p-3 border border-gray-100">
                                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                                        Start Date
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {formatDate(project.startDate)}
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-3 border border-gray-100">
                                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                                        Expected End
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {formatDate(project.expectedCompletion)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ───────── Contractor & Department ───────── */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Contractor */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="p-1.5 bg-orange-50 rounded-lg">
                                        <HardHat className="w-3.5 h-3.5 text-orange-600" />
                                    </div>
                                    <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                                        Contractor
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 leading-snug">
                                    {project.contractor}
                                </p>
                            </div>

                            {/* Department */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <div className="p-1.5 bg-indigo-50 rounded-lg">
                                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                                        Department
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 leading-snug">
                                    {project.department}
                                </p>
                            </div>
                        </div>

                        {/* ───────── Location ───────── */}
                        <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="p-1.5 bg-rose-50 rounded-lg shrink-0">
                                <MapPin className="w-4 h-4 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
                                    Location
                                </p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {project.location}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {project.coordinates[0].toFixed(4)}°N, {Math.abs(project.coordinates[1]).toFixed(4)}°W
                                </p>
                            </div>
                        </div>

                        {/* ───────── Budget ───────── */}
                        <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="p-1.5 bg-emerald-50 rounded-lg shrink-0">
                                <DollarSign className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
                                    Total Budget
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                    {formatCurrency(project.budget)}
                                </p>
                            </div>
                        </div>

                        {/* ───────── Description ───────── */}
                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Project Description
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* ───────── Submit Feedback CTA ───────── */}
                        <button
                            onClick={() => {
                                if (isAuthenticated) {
                                    setFeedbackOpen(true);
                                } else {
                                    setLoginOpen(true);
                                }
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 active:scale-[0.98] cursor-pointer"
                        >
                            <MessageSquare className="w-4.5 h-4.5" />
                            Submit Feedback
                            <ChevronRight className="w-4 h-4 opacity-60" />
                        </button>

                        {/* Login Modal */}
                        <LoginModal
                            open={loginOpen}
                            onOpenChange={setLoginOpen}
                            onLoginSuccess={() => {
                                setIsAuthenticated(true);
                                setFeedbackOpen(true);
                            }}
                        />

                        {/* Feedback Modal */}
                        <FeedbackModal
                            open={feedbackOpen}
                            onOpenChange={setFeedbackOpen}
                            projectTitle={project.title}
                        />

                        {/* ───────── Footer metadata ───────── */}
                        <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gray-300" />
                            <p className="text-[11px] text-gray-400">
                                ID: {project.id} &nbsp;·&nbsp; Last updated: February 22, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
