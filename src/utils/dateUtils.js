/**
 * Safely converts various date formats into a JavaScript Date object
 * @param {string|number|Date} dateInput - Date as string, timestamp, or Date object
 * @returns {Date|null} - Parsed Date object or null if invalid
 */
function parseDate(dateInput) {
    if (!dateInput) return null;

    // Already a Date object
    if (dateInput instanceof Date) {
        return isNaN(dateInput.getTime()) ? null : dateInput;
    }

    // Timestamp (number)
    if (typeof dateInput === 'number') {
        const date = new Date(dateInput);
        return isNaN(date.getTime()) ? null : date;
    }

    // String
    if (typeof dateInput === 'string') {
        const date = new Date(dateInput);
        return isNaN(date.getTime()) ? null : date;
    }

    return null;
}

/**
 * Checks if an event is currently happening
 * Treats start and end dates as inclusive (entire day counts)
 * @param {string|number|Date} startDate - Event start date
 * @param {string|number|Date} endDate - Event end date
 * @returns {boolean} - True if event is currently happening
 */
export function isCurrentEvent(startDate, endDate) {
    try {
        const start = parseDate(startDate);
        const end = parseDate(endDate);

        // Return false if dates are invalid
        if (!start || !end) return false;

        const now = new Date();

        // Set end date to end of day (23:59:59.999) to make it inclusive
        const endOfDay = new Date(end);
        endOfDay.setHours(23, 59, 59, 999);

        // Check if now is between start and end (inclusive)
        return now >= start && now <= endOfDay;
    } catch (error) {
        console.error('Error in isCurrentEvent:', error);
        return false;
    }
}

/**
 * Checks if an event is upcoming (starts in the future)
 * @param {string|number|Date} startDate - Event start date
 * @returns {boolean} - True if event starts in the future
 */
export function isUpcomingEvent(startDate) {
    try {
        const start = parseDate(startDate);

        // Return false if date is invalid
        if (!start) return false;

        const now = new Date();

        // Event is upcoming if start date is in the future
        return now < start;
    } catch (error) {
        console.error('Error in isUpcomingEvent:', error);
        return false;
    }
}
