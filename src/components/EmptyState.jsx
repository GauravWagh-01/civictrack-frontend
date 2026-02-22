import { Search } from 'lucide-react';

/**
 * @param {Object} props
 * @param {string} [props.message]
 * @param {string} [props.description]
 */
export function EmptyState({
    message = 'No projects found',
    description = 'Try adjusting your filters or search query',
}) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-[997] pointer-events-none"
            role="status"
        >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-md text-center pointer-events-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}
