import { Filter } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../app/components/ui/dialog.jsx';

const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'planned', label: 'Planned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'completed', label: 'Completed' },
];

/**
 * @param {Object} props
 * @param {string} props.statusFilter
 * @param {(status: string) => void} props.onStatusFilterChange
 */
export function FilterDialog({ statusFilter, onStatusFilterChange }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    aria-label="Open filter dialog"
                >
                    <Filter className="w-4 h-4 text-gray-600" aria-hidden="true" />
                    <span className="text-sm font-medium text-gray-700">Filter</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Filter Projects</DialogTitle>
                    <DialogDescription>
                        Filter infrastructure projects by status
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-4" role="radiogroup" aria-label="Status filter">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onStatusFilterChange(option.value)}
                            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${statusFilter === option.value
                                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            role="radio"
                            aria-checked={statusFilter === option.value}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={`font-medium ${statusFilter === option.value
                                            ? 'text-blue-700'
                                            : 'text-gray-700'
                                        }`}
                                >
                                    {option.label}
                                </span>
                                {statusFilter === option.value && (
                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
