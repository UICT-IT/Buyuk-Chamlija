import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { normalizeFestival } from '../utils/normalizeFestival';
import EventDetailModal from '../components/EventDetailModal';

export default function FestivalScreen({ festivals, navigation }) {
    const [selectedFestival, setSelectedFestival] = useState(null);

    // Normalize all festivals to ensure safe data structure
    const normalizedFestivals = festivals.map(normalizeFestival);

    // Filter by isActive flag instead of dates
    const currentFestivals = normalizedFestivals.filter(f => f.isActive === true);
    const upcomingFestivals = normalizedFestivals.filter(f => f.isActive === false);

    const renderFestivalCard = ({ item, isLive }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedFestival(item)}
            activeOpacity={0.9}
        >
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardOverlay}>
                <View style={styles.cardHeader}>
                    {isLive && (
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>LIVE</Text>
                        </View>
                    )}
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDate}>{item.dateTime}</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={16} color="white" />
                        <Text style={styles.cardLocation}>{item.location}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Festivals</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {currentFestivals.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Happening Now</Text>
                            <View style={styles.pulsingDot} />
                        </View>
                        <FlatList
                            data={currentFestivals}
                            renderItem={({ item }) => renderFestivalCard({ item, isLive: true })}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                {upcomingFestivals.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Upcoming Festivals</Text>
                        <FlatList
                            data={upcomingFestivals}
                            renderItem={({ item }) => renderFestivalCard({ item, isLive: false })}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                {currentFestivals.length === 0 && upcomingFestivals.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyStateText}>No festivals found</Text>
                    </View>
                )}
            </ScrollView>

            <EventDetailModal
                visible={!!selectedFestival}
                event={selectedFestival}
                onClose={() => setSelectedFestival(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginRight: 8,
    },
    pulsingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'tomato',
    },
    card: {
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    liveBadge: {
        backgroundColor: 'tomato',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        marginRight: 6,
    },
    liveText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardContent: {

    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    cardDate: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 8,
        fontWeight: '500',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardLocation: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginLeft: 4,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    emptyStateText: {
        marginTop: 16,
        fontSize: 16,
        color: '#999',
    },
});
