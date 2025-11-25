import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventPricing({ adultFee, childFee, onMapPress }) {
    return (
        <>
            {/* Entrance Fee Row */}
            <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                    <Ionicons name="ticket-outline" size={20} color="tomato" />
                </View>
                <View>
                    <Text style={styles.infoText}>Entrance Fee</Text>
                    <Text style={styles.subInfoText}>
                        Adults: {adultFee} • Kids: {childFee}
                    </Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.primaryButton} onPress={onMapPress}>
                    <Ionicons name="map-outline" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text style={styles.primaryButtonText}>View on Map</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    subInfoText: {
        color: '#666',
        fontSize: 14,
        marginTop: 2,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
        marginTop: 10,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: 'tomato',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
