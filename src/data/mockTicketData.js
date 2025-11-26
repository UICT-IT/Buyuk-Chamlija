// Mock data for ticket system

// Pricing constants
export const TICKET_PRICING = {
    KIDS: 25,
    ADULTS: 50,
};

// Ticket statuses
export const TICKET_STATUS = {
    PENDING: 'Pending Payment',
    PAID: 'Paid',
    ACTIVE: 'Active',
    EXPIRED: 'Expired',
};

// Mock user tickets
export const mockTickets = [
    {
        id: 'TKT-001',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        qrCode: 'QR-TKT-001',
        status: TICKET_STATUS.ACTIVE,
        kids: 2,
        adults: 2,
        totalAmount: 150, // (2 * 25) + (2 * 50)
        purchaseDate: '2025-11-20',
        expiryDate: '2025-11-27',
    },
    {
        id: 'TKT-002',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        qrCode: 'QR-TKT-002',
        status: TICKET_STATUS.PAID,
        kids: 1,
        adults: 1,
        totalAmount: 75, // (1 * 25) + (1 * 50)
        purchaseDate: '2025-11-25',
        expiryDate: '2025-12-02',
    },
    {
        id: 'TKT-003',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        qrCode: 'QR-TKT-003',
        status: TICKET_STATUS.PENDING,
        kids: 3,
        adults: 0,
        totalAmount: 75, // (3 * 25)
        purchaseDate: '2025-11-26',
        expiryDate: '2025-12-03',
    },
    {
        id: 'TKT-004',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        qrCode: 'QR-TKT-004',
        status: TICKET_STATUS.EXPIRED,
        kids: 0,
        adults: 2,
        totalAmount: 100, // (2 * 50)
        purchaseDate: '2025-11-10',
        expiryDate: '2025-11-17',
    },
];

// Mock seller credentials
export const mockSellers = [
    {
        id: 'seller-1',
        username: 'seller',
        password: 'seller123',
        name: 'Jane Smith',
        email: 'jane.seller@example.com',
    },
];

// Mock sale history
export const mockSaleHistory = [
    {
        id: 'SALE-001',
        ticketId: 'TKT-001',
        sellerId: 'seller-1',
        sellerName: 'Jane Smith',
        customerName: 'John Doe',
        kids: 2,
        adults: 2,
        totalAmount: 150,
        saleDate: '2025-11-20T10:30:00',
    },
    {
        id: 'SALE-002',
        ticketId: 'TKT-002',
        sellerId: 'seller-1',
        sellerName: 'Jane Smith',
        customerName: 'John Doe',
        kids: 1,
        adults: 1,
        totalAmount: 75,
        saleDate: '2025-11-25T14:15:00',
    },
];

// Helper function to calculate ticket price
export const calculateTicketPrice = (kids, adults) => {
    return (kids * TICKET_PRICING.KIDS) + (adults * TICKET_PRICING.ADULTS);
};

// Helper function to get ticket by QR code
export const getTicketByQR = (qrCode) => {
    return mockTickets.find(ticket => ticket.qrCode === qrCode);
};

// Helper function to get status color
export const getStatusColor = (status) => {
    switch (status) {
        case TICKET_STATUS.ACTIVE:
            return '#4CAF50'; // Green
        case TICKET_STATUS.PAID:
            return '#2196F3'; // Blue
        case TICKET_STATUS.PENDING:
            return '#FF9800'; // Orange
        case TICKET_STATUS.EXPIRED:
            return '#9E9E9E'; // Gray
        default:
            return '#666';
    }
};
