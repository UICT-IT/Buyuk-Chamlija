import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockSaleHistory, TICKET_PRICING } from '../../data/mockTicketData';

export default function SellerDashboardScreen({ route, navigation }) {
    const { seller } = route.params;

    // Calculate today's stats
    const today = new Date().toLocaleDateString();
    const todaySales = mockSaleHistory.filter(sale =>
        new Date(sale.saleDate).toLocaleDateString() === today
    );
    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const todayTickets = todaySales.length;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.sellerName}>{seller.name}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => navigation.navigate('SellerLogin')}
                    >
                        <Ionicons name="log-out-outline" size={24} color="tomato" />
                    </TouchableOpacity>
                </View>

                {/* Main Action Button */}
                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => navigation.navigate('ScanTicket', { seller })}
                    activeOpacity={0.8}
                >
                    <Ionicons name="qr-code-outline" size={60} color="white" />
                    <Text style={styles.scanButtonText}>Scan Ticket</Text>
                    <Text style={styles.scanButtonSubtext}>Tap to start scanning</Text>
                </TouchableOpacity>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="calendar-outline" size={32} color="tomato" />
                        <Text style={styles.statValue}>{todayTickets}</Text>
                        <Text style={styles.statLabel}>Today's Sales</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Ionicons name="cash-outline" size={32} color="tomato" />
                        <Text style={styles.statValue}>R{todayRevenue}</Text>
                        <Text style={styles.statLabel}>Today's Revenue</Text>
                    </View>
                </View>

                {/* Quick Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Ticket Pricing</Text>
                    <View style={styles.pricingRow}>
                        <View style={styles.pricingItem}>
                            <Ionicons name="person-outline" size={20} color="#666" />
                            <Text style={styles.pricingText}>Kids: R{TICKET_PRICING.KIDS}</Text>
                        </View>
                        <View style={styles.pricingItem}>
                            <Ionicons name="people-outline" size={20} color="#666" />
                            <Text style={styles.pricingText}>Adults: R{TICKET_PRICING.ADULTS}</Text>
                        </View>
                    </View>
                </View>

                {/* Sale History Button */}
                <TouchableOpacity
                    style={styles.historyButton}
                    onPress={() => navigation.navigate('SaleHistory', { seller })}
                >
                    <Ionicons name="list-outline" size={24} color="tomato" />
                    <Text style={styles.historyButtonText}>View Sale History</Text>
                    <Ionicons name="chevron-forward" size={20} color="tomato" />
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
        marginBottom: 30,
    },
    greeting: {
        fontSize: 16,
        color: '#666',
    },
    sellerName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        padding: 8,
    },
    scanButton: {
        backgroundColor: 'tomato',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: 'tomato',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    scanButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16,
    },
    scanButtonSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 12,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
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
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    pricingRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pricingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pricingText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    historyButtonText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 12,
    },
});
