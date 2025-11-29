import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen({ route, navigation }) {
    const { ticket } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* QR Code Display */}
            <View style={styles.content}>
                <Text style={styles.title}>Show this QR Code</Text>
                <Text style={styles.subtitle}>to the seller at the entrance</Text>

                <View style={styles.qrContainer}>
                    <QRCode
                        value={ticket.qrCode}
                        size={250}
                        color="black"
                        backgroundColor="white"
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.ticketId}>{ticket.id}</Text>
                    <Text style={styles.qrReference}>{ticket.qrCode}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Ionicons name="people-outline" size={20} color="white" />
                        <Text style={styles.detailText}>
                            {ticket.kids} Kids, {ticket.adults} Adults
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="cash-outline" size={20} color="white" />
                        <Text style={styles.detailText}>R{ticket.totalAmount}</Text>
                    </View>
                </View>
            </View>

            {/* Footer Notice */}
            <View style={styles.footer}>
                <Ionicons name="shield-checkmark-outline" size={24} color="white" />
                <Text style={styles.footerText}>
                    This QR code is unique to your ticket
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato',
    },
    header: {
        padding: 20,
        alignItems: 'flex-end',
    },
    backButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 40,
    },
    qrContainer: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    ticketId: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    qrReference: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    detailsContainer: {
        flexDirection: 'row',
        gap: 30,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 12,
    },
    footerText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
});
