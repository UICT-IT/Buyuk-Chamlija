import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusColor } from '../../data/mockTicketData';

const { width } = Dimensions.get('window');
const TICKET_WIDTH = width - 40;

export default function TicketDetailScreen({ route, navigation }) {
    const { ticket } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Ticket</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Ticket Container */}
                <View style={styles.ticketContainer}>
                    {/* Ticket Header (Gradient) */}
                    <LinearGradient
                        colors={['#ff6347', '#ff4500']}
                        style={styles.ticketHeader}
                    >
                        <View style={styles.logoContainer}>
                            <Ionicons name="ticket-outline" size={32} color="white" />
                            <Text style={styles.eventName}>Buyuk Chamlija</Text>
                        </View>
                        <Text style={styles.ticketTitle}>FESTIVAL PASS</Text>

                        <View style={[styles.statusBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Text style={styles.statusText}>{ticket.status}</Text>
                        </View>
                    </LinearGradient>

                    {/* Ticket Body */}
                    <View style={styles.ticketBody}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>DATE</Text>
                                <Text style={styles.value}>{new Date(ticket.purchaseDate).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.columnRight}>
                                <Text style={styles.label}>TIME</Text>
                                <Text style={styles.value}>
                                    {new Date(ticket.purchaseDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>GUESTS</Text>
                                <Text style={styles.value}>{ticket.adults} Adults, {ticket.kids} Kids</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.label}>TOTAL PAID</Text>
                                <Text style={styles.valuePrice}>R{ticket.totalAmount}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Divider with Cutouts */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.circleLeft} />
                        <View style={styles.dashedLine} />
                        <View style={styles.circleRight} />
                    </View>

                    {/* Ticket Footer (QR) */}
                    <View style={styles.ticketFooter}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('QRCode', { ticket })}
                            activeOpacity={0.8}
                            style={styles.qrContainer}
                        >
                            <Ionicons name="qr-code" size={100} color="#333" />
                            <Text style={styles.tapText}>Tap to enlarge</Text>
                        </TouchableOpacity>

                        <Text style={styles.ticketIdLabel}>TICKET ID</Text>
                        <Text style={styles.ticketId}>{ticket.id}</Text>
                        <Text style={styles.qrRef}>{ticket.qrCode}</Text>
                    </View>
                </View>

                <Text style={styles.footerNote}>
                    Please show this ticket at the entrance.
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a', // Dark premium background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    ticketContainer: {
        width: TICKET_WIDTH,
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    ticketHeader: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    eventName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.9,
    },
    ticketTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 16,
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    statusText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    ticketBody: {
        padding: 24,
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    column: {
        flex: 1,
        alignItems: 'flex-start',
    },
    columnRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    valuePrice: {
        fontSize: 24,
        color: 'tomato',
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        backgroundColor: 'white',
        position: 'relative',
    },
    circleLeft: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1a1a1a', // Matches screen background
        position: 'absolute',
        left: -20,
    },
    circleRight: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1a1a1a', // Matches screen background
        position: 'absolute',
        right: -20,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        marginHorizontal: 30,
    },
    ticketFooter: {
        padding: 24,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    qrContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    tapText: {
        fontSize: 12,
        color: '#999',
        marginTop: 8,
    },
    ticketIdLabel: {
        fontSize: 10,
        color: '#ccc',
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 4,
    },
    ticketId: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    qrRef: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        fontFamily: 'monospace',
    },
    footerNote: {
        marginTop: 24,
        color: '#666',
        fontSize: 14,
        opacity: 0.6,
    },
});
