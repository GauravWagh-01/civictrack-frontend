/**
 * Transform backend ProjectResponseDTO → frontend project shape.
 *
 * Handles:
 *  - Status enum mapping (UPPER_CASE → kebab-case)
 *  - Coordinate format (separate lat/lng → [lat, lng] array)
 *  - Budget (BigDecimal string → number)
 *  - Date normalization
 *  - Progress computation from dates (temporary, until backend field is added)
 *  - Default values for missing fields (image, location display name)
 */

// ── Status mapping ──────────────────────────────────────────────────
const STATUS_MAP = {
    PROPOSED: 'proposed',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    ON_HOLD: 'on-hold',
    CANCELLED: 'cancelled',
};

/**
 * Convert backend status enum to frontend slug.
 * Falls back to lowercase-with-hyphens for unknown values.
 */
function mapStatus(backendStatus) {
    return STATUS_MAP[backendStatus] || backendStatus?.toLowerCase().replace(/_/g, '-') || 'proposed';
}

/**
 * Compute rough progress % from start date and expected completion date.
 * Temporary — will be replaced once the backend adds a `progress` field.
 */
function computeProgress(startDate, expectedCompletionDate, status) {
    if (status === 'completed') return 100;
    if (status === 'proposed') return 0;
    if (status === 'cancelled') return 0;

    if (!startDate || !expectedCompletionDate) return 0;

    const start = new Date(startDate);
    const end = new Date(expectedCompletionDate);
    const now = new Date();

    const totalDuration = end - start;
    if (totalDuration <= 0) return 0;

    const elapsed = now - start;
    const pct = Math.round((elapsed / totalDuration) * 100);
    return Math.max(0, Math.min(pct, 99)); // cap at 99 for non-completed
}

/**
 * Transform a single backend project DTO to the frontend shape.
 */
export function transformProject(dto) {
    const status = mapStatus(dto.status);

    return {
        id: dto.id,
        title: dto.title,
        description: dto.description || '',
        category: dto.category?.toLowerCase().replace(/_/g, '-') || 'other',
        status,
        budget: Number(dto.budget) || 0,
        department: dto.department || '',
        contractor: dto.contractor || '',
        coordinates: [dto.latitude, dto.longitude],
        city: dto.city || '',
        startDate: dto.startDate || null,
        expectedCompletion: dto.expectedCompletionDate || null,
        actualCompletion: dto.actualCompletionDate || null,
        createdAt: dto.createdAt || null,
        updatedAt: dto.updatedAt || null,
        isActive: dto.isActive ?? true,
        feedbackCount: dto.feedbackCount ?? 0,

        // ── Computed / defaulted fields ─────────────────────────
        progress: computeProgress(dto.startDate, dto.expectedCompletionDate, status),
        location: dto.location || dto.city || '',
        image: dto.image || dto.imageUrl || null,
    };
}

/**
 * Transform an array of backend project DTOs.
 */
export function transformProjects(dtos) {
    if (!Array.isArray(dtos)) return [];
    return dtos.map(transformProject);
}
