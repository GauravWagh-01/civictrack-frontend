import { STATUS_COLORS } from '../utils/constants.js';

const legendItems = [
    { status: 'Proposed', color: STATUS_COLORS.proposed },
    { status: 'In Progress', color: STATUS_COLORS['in-progress'] },
    { status: 'On Hold', color: STATUS_COLORS['on-hold'] },
    { status: 'Completed', color: STATUS_COLORS.completed },
    { status: 'Cancelled', color: STATUS_COLORS.cancelled },
];

export function MapLegend() {
    return (
        <div
            className="fixed bottom-6 left-6 z-[998] bg-white rounded-lg shadow-lg border border-gray-200 p-4 hidden sm:block"
            role="region"
            aria-label="Map legend"
        >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Project Status
            </h3>
            <div className="space-y-2">
                {legendItems.map((item) => (
                    <div key={item.status} className="flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-700">{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
