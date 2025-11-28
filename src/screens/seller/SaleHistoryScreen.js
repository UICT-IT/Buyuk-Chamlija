import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockSaleHistory } from '../../data/mockTicketData';

export default function SaleHistoryScreen({ route, navigation }) {
    const { seller } = route.params;

    // Filter sales by this seller
    const sellerSales = mockSaleHistory.filter(sale => sale.sellerId === seller.id);

    const renderSaleItem = ({ item }) => (
        <View style={styles.saleCard}>
            <View style={styles.saleHeader}>
                <View>
                    <Text style={styles.saleId}>{item.id}</Text>
                    <Text style={styles.saleDate}>
                        {new Date(item.saleDate).toLocaleString()}
                    </Text>
                </View>
                <Text style={styles.saleAmount}>R{item.totalAmount}</Text>
            </View>

            <View style={styles.saleBody}>
                <View style={styles.saleInfo}>
                    <Ionicons name="person-outline" size={18} color="#666" />
                    <Text style={styles.saleInfoText}>{item.customerName}</Text>
                </View>
                <View style={styles.saleInfo}>
                    <Ionicons name="ticket-outline" size={18} color="#666" />
                    <Text style={styles.saleInfoText}>{item.ticketId}</Text>
                </View>
                <View style={styles.saleInfo}>
                    <Ionicons name="people-outline" size={18} color="#666" />
                    <Text style={styles.saleInfoText}>
                        {item.kids} Kids, {item.adults} Adults
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sale History</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Stats Summary */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{sellerSales.length}</Text>
                    <Text style={styles.statLabel}>Total Sales</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        R{sellerSales.reduce((sum, sale) => sum + sale.totalAmount, 0)}
                    </Text>
                    <Text style={styles.statLabel}>Total Revenue</Text>
                </View>
            </View>

            {/* Sales List */}
            {sellerSales.length > 0 ? (
                <FlatList
                    data={sellerSales}
                    renderItem={renderSaleItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="receipt-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyTitle}>No Sales Yet</Text>
                    <Text style={styles.emptyText}>
                        Your completed sales will appear here
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 10,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'tomato',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 20,
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    saleCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    saleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    saleId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    saleDate: {
        fontSize: 13,
        color: '#999',
    },
    saleAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'tomato',
    },
    saleBody: {
        gap: 8,
    },
    saleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    saleInfoText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
});
