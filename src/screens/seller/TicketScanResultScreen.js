import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { calculateTicketPrice, TICKET_PRICING, getStatusColor, TICKET_STATUS } from '../../data/mockTicketData';
import { generateTicketQR, parseUserQR, isUserQR as checkIsUserQR } from '../../utils/qrHelpers';
import { useTickets } from '../../context/TicketContext';
import { isTicketExpired } from '../../utils/ticketHelpers';

import { useAuth } from '../../context/AuthContext';

export default function TicketScanResultScreen({ route, navigation }) {
    const { seller, qrCode } = route.params;
    const { tickets, addTicket, updateTicket } = useTickets();
    const { getUserById } = useAuth();

    // Check if it's a User QR or Ticket QR
    const isUserQR = checkIsUserQR(qrCode);

    const [ticket, setTicket] = useState(null);
    const [user, setUser] = useState(null);
    const [additionalKids, setAdditionalKids] = useState('0');
    const [additionalAdults, setAdditionalAdults] = useState('0');
    const [paymentMethod, setPaymentMethod] = useState(null); // 'CASH' or 'CARD'
    const [loading, setLoading] = useState(true);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const hasProcessedScan = React.useRef(false);

    useEffect(() => {
        const processScan = async () => {
            if (hasProcessedScan.current) return;

            if (isUserQR) {
                // Handle User QR Scan - New Sale or Update Existing
                const userDetails = parseUserQR(qrCode);

                // Try to find user locally first (for consistency), otherwise use QR details
                let foundUser = await getUserById(userDetails.id);

                if (!foundUser && userDetails.name) {
                    // If user not found locally but QR has details, use them!
                    // This enables cross-device scanning without backend
                    foundUser = {
                        id: userDetails.id,
                        name: userDetails.name,
                        email: userDetails.email,
                        phone: '', // Phone not in QR, leave empty
                    };
                }

                setUser(foundUser);

                if (foundUser) {
                    // CHECK FOR EXISTING ACTIVE TICKET
                    // Enforce One Ticket Per User Rule
                    const existingTicket = tickets.find(
                        t => t.userId === foundUser.id && !isTicketExpired(t.purchaseDate) && t.status === TICKET_STATUS.ACTIVE
                    );

                    if (existingTicket) {
                        // User already has active ticket - UPDATE MODE
                        setTicket(existingTicket);
                        setIsUpdateMode(true);
                        Alert.alert(
                            'Existing Ticket Found',
                            'This user already has an active ticket. You can add more people to it.',
                            [{ text: 'OK' }]
                        );
                    } else {
                        // No active ticket - CREATE MODE
                        setTicket({
                            id: 'NEW-SALE',
                            userId: foundUser.id,
                            userName: foundUser.name,
                            userEmail: foundUser.email,
                            userPhone: foundUser.phone || '',
                            status: 'New Sale',
                            kids: 0,
                            adults: 0,
                            totalAmount: 0,
                        });
                        setIsUpdateMode(false);
                    }
                    hasProcessedScan.current = true;
                }
            } else {
                // Handle Ticket QR Scan - Existing Ticket
                const foundTicket = tickets.find(t => t.qrCode === qrCode);

                if (foundTicket) {
                    const ticketWithPhone = {
                        ...foundTicket,
                        userPhone: foundTicket.userPhone || '+27 82 123 4567' // Mock if missing
                    };
                    setTicket(ticketWithPhone);
                    setIsUpdateMode(true); // Scanning existing ticket implies update/check
                    hasProcessedScan.current = true;
                } else {
                    setTicket(null);
                }
            }
            setLoading(false);
        };

        processScan();
    }, [qrCode, isUserQR, tickets]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="tomato" />
                    <Text style={styles.loadingText}>Processing Scan...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!ticket) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={80} color="tomato" />
                    <Text style={styles.errorTitle}>Invalid QR Code</Text>
                    <Text style={styles.errorText}>
                        {isUserQR ? 'User not found' : 'Ticket not found'}
                    </Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const totalKids = (ticket.kids || 0) + parseInt(additionalKids || '0');
    const totalAdults = (ticket.adults || 0) + parseInt(additionalAdults || '0');
    const prepaidAmount = ticket.totalAmount || 0;
    const additionalAmount = calculateTicketPrice(
        parseInt(additionalKids || '0'),
        parseInt(additionalAdults || '0')
    );
    const totalAmount = prepaidAmount + additionalAmount;

    const handleConfirmPayment = () => {
        if (additionalAmount === 0 && !isUpdateMode) {
            Alert.alert('Error', 'Total amount cannot be zero. Please add tickets.');
            return;
        }

        if (additionalAmount > 0 && !paymentMethod) {
            Alert.alert('Payment Method Required', 'Please select Cash or Card.');
            return;
        }

        Alert.alert(
            'Confirm Payment',
            `Total Amount: R${totalAmount}\n\nAdditional: R${additionalAmount}\nMethod: ${paymentMethod || 'N/A'}`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            setLoading(true);

                            const targetUserId = ticket.userId || user?.id;
                            if (!targetUserId) {
                                setLoading(false);
                                Alert.alert('Error', 'Cannot process ticket: User ID is missing. Please rescan the QR code.');
                                return;
                            }

                            if (isUpdateMode && ticket.id !== 'NEW-SALE') {
                                // Update existing ticket
                                await updateTicket(ticket.id, {
                                    kids: totalKids,
                                    adults: totalAdults,
                                    totalAmount: totalAmount,
                                    // Don't change status or dates for updates
                                });
                            } else {
                                // Create NEW ticket
                                const newTicket = {
                                    id: `TKT-${Date.now()}`,
                                    userId: targetUserId,
                                    userName: ticket.userName || user?.name || 'Unknown',
                                    userEmail: ticket.userEmail || user?.email || 'Unknown',
                                    userPhone: ticket.userPhone || '',
                                    qrCode: generateTicketQR(), // Secure UUID QR
                                    status: TICKET_STATUS.ACTIVE,
                                    kids: totalKids,
                                    adults: totalAdults,
                                    totalAmount: totalAmount,
                                    purchaseDate: new Date().toISOString(),
                                    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
                                    paymentMethod: paymentMethod,
                                    sellerId: seller.id,
                                    sellerName: seller.name
                                };
                                await addTicket(newTicket);
                            }

                            setLoading(false);

                            navigation.navigate('PaymentConfirmation', {
                                seller,
                                ticket: {
                                    ...ticket,
                                    kids: totalKids,
                                    adults: totalAdults,
                                    totalAmount: totalAmount,
                                    status: TICKET_STATUS.ACTIVE
                                },
                                totalKids,
                                totalAdults,
                                totalAmount,
                                paymentMethod,
                            });
                        } catch (error) {
                            setLoading(false);
                            console.error("Ticket Processing Error:", error);
                            Alert.alert('Error', `Failed to process ticket: ${error.message}`);
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {isUpdateMode ? 'Update Ticket' : 'New Sale'}
                    </Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Customer Info */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Customer Information</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={20} color="#666" />
                        <Text style={styles.infoText}>{ticket.userName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={20} color="#666" />
                        <Text style={styles.infoText}>{ticket.userEmail}</Text>
                    </View>
                </View>

                {/* Ticket Status (Only for existing tickets) */}
                {isUpdateMode && ticket.id !== 'NEW-SALE' && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Current Ticket Status</Text>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
                            <Text style={styles.statusText}>{ticket.status}</Text>
                        </View>
                        <Text style={styles.ticketId}>Ticket ID: {ticket.id}</Text>
                        <View style={styles.prepaidRow}>
                            <View style={styles.prepaidItem}>
                                <Text style={styles.prepaidValue}>{ticket.kids}</Text>
                                <Text style={styles.prepaidLabel}>Current Kids</Text>
                            </View>
                            <View style={styles.prepaidItem}>
                                <Text style={styles.prepaidValue}>{ticket.adults}</Text>
                                <Text style={styles.prepaidLabel}>Current Adults</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Add Tickets Form */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        {isUpdateMode ? 'Add More People' : 'Select Tickets'}
                    </Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            {isUpdateMode ? 'Additional Kids' : 'Kids'} (R{TICKET_PRICING.KIDS} each)
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={additionalKids}
                            onChangeText={setAdditionalKids}
                            keyboardType="numeric"
                            placeholder="0"
                            maxLength={2}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            {isUpdateMode ? 'Additional Adults' : 'Adults'} (R{TICKET_PRICING.ADULTS} each)
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={additionalAdults}
                            onChangeText={setAdditionalAdults}
                            keyboardType="numeric"
                            placeholder="0"
                            maxLength={2}
                        />
                    </View>
                </View>

                {/* Payment Method Selection */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Payment Method</Text>
                    <View style={styles.paymentMethods}>
                        <TouchableOpacity
                            style={[
                                styles.paymentOption,
                                paymentMethod === 'CASH' && styles.paymentOptionSelected
                            ]}
                            onPress={() => setPaymentMethod('CASH')}
                        >
                            <Ionicons
                                name="cash-outline"
                                size={24}
                                color={paymentMethod === 'CASH' ? 'tomato' : '#666'}
                            />
                            <Text style={[
                                styles.paymentOptionText,
                                paymentMethod === 'CASH' && styles.paymentOptionTextSelected
                            ]}>Cash</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.paymentOption,
                                paymentMethod === 'CARD' && styles.paymentOptionSelected
                            ]}
                            onPress={() => setPaymentMethod('CARD')}
                        >
                            <Ionicons
                                name="card-outline"
                                size={24}
                                color={paymentMethod === 'CARD' ? 'tomato' : '#666'}
                            />
                            <Text style={[
                                styles.paymentOptionText,
                                paymentMethod === 'CARD' && styles.paymentOptionTextSelected
                            ]}>Card</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Total Calculation */}
                <View style={styles.totalCard}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Kids:</Text>
                        <Text style={styles.totalValue}>{totalKids}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Adults:</Text>
                        <Text style={styles.totalValue}>{totalAdults}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>
                            {isUpdateMode ? 'Additional Amount:' : 'Amount:'}
                        </Text>
                        <Text style={styles.totalValue}>R{additionalAmount}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.grandTotalLabel}>TOTAL AMOUNT:</Text>
                        <Text style={styles.grandTotalValue}>R{totalAmount}</Text>
                    </View>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                    style={[styles.confirmButton, (additionalAmount > 0 && !paymentMethod) && styles.confirmButtonDisabled]}
                    onPress={handleConfirmPayment}
                    disabled={additionalAmount > 0 && !paymentMethod}
                >
                    <Text style={styles.confirmButtonText}>
                        {isUpdateMode ? 'Update Ticket & Pay' : 'Create Ticket & Pay'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerBackButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 12,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 12,
    },
    statusText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    ticketId: {
        fontSize: 14,
        color: '#999',
    },
    prepaidRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    prepaidItem: {
        alignItems: 'center',
    },
    prepaidLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    prepaidValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
    },
    prepaidAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: 'tomato',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fcfcfc',
    },
    paymentMethods: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: '#eee',
        borderRadius: 12,
        marginHorizontal: 6,
    },
    paymentOptionSelected: {
        borderColor: 'tomato',
        backgroundColor: '#fff5f5',
    },
    paymentOptionText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    paymentOptionTextSelected: {
        color: 'tomato',
    },
    totalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 12,
    },
    grandTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    grandTotalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'tomato',
    },
    confirmButton: {
        backgroundColor: 'tomato',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: 'tomato',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    confirmButtonDisabled: {
        backgroundColor: '#ccc',
        shadowOpacity: 0,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 8,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    backButton: {
        backgroundColor: 'tomato',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
