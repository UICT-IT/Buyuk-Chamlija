import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ScanTicketScreen({ route, navigation }) {
    const { seller } = route.params;

    const handleSimulateScan = () => {
        // Simulate scanning a QR code - navigate to result screen with mock ticket
        const mockQRCode = 'QR-TKT-001'; // Simulating scan of first ticket
        navigation.navigate('TicketScanResult', { seller, qrCode: mockQRCode });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan Ticket</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Camera Placeholder */}
            <View style={styles.cameraPlaceholder}>
                <View style={styles.scanFrame}>
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />

                    <Ionicons name="qr-code-outline" size={120} color="rgba(255,255,255,0.5)" />
                </View>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>Position QR Code in Frame</Text>
                <Text style={styles.instructionsText}>
                    Align the customer's QR code within the frame to scan
                </Text>
            </View>

            {/* Simulate Scan Button (for testing) */}
            <TouchableOpacity style={styles.simulateButton} onPress={handleSimulateScan}>
                <Ionicons name="flash-outline" size={24} color="white" />
                <Text style={styles.simulateButtonText}>Tap to Simulate Scan</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    cameraPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    scanFrame: {
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: 'tomato',
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
    },
    instructionsContainer: {
        padding: 30,
        alignItems: 'center',
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    instructionsText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
    },
    simulateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
        marginHorizontal: 20,
        marginBottom: 30,
        padding: 18,
        borderRadius: 12,
        gap: 12,
    },
    simulateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
