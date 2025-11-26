import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockTickets, getStatusColor } from '../../data/mockTicketData';

export default function MyTicketsScreen({ navigation }) {
    const renderTicketCard = ({ item }) => (
        <TouchableOpacity
            style={styles.ticketCard}
            onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
            activeOpacity={0.7}
        >
            <View style={styles.ticketHeader}>
                <View>
                    <Text style={styles.ticketId}>{item.id}</Text>
                    <Text style={styles.purchaseDate}>
                        Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.ticketBody}>
                <View style={styles.ticketInfo}>
                    <Ionicons name="people-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>
                        {item.kids} Kids, {item.adults} Adults
                    </Text>
                </View>
                <View style={styles.ticketInfo}>
                    <Ionicons name="calendar-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <View style={styles.ticketFooter}>
                <Text style={styles.totalAmount}>R{item.totalAmount}</Text>
                <Ionicons name="chevron-forward" size={20} color="tomato" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Tickets</Text>
                <Text style={styles.headerSubtitle}>View and manage your festival tickets</Text>
            </View>

            {mockTickets.length > 0 ? (
                <FlatList
                    data={mockTickets}
                    renderItem={renderTicketCard}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Ionicons name="ticket-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyTitle}>No Tickets Yet</Text>
                    <Text style={styles.emptyText}>
                        Your purchased tickets will appear here
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
        padding: 20,
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    listContent: {
        padding: 20,
        paddingTop: 10,
    },
    ticketCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    ticketId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    purchaseDate: {
        fontSize: 14,
        color: '#999',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    ticketBody: {
        marginBottom: 12,
    },
    ticketInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        marginLeft: 8,
    },
    ticketFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'tomato',
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
