import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import EventDetailModal from '../components/EventDetailModal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ festivals }) {
    const [selectedFestival, setSelectedFestival] = useState(null);

    const activeFestival = festivals.find(f => f.isActive);
    const upcomingFestivals = festivals.filter(f => !f.isActive);

    const renderFestivalItem = ({ item }) => (
        <TouchableOpacity style={styles.upcomingCard} onPress={() => setSelectedFestival(item)}>
            <Text style={styles.upcomingTitle}>{item.name}</Text>

            <View style={styles.upcomingInfoRow}>
                <Text style={styles.upcomingIcon}>📅</Text>
                <Text style={styles.upcomingInfoText}>{item.dateTime}</Text>
            </View>

            <View style={styles.upcomingInfoRow}>
                <Text style={styles.upcomingIcon}>📍</Text>
                <Text style={styles.upcomingInfoText}>{item.venue}</Text>
            </View>

            <View style={styles.upcomingInfoRow}>
                <Text style={styles.upcomingIcon}>👥</Text>
                <Text style={styles.upcomingInfoText}>
                    {item.currentAttendance}/{item.maxAttendance} attending
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {activeFestival && (
                    <View style={styles.currentEventSection}>
                        <Text style={styles.currentEventHeader}>Current Event</Text>
                        <View style={styles.eventCard}>
                            <Text style={styles.eventTitle}>{activeFestival.name}</Text>

                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventIcon}>📅</Text>
                                <Text style={styles.eventInfoText}>{activeFestival.dateTime}</Text>
                            </View>

                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventIcon}>📍</Text>
                                <Text style={styles.eventInfoText}>{activeFestival.venue}</Text>
                            </View>

                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventIcon}>👥</Text>
                                <Text style={styles.eventInfoText}>
                                    {activeFestival.currentAttendance}/{activeFestival.maxAttendance} attending
                                </Text>
                            </View>

                            <Text style={styles.eventDescription}>{activeFestival.description}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.viewDetailsButton}
                                    onPress={() => setSelectedFestival(activeFestival)}
                                >
                                    <Text style={styles.viewDetailsButtonText}>View Details</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.leaveReviewButton}>
                                    <Text style={styles.leaveReviewButtonText}>Leave Review</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                <Text style={styles.sectionHeader}>Upcoming Festivals</Text>
                <FlatList
                    data={upcomingFestivals}
                    renderItem={renderFestivalItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />

                <EventDetailModal
                    visible={!!selectedFestival}
                    event={selectedFestival}
                    onClose={() => setSelectedFestival(null)}
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    currentEventSection: {
        marginBottom: 20,
    },
    currentEventHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    eventCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    eventInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    eventIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    eventInfoText: {
        fontSize: 14,
        color: '#666',
    },
    eventDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        marginBottom: 20,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    viewDetailsButton: {
        flex: 1,
        backgroundColor: 'tomato',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewDetailsButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    leaveReviewButton: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    leaveReviewButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    upcomingCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    upcomingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    upcomingInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    upcomingIcon: {
        fontSize: 14,
        marginRight: 8,
    },
    upcomingInfoText: {
        fontSize: 13,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

