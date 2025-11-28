import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getStatusColor } from '../../data/mockTicketData';

export default function TicketDetailScreen({ route, navigation }) {
    const { ticket } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Ticket Details</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* QR Code Section */}
                <TouchableOpacity
                    style={styles.qrSection}
                    onPress={() => navigation.navigate('QRCode', { ticket })}
                    activeOpacity={0.8}
                >
                    <View style={styles.qrPlaceholder}>
                        <Ionicons name="qr-code-outline" size={120} color="#666" />
                        <Text style={styles.qrText}>Tap to view QR code</Text>
                    </View>
                </TouchableOpacity>

                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
                    <Text style={styles.statusText}>{ticket.status}</Text>
                </View>

                {/* Ticket Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Ticket ID</Text>
                        <Text style={styles.infoValue}>{ticket.id}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>QR Reference</Text>
                        <Text style={styles.infoValue}>{ticket.qrCode}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Kids</Text>
                        <Text style={styles.infoValue}>{ticket.kids}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Adults</Text>
                        <Text style={styles.infoValue}>{ticket.adults}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Purchase Date</Text>
                        <Text style={styles.infoValue}>
                            {new Date(ticket.purchaseDate).toLocaleDateString()}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Expiry Date</Text>
                        <Text style={styles.infoValue}>
                            {new Date(ticket.expiryDate).toLocaleDateString()}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>R{ticket.totalAmount}</Text>
                    </View>
                </View>

                {/* Info Notice */}
                <View style={styles.notice}>
                    <Ionicons name="information-circle-outline" size={20} color="#2196F3" />
                    <Text style={styles.noticeText}>
                        Show this QR code to the seller at the festival entrance
                    </Text>
                </View>
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
    qrSection: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    qrPlaceholder: {
        alignItems: 'center',
    },
    qrText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    statusBadge: {
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 20,
    },
    statusText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoCard: {
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
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
    },
    infoValue: {
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
        color: 'tomato',
    },
    notice: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FD',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    noticeText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: '#1976D2',
        lineHeight: 20,
    },
});
