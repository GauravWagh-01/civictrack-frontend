/**
 * Color mapping for project statuses — all 5 backend statuses
 * @type {Record<string, string>}
 */
export const STATUS_COLORS = {
    proposed: '#3B82F6',   // blue
    'in-progress': '#EAB308',   // yellow
    completed: '#10B981',   // green
    'on-hold': '#F97316',   // orange
    cancelled: '#6B7280',   // gray
};

/**
 * Status configuration for badges and filters
 */
export const STATUS_CONFIG = {
    proposed: {
        label: 'Proposed',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    'in-progress': {
        label: 'In Progress',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    completed: {
        label: 'Completed',
        className: 'bg-green-100 text-green-700 border-green-200',
    },
    'on-hold': {
        label: 'On Hold',
        className: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    cancelled: {
        label: 'Cancelled',
        className: 'bg-gray-100 text-gray-500 border-gray-200',
    },
};

/** Default map center (New York City) */
export const DEFAULT_MAP_CENTER = [40.7589, -73.9851];

/** Default map zoom level */
export const DEFAULT_MAP_ZOOM = 12;
