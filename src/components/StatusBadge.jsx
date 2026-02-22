import { STATUS_CONFIG } from '../utils/constants.js';

/**
 * @param {Object} props
 * @param {import('../api/mockData.js').ProjectStatus} props.status
 */
export function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status];

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.className}`}
        >
            {config.label}
        </span>
    );
}
