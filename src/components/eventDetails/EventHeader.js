import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventHeader({ event, onBack, onShare, onLocationPress }) {
    return (
        <>
            {/* Header Image Section */}
            <View style={styles.imageContainer}>
                {event.image ? (
                    <Image source={event.image} style={styles.eventImage} resizeMode="cover" />
                ) : (
                    <View style={[styles.eventImage, { backgroundColor: event.isActive ? '#FF6347' : '#6B4FA0' }]}>
                        <Ionicons name="image-outline" size={64} color="rgba(255,255,255,0.5)" />
                    </View>
                )}

                {/* Header Buttons */}
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.iconButton} onPress={onBack}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={onShare}>
                        <Ionicons name="share-social-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{event.name}</Text>

            {/* Date Info Row */}
            <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                    <Ionicons name="calendar-outline" size={20} color="tomato" />
                </View>
                <Text style={styles.infoText}>{event.dateTime}</Text>
            </View>

            {/* Location Info Row */}
            <TouchableOpacity style={styles.infoRow} onPress={onLocationPress}>
                <View style={styles.iconContainer}>
                    <Ionicons name="location-outline" size={20} color="tomato" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.infoText}>{event.location}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 250,
        width: '100%',
        position: 'relative',
        marginBottom: 20,
    },
    eventImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtons: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 20,
    },
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
});
