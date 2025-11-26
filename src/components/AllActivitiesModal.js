import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activities } from '../data/mockData';
import ActivityDetailModal from './ActivityDetailModal';

export default function AllActivitiesModal({ visible, onClose }) {
    const [selectedActivity, setSelectedActivity] = useState(null);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>All Activities</Text>
                    <View style={{ width: 28 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {activities.map((activity) => (
                        <TouchableOpacity
                            key={activity.id}
                            style={styles.activityCard}
                            onPress={() => setSelectedActivity(activity)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.activityIconContainer}>
                                <Ionicons name="calendar" size={20} color="tomato" />
                            </View>
                            <View style={styles.activityInfo}>
                                <Text style={styles.activityName}>{activity.name}</Text>
                                <View style={styles.activityDetails}>
                                    <View style={styles.activityDetailItem}>
                                        <Ionicons name="time-outline" size={14} color="#666" />
                                        <Text style={styles.activityDetailText}>{activity.startTime}</Text>
                                    </View>
                                    <View style={styles.activityDetailItem}>
                                        <Ionicons name="location-outline" size={14} color="#666" />
                                        <Text style={styles.activityDetailText}>{activity.location}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.activityCategoryBadge}>
                                <Text style={styles.activityCategoryText}>{activity.category}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <ActivityDetailModal
                    visible={!!selectedActivity}
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                />
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    closeButton: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        padding: 20,
    },
    activityCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    activityIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityInfo: {
        flex: 1,
        marginRight: 8,
    },
    activityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    activityDetails: {
        flexDirection: 'column',
        gap: 4,
    },
    activityDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    activityDetailText: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },
    activityCategoryBadge: {
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    activityCategoryText: {
        fontSize: 12,
        color: 'tomato',
        fontWeight: '600',
    },
});
