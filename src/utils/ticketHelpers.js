/**
 * Check if a ticket has expired (7 days from purchase)
 */
export const isTicketExpired = (purchaseDate) => {
    if (!purchaseDate) return false;
    const purchase = new Date(purchaseDate);
    const now = new Date();
    const daysDiff = Math.floor((now - purchase) / (1000 * 60 * 60 * 24));
    return daysDiff > 7;
};

/**
 * Calculate expiry date (7 days from purchase)
 */
export const calculateExpiryDate = (purchaseDate) => {
    const purchase = new Date(purchaseDate);
    const expiry = new Date(purchase);
    expiry.setDate(expiry.getDate() + 7);
    return expiry.toISOString().split('T')[0]; // YYYY-MM-DD format
};

/**
 * Get days remaining until expiration
 */
export const getDaysRemaining = (purchaseDate) => {
    if (!purchaseDate) return 0;
    const purchase = new Date(purchaseDate);
    const now = new Date();
    const expiryDate = new Date(purchase);
    expiryDate.setDate(expiryDate.getDate() + 7);

    const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
};

/**
 * Get actual ticket status (checks expiration)
 */
export const getActualTicketStatus = (ticket) => {
    if (!ticket) return null;
    if (isTicketExpired(ticket.purchaseDate)) {
        return 'Expired';
    }
    return ticket.status;
};
