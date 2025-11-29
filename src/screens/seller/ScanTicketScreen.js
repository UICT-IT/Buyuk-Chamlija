import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScanTicketScreen({ route, navigation }) {
    const { seller } = route.params;
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [facing, setFacing] = useState('back');

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Ionicons name="camera-outline" size={64} color="#666" />
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        if (scanned) return;
        setScanned(true);
        // Navigate to result screen
        // Pass the actual seller info
        navigation.navigate('TicketScanResult', {
            seller: seller,
            qrCode: data
        });

        // Reset scanned state after a delay when returning
        setTimeout(() => setScanned(false), 2000);
    };

    // Fallback simulation for simulators or if camera fails
    const simulateScan = (type) => {
        const mockData = type === 'user'
            ? 'USER:user-123'
            : 'TKT:ticket-abc-123';

        handleBarCodeScanned({ type: 'qr', data: mockData });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Scan Ticket</Text>
                <TouchableOpacity onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}>
                    <Ionicons name="camera-reverse-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                />
                <View style={styles.overlay}>
                    <View style={styles.scanFrame} />
                    <Text style={styles.overlayText}>Align QR code within the frame</Text>
                </View>
            </View>

            {/* Simulation Buttons (Hidden in production, useful for dev) */}
            {/* Simulation Buttons (Hidden for production/real testing) */}
            {/* 
            <View style={styles.simulationContainer}>
                <Text style={styles.simulationTitle}>Dev Simulation:</Text>
                <View style={styles.simulationButtons}>
                    <TouchableOpacity
                        style={[styles.simButton, { backgroundColor: '#4CAF50' }]}
                        onPress={() => simulateScan('user')}
                    >
                        <Text style={styles.simButtonText}>Simulate User QR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.simButton, { backgroundColor: '#2196F3' }]}
                        onPress={() => simulateScan('ticket')}
                    >
                        <Text style={styles.simButtonText}>Simulate Ticket QR</Text>
                    </TouchableOpacity>
                </View>
            </View> 
            */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 16,
        color: '#333',
        marginTop: 20,
    },
    permissionButton: {
        backgroundColor: 'tomato',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        position: 'absolute',
        top: 40, // Adjust for status bar
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    cameraContainer: {
        flex: 1,
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
    overlayText: {
        color: 'white',
        marginTop: 20,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    simulationContainer: {
        padding: 20,
        backgroundColor: '#222',
    },
    simulationTitle: {
        color: '#aaa',
        marginBottom: 10,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    simulationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    simButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    simButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
