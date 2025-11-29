import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TICKET_PRICING, calculateTicketPrice, addTicket, TICKET_STATUS } from '../../data/mockTicketData';
import { useAuth } from '../../context/AuthContext';

export default function ReserveTicketScreen({ navigation }) {
    const { user } = useAuth();
    const [kids, setKids] = useState('0');
    const [adults, setAdults] = useState('0');

    const totalAmount = calculateTicketPrice(
        parseInt(kids || '0'),
        parseInt(adults || '0')
    );

    const handleReserve = () => {
        if (totalAmount === 0) {
            Alert.alert('Invalid Selection', 'Please select at least one ticket.');
            return;
        }

        const newTicket = {
            id: `TKT-${Date.now()}`, // Simple mock ID generation
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            qrCode: `QR-${Date.now()}`,
            status: TICKET_STATUS.RESERVED,
            kids: parseInt(kids || '0'),
            adults: parseInt(adults || '0'),
            totalAmount: totalAmount,
            purchaseDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Expires in 7 days
        };

        addTicket(newTicket);

        Alert.alert(
            'Reservation Successful',
            'Your ticket has been reserved. Please show the QR code at the gate to pay.',
            [
                {
                    text: 'View Ticket',
                    onPress: () => navigation.replace('TicketDetail', { ticket: newTicket }),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reserve Ticket</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Select Tickets</Text>
                    <Text style={styles.cardSubtitle}>
                        Reserve your tickets now and pay at the gate.
                    </Text>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Kids</Text>
                            <Text style={styles.priceLabel}>R{TICKET_PRICING.KIDS} each</Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setKids(Math.max(0, parseInt(kids || '0') - 1).toString())}
                            >
                                <Ionicons name="remove" size={24} color="#333" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                value={kids}
                                onChangeText={setKids}
                                keyboardType="numeric"
                                textAlign="center"
                            />
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setKids((parseInt(kids || '0') + 1).toString())}
                            >
                                <Ionicons name="add" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>Adults</Text>
                            <Text style={styles.priceLabel}>R{TICKET_PRICING.ADULTS} each</Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setAdults(Math.max(0, parseInt(adults || '0') - 1).toString())}
                            >
                                <Ionicons name="remove" size={24} color="#333" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                value={adults}
                                onChangeText={setAdults}
                                keyboardType="numeric"
                                textAlign="center"
                            />
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setAdults((parseInt(adults || '0') + 1).toString())}
                            >
                                <Ionicons name="add" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.totalCard}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>R{totalAmount}</Text>
                    </View>
                    <Text style={styles.noteText}>
                        * Payment will be collected at the festival entrance.
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.reserveButton, totalAmount === 0 && styles.reserveButtonDisabled]}
                    onPress={handleReserve}
                    disabled={totalAmount === 0}
                >
                    <Text style={styles.reserveButtonText}>Reserve Ticket</Text>
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
    scrollContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
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
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 10,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    counterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        width: 60,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 16,
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
        alignItems: 'center',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'tomato',
    },
    noteText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    reserveButton: {
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
    reserveButtonDisabled: {
        backgroundColor: '#ccc',
        shadowOpacity: 0,
    },
    reserveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
