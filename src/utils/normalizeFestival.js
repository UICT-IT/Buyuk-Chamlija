/**
 * Fallback values used when normalizing festival data
 */
export const FALLBACK_VALUES = {
    LOCATION: 'Location TBA',
    NAME: 'Untitled Event',
    DATE_TIME: 'Date TBA',
    DESCRIPTION: 'No description available.',
    ENTRANCE_FEE_ADULT: 'R50',
    ENTRANCE_FEE_CHILD: 'R25',
};

/**
 * Safely trims a string value, returns fallback if not a valid string
 * @param {*} value - Value to trim
 * @param {string} fallback - Fallback value if invalid
 * @returns {string} - Trimmed string or fallback
 */
function safeString(value, fallback = '') {
    try {
        if (typeof value === 'string') {
            return value.trim();
        }
        return fallback;
    } catch (error) {
        return fallback;
    }
}

/**
 * Safely converts a value to an array, returns empty array if invalid
 * @param {*} value - Value to convert to array
 * @returns {Array} - Array or empty array
 */
function safeArray(value) {
    try {
        if (Array.isArray(value)) {
            return value;
        }
        return [];
    } catch (error) {
        return [];
    }
}

/**
 * Safely validates a date value, returns as string or null
 * @param {*} value - Date value to validate
 * @returns {string|null} - Date as string or null if invalid
 */
function safeDate(value) {
    try {
        if (!value) return null;

        // Already a string
        if (typeof value === 'string') {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : value.trim();
        }

        // Date object
        if (value instanceof Date) {
            return isNaN(value.getTime()) ? null : value.toISOString();
        }

        // Timestamp
        if (typeof value === 'number') {
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : date.toISOString();
        }

        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Validates that an image is a valid require() object
 * @param {*} value - Image value to validate
 * @returns {*} - Valid image or null
 */
function safeImage(value) {
    try {
        // Check if it's a valid require object (has uri or is a number)
        if (value && (typeof value === 'number' || (typeof value === 'object' && value.uri))) {
            return value;
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Normalizes a raw festival/event object into a safe, guaranteed structure
 * @param {Object} raw - Raw festival data from any source
 * @returns {Object} - Normalized festival object with all required fields
 */
export function normalizeFestival(raw) {
    try {
        // Handle null/undefined input
        if (!raw || typeof raw !== 'object') {
            raw = {};
        }

        return {
            id: safeString(raw.id, `festival-${Date.now()}`),
            name: safeString(raw.name, FALLBACK_VALUES.NAME),
            startDate: safeDate(raw.startDate),
            endDate: safeDate(raw.endDate),
            dateTime: safeString(raw.dateTime, FALLBACK_VALUES.DATE_TIME),
            location: safeString(raw.location, FALLBACK_VALUES.LOCATION),
            description: safeString(raw.description, FALLBACK_VALUES.DESCRIPTION),
            image: safeImage(raw.image),
            gallery: safeArray(raw.gallery),
            entranceFeeAdult: safeString(raw.entranceFeeAdult, FALLBACK_VALUES.ENTRANCE_FEE_ADULT),
            entranceFeeChild: safeString(raw.entranceFeeChild, FALLBACK_VALUES.ENTRANCE_FEE_CHILD),
            // Preserve any additional fields that might exist
            ...(raw.isActive !== undefined && { isActive: Boolean(raw.isActive) }),
        };
    } catch (error) {
        console.error('Error normalizing festival:', error);
        // Return minimal safe object on catastrophic failure
        return {
            id: `festival-${Date.now()}`,
            name: FALLBACK_VALUES.NAME,
            startDate: null,
            endDate: null,
            dateTime: FALLBACK_VALUES.DATE_TIME,
            location: FALLBACK_VALUES.LOCATION,
            description: FALLBACK_VALUES.DESCRIPTION,
            image: null,
            gallery: [],
            entranceFeeAdult: FALLBACK_VALUES.ENTRANCE_FEE_ADULT,
            entranceFeeChild: FALLBACK_VALUES.ENTRANCE_FEE_CHILD,
        };
    }
}
