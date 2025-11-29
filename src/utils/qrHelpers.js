import uuid from 'react-native-uuid';

/**
 * Generate secure User QR Code
 * Format: USER:<userId>:<uuid>
 */
/**
 * Generate secure User QR Code with embedded details
 * Format: USER_DATA|userId|name|email
 */
export const generateUserQR = (userId, name, email) => {
    // Simple delimiter-based format to avoid complex JSON/Base64 issues
    return `USER_DATA|${userId}|${name}|${email}`;
};

/**
 * Generate secure Ticket QR Code
 * Format: TKT:<uuid>
 */
export const generateTicketQR = () => {
    return `TKT:${uuid.v4()}`;
};

/**
 * Validate QR Code format
 */
export const validateQRCode = (qrCode) => {
    if (!qrCode) return false;

    const userDataPattern = /^USER_DATA\|.+/;
    const userPattern = /^USER:[a-zA-Z0-9-]+:[a-f0-9-]{36}$/; // Legacy support
    const ticketPattern = /^TKT:[a-f0-9-]{36}$/;

    return userDataPattern.test(qrCode) || userPattern.test(qrCode) || ticketPattern.test(qrCode);
};

/**
 * Parse User QR to get user details
 * Returns object { id, name, email } if valid, null otherwise
 */
export const parseUserQR = (qrCode) => {
    if (!qrCode) return null;

    if (qrCode.startsWith('USER_DATA|')) {
        const parts = qrCode.split('|');
        if (parts.length >= 4) {
            return {
                id: parts[1],
                name: parts[2],
                email: parts[3]
            };
        }
    }

    // Legacy format fallback
    if (qrCode.startsWith('USER:')) {
        const parts = qrCode.split(':');
        if (parts.length >= 2) {
            return { id: parts[1] };
        }
    }
    return null;
};

/**
 * Check if it is a User QR
 */
export const isUserQR = (qrCode) => {
    return qrCode && (qrCode.startsWith('USER:') || qrCode.startsWith('USER_DATA|'));
};

/**
 * Check if it is a Ticket QR
 */
export const isTicketQR = (qrCode) => {
    return qrCode && qrCode.startsWith('TKT:');
};
