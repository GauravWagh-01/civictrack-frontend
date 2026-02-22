/**
 * @param {Object} props
 * @param {number} props.count
 * @param {number} props.total
 */
export function ProjectCounter({ count, total }) {
    const isFiltered = count !== total;

    return (
        <div
            className="fixed top-[140px] right-6 z-[998] bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3"
            role="status"
            aria-live="polite"
        >
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Showing</span>
                <span className="text-lg font-semibold text-gray-900">{count}</span>
                {isFiltered && (
                    <>
                        <span className="text-sm text-gray-400">of</span>
                        <span className="text-sm text-gray-600">{total}</span>
                    </>
                )}
                <span className="text-sm text-gray-600">
                    {count === 1 ? 'project' : 'projects'}
                </span>
            </div>
        </div>
    );
}
