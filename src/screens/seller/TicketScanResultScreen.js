import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getTicketByQR, calculateTicketPrice, TICKET_PRICING, getStatusColor } from '../../data/mockTicketData';

export default function TicketScanResultScreen({ route, navigation }) {
    const { seller, qrCode } = route.params;
    const ticket = getTicketByQR(qrCode);

    const [additionalKids, setAdditionalKids] = useState('0');
    const [additionalAdults, setAdditionalAdults] = useState('0');

    if (!ticket) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={80} color="tomato" />
                    <Text style={styles.errorTitle}>Ticket Not Found</Text>
                    <Text style={styles.errorText}>The scanned QR code is invalid</Text>
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

    const totalKids = ticket.kids + parseInt(additionalKids || '0');
    const totalAdults = ticket.adults + parseInt(additionalAdults || '0');
    const prepaidAmount = ticket.totalAmount;
    const additionalAmount = calculateTicketPrice(
        parseInt(additionalKids || '0'),
        parseInt(additionalAdults || '0')
    );
    const totalAmount = prepaidAmount + additionalAmount;

    const handleConfirmPayment = () => {
        Alert.alert(
            'Confirm Payment',
            `Total Amount: R${totalAmount}\n\nPrepaid: R${prepaidAmount}\nAdditional: R${additionalAmount}`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        navigation.navigate('PaymentConfirmation', {
                            seller,
                            ticket,
                            totalKids,
                            totalAdults,
                            totalAmount,
                        });
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
                    <Text style={styles.headerTitle}>Ticket Scanned</Text>
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

                {/* Ticket Status */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Ticket Status</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
                        <Text style={styles.statusText}>{ticket.status}</Text>
                    </View>
                    <Text style={styles.ticketId}>Ticket ID: {ticket.id}</Text>
                </View>

                {/* Prepaid Tickets */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Prepaid Tickets</Text>
                    <View style={styles.prepaidRow}>
                        <View style={styles.prepaidItem}>
                            <Ionicons name="person-outline" size={24} color="tomato" />
                            <Text style={styles.prepaidLabel}>Kids</Text>
                            <Text style={styles.prepaidValue}>{ticket.kids}</Text>
                        </View>
                        <View style={styles.prepaidItem}>
                            <Ionicons name="people-outline" size={24} color="tomato" />
                            <Text style={styles.prepaidLabel}>Adults</Text>
                            <Text style={styles.prepaidValue}>{ticket.adults}</Text>
                        </View>
                    </View>
                    <Text style={styles.prepaidAmount}>Prepaid: R{prepaidAmount}</Text>
                </View>

                {/* Additional Tickets Form */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Add Additional Tickets</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Additional Kids (R{TICKET_PRICING.KIDS} each)</Text>
                        <TextInput
                            style={styles.input}
                            value={additionalKids}
                            onChangeText={setAdditionalKids}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Additional Adults (R{TICKET_PRICING.ADULTS} each)</Text>
                        <TextInput
                            style={styles.input}
                            value={additionalAdults}
                            onChangeText={setAdditionalAdults}
                            keyboardType="numeric"
                            placeholder="0"
                        />
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
                        <Text style={styles.totalLabel}>Prepaid Amount:</Text>
                        <Text style={styles.totalValue}>R{prepaidAmount}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Additional Amount:</Text>
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
                    style={styles.confirmButton}
                    onPress={handleConfirmPayment}
                >
                    <Text style={styles.confirmButtonText}>Confirm Payment</Text>
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
