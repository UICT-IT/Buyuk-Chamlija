import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventDescription({ description }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Event</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    description: {
        color: '#666',
        lineHeight: 24,
        fontSize: 15,
    },
});
