import { FALLBACK_VALUES } from './normalizeFestival';

/**
 * Checks if event has a real location (not a fallback placeholder)
 * @param {Object} event - Normalized festival/event object
 * @returns {boolean} - True if location is real data, false if fallback
 */
export const hasRealLocation = (event) => {
    return event?.location && event.location !== FALLBACK_VALUES.LOCATION;
};

/**
 * Determines if map action should be enabled for this event
 * @param {Object} event - Normalized festival/event object
 * @returns {boolean} - True if opening map is safe/appropriate
 */
export const canOpenMapForEvent = (event) => {
    return hasRealLocation(event);
};

/**
 * Determines if location should be included in share message
 * @param {Object} event - Normalized festival/event object
 * @returns {boolean} - True if location should be shared
 */
export const shouldIncludeLocationInShare = (event) => {
    return hasRealLocation(event);
};
