/**
 * Color mapping for project statuses
 * @type {Record<import('../api/mockData.js').ProjectStatus, string>}
 */
export const STATUS_COLORS = {
    planned: '#3B82F6',
    'in-progress': '#EAB308',
    delayed: '#EF4444',
    completed: '#10B981',
};

/**
 * Status configuration for badges and filters
 */
export const STATUS_CONFIG = {
    planned: {
        label: 'Planned',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    'in-progress': {
        label: 'In Progress',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    delayed: {
        label: 'Delayed',
        className: 'bg-red-100 text-red-700 border-red-200',
    },
    completed: {
        label: 'Completed',
        className: 'bg-green-100 text-green-700 border-green-200',
    },
};

/** Default map center (New York City) */
export const DEFAULT_MAP_CENTER = [40.7589, -73.9851];

/** Default map zoom level */
export const DEFAULT_MAP_ZOOM = 12;
