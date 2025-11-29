import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentConfirmationScreen({ route, navigation }) {
    const { seller, ticket, totalKids, totalAdults, totalAmount } = route.params;

    const handleDone = () => {
        // Navigate back to dashboard
        navigation.navigate('SellerDashboard', { seller });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.successIcon}>
                    <Ionicons name="checkmark-circle" size={120} color="#4CAF50" />
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Payment Successful!</Text>
                <Text style={styles.subtitle}>The transaction has been completed</Text>

                {/* Transaction Details */}
                <View style={styles.detailsCard}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Ticket ID</Text>
                        <Text style={styles.detailValue}>{ticket.id}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Customer</Text>
                        <Text style={styles.detailValue}>{ticket.userName}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Kids</Text>
                        <Text style={styles.detailValue}>{totalKids}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Adults</Text>
                        <Text style={styles.detailValue}>{totalAdults}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>R{totalAmount}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Payment Method</Text>
                        <Text style={styles.detailValue}>{route.params.paymentMethod}</Text>
                    </View>
                </View>

                {/* Timestamp */}
                <Text style={styles.timestamp}>
                    {new Date().toLocaleString()}
                </Text>

                {/* Action Buttons */}
                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.scanAnotherButton}
                    onPress={() => navigation.navigate('ScanTicket', { seller })}
                >
                    <Ionicons name="qr-code-outline" size={20} color="tomato" />
                    <Text style={styles.scanAnotherButtonText}>Scan Another Ticket</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIcon: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    detailLabel: {
        fontSize: 16,
        color: '#666',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    timestamp: {
        fontSize: 14,
        color: '#999',
        marginBottom: 30,
    },
    doneButton: {
        backgroundColor: 'tomato',
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: 'tomato',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    doneButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scanAnotherButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 8,
    },
    scanAnotherButtonText: {
        color: 'tomato',
        fontSize: 16,
        fontWeight: '600',
    },
});
