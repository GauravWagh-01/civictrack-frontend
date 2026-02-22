/**
 * Format currency values for display
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format date strings for display
 * @param {string} dateString
 * @returns {string}
 */
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format large numbers with K/M suffixes
 * @param {number} amount
 * @returns {string}
 */
export function formatCompactNumber(amount) {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
}
