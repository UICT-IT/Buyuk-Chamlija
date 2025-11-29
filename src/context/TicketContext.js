import React, { createContext, useState, useEffect, useContext } from 'react';


const TicketContext = createContext();

const STORAGE_KEY = '@buyuk_chamlija_tickets';

const { db } = require('../config/firebaseConfig');
import { collection, getDocs, addDoc, updateDoc, doc, query, where, onSnapshot, setDoc } from 'firebase/firestore';

// Collection reference
const TICKETS_COLLECTION = 'tickets';

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load tickets from Firestore on mount and setup real-time listener
    useEffect(() => {
        const q = query(collection(db, TICKETS_COLLECTION));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ticketsList = [];
            querySnapshot.forEach((doc) => {
                ticketsList.push({ ...doc.data(), id: doc.id });
            });
            setTickets(ticketsList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tickets: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Add a new ticket to Firestore
     * @param {Object} newTicket - Ticket object to add
     * @returns {Promise<Object>} The added ticket
     */
    const addTicket = async (newTicket) => {
        try {
            // We use setDoc with a custom ID if provided, or addDoc for auto-ID
            // Here we use the ID from the newTicket object if it exists to keep consistency
            // or let Firestore generate one. 
            // However, our app generates IDs like 'TKT-...' so we should use setDoc.

            const ticketRef = doc(db, TICKETS_COLLECTION, newTicket.id);
            await setDoc(ticketRef, newTicket);

            // No need to manually update state, onSnapshot will handle it
            return newTicket;
        } catch (error) {
            console.error("Error adding ticket: ", error);
            throw error;
        }
    };

    /**
     * Update an existing ticket in Firestore
     * @param {string} ticketId - ID of ticket to update
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object|null>} Updated ticket or null if not found
     */
    const updateTicket = async (ticketId, updates) => {
        try {
            const ticketRef = doc(db, TICKETS_COLLECTION, ticketId);
            await updateDoc(ticketRef, updates);
            // No need to return the full object, onSnapshot updates state
            return { id: ticketId, ...updates };
        } catch (error) {
            console.error("Error updating ticket: ", error);
            throw error;
        }
    };

    /**
     * Delete a ticket (Not used in current flow but good to have)
     */
    const deleteTicket = async (ticketId) => {
        // Implementation skipped for now as not requested
        return true;
    };

    /**
     * Get all tickets for a specific user
     * @param {string} userId - User ID
     * @returns {Array} Array of tickets for the user
     */
    const getUserTickets = (userId) => {
        return tickets.filter(t => t.userId === userId);
    };

    /**
     * Get a single ticket by ID
     * @param {string} ticketId - Ticket ID
     * @returns {Object|null} Ticket object or null if not found
     */
    const getTicketById = (ticketId) => {
        return tickets.find(t => t.id === ticketId) || null;
    };

    /**
     * Get a ticket by QR code
     * @param {string} qrCode - QR code string
     * @returns {Object|null} Ticket object or null if not found
     */
    const getTicketByQR = (qrCode) => {
        return tickets.find(t => t.qrCode === qrCode) || null;
    };

    /**
     * Refresh tickets (No-op with onSnapshot, but kept for API compatibility)
     */
    const refreshTickets = async () => {
        // Real-time listener handles this
    };

    /**
     * Clear all tickets (No-op for Firestore safety)
     */
    const clearAllTickets = async () => {
        console.warn("Clear all tickets disabled for Firestore");
    };

    const value = {
        tickets,
        loading,
        addTicket,
        updateTicket,
        deleteTicket,
        getUserTickets,
        getTicketById,
        getTicketByQR,
        refreshTickets,
        clearAllTickets,
    };

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    );
};

/**
 * Hook to use TicketContext
 * @returns {Object} TicketContext value
 * @throws {Error} If used outside TicketProvider
 */
export const useTickets = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useTickets must be used within a TicketProvider');
    }
    return context;
};
