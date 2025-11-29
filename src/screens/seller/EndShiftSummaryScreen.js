import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function EndShiftSummaryScreen({ route, navigation }) {
    const { shiftData, onCloseShift } = route.params;
    const [cashInDrawer, setCashInDrawer] = useState('');

    const expectedCash = shiftData.totalCash + (shiftData.startingCash || 0);
    const actualCash = parseFloat(cashInDrawer || '0');
    const discrepancy = actualCash - expectedCash;

    const handleCloseShift = () => {
        if (!cashInDrawer) {
            Alert.alert('Input Required', 'Please enter the total cash in your drawer.');
            return;
        }

        Alert.alert(
            'Confirm End Shift',
            `Expected Cash: R${expectedCash}\nActual Cash: R${actualCash}\nDiscrepancy: R${discrepancy}\n\nAre you sure you want to close this shift?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Close Shift',
                    style: 'destructive',
                    onPress: () => {
                        onCloseShift({
                            ...shiftData,
                            actualCash,
                            discrepancy,
                            endTime: new Date().toISOString(),
                        });
                        navigation.navigate('SellerDashboard');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>End Shift Summary</Text>
                </View>

                {/* Sales Summary */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Shift Sales</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Starting Cash</Text>
                        <Text style={styles.value}>R{shiftData.startingCash || 0}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Cash Sales</Text>
                        <Text style={styles.value}>R{shiftData.totalCash}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Card Sales</Text>
                        <Text style={styles.value}>R{shiftData.totalCard}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Total Expected Cash</Text>
                        <Text style={styles.totalValue}>R{expectedCash}</Text>
                    </View>
                </View>

                {/* Cash Reconciliation */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Cash Reconciliation</Text>
                    <Text style={styles.subtitle}>Count the cash in your drawer and enter the total below.</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.currencySymbol}>R</Text>
                        <TextInput
                            style={styles.input}
                            value={cashInDrawer}
                            onChangeText={setCashInDrawer}
                            keyboardType="numeric"
                            placeholder="0.00"
                        />
                    </View>

                    {cashInDrawer !== '' && (
                        <View style={[
                            styles.discrepancyContainer,
                            discrepancy === 0 ? styles.match : styles.mismatch
                        ]}>
                            <Text style={styles.discrepancyLabel}>Discrepancy:</Text>
                            <Text style={styles.discrepancyValue}>
                                {discrepancy > 0 ? '+' : ''}R{discrepancy.toFixed(2)}
                            </Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleCloseShift}
                >
                    <Text style={styles.closeButtonText}>Close Shift</Text>
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
        marginBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'tomato',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fcfcfc',
    },
    currencySymbol: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        paddingVertical: 12,
    },
    discrepancyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
    },
    match: {
        backgroundColor: '#e8f5e9',
    },
    mismatch: {
        backgroundColor: '#ffebee',
    },
    discrepancyLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    discrepancyValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        backgroundColor: 'tomato',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: 'tomato',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
