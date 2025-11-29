import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { normalizeFestival } from '../utils/normalizeFestival';
import EventDetailModal from '../components/EventDetailModal';
import { theme } from '../theme';

export default function FestivalScreen({ festivals, navigation }) {
    const [selectedFestival, setSelectedFestival] = useState(null);

    // Normalize all festivals to ensure safe data structure
    const normalizedFestivals = festivals.map(normalizeFestival);

    // Filter by isActive flag instead of dates
    const currentFestivals = normalizedFestivals.filter(f => f.isActive === true);
    const upcomingFestivals = normalizedFestivals.filter(f => f.isActive === false);

    const renderFestivalCard = ({ item, isLive }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => setSelectedFestival(item)}
            activeOpacity={0.95}
        >
            <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardOverlay}
                >
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
                        <View style={styles.cardMetaRow}>
                            <View style={styles.metaItem}>
                                <Ionicons name="calendar-outline" size={14} color={theme.colors.textLight} />
                                <Text style={styles.cardDate}>{item.dateTime}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="location-outline" size={14} color={theme.colors.textLight} />
                                <Text style={styles.cardLocation}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
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
                            <Ionicons name="calendar-outline" size={64} color={theme.colors.textLight} />
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
        backgroundColor: theme.colors.background,
    },
    headerTitle: {
        ...theme.typography.h1,
        color: theme.colors.textPrimary,
    },
    scrollContent: {
        padding: theme.spacing.l,
        paddingBottom: 100,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
        marginRight: 8,
    },
    pulsingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
    },

    // Card Styles
    cardContainer: {
        marginBottom: theme.spacing.l,
        ...theme.shadows.medium,
    },
    card: {
        height: 240,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: theme.spacing.l,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    liveBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...theme.shadows.small,
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
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    cardContent: {
        width: '100%',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    cardMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    cardDate: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    cardLocation: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    emptyStateText: {
        marginTop: 16,
        fontSize: 16,
        color: theme.colors.textSecondary,
    },
});
