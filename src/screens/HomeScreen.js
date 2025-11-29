import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useWindowDimensions, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { stalls, activities } from '../data/mockData';
import EventDetailModal from '../components/EventDetailModal';
import StallDetailModal from '../components/StallDetailModal';
import AllStallsModal from '../components/AllStallsModal';
import AllActivitiesModal from '../components/AllActivitiesModal';
import ActivityDetailModal from '../components/ActivityDetailModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

const GAP = theme.spacing.m;
const PADDING = theme.spacing.l;

export default function HomeScreen(props) {
    const { festivals } = props;
    const [selectedFestival, setSelectedFestival] = useState(null);
    const [selectedStall, setSelectedStall] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showAllStalls, setShowAllStalls] = useState(false);
    const [showAllActivities, setShowAllActivities] = useState(false);
    const { width } = useWindowDimensions();

    // Responsive styles
    const responsiveStyles = {
        sectionHeader: {
            fontSize: width > 600 ? 24 : 22,
        },
        welcomeMessage: {
            fontSize: width > 600 ? 36 : 32,
        },
    };

    // Responsive calculations
    const numColumns = width > 1000 ? 4 : width > 700 ? 3 : 2;
    const stallCardWidth = (width - (PADDING * 2) - (GAP * (numColumns - 1))) / numColumns;

    const currentFestival = festivals.find(f => f.isActive) || festivals[0];

    const renderFestivalItem = ({ item }) => (
        <TouchableOpacity
            style={styles.festivalCard}
            onPress={() => setSelectedFestival(item)}
            activeOpacity={0.95}
        >
            <Image source={item.image} style={styles.festivalCardImage} resizeMode="cover" />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.festivalCardOverlay}
            >
                <View style={styles.festivalCardHeader}>
                    {item.isActive && (
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>LIVE NOW</Text>
                        </View>
                    )}
                </View>
                <View style={styles.festivalCardContent}>
                    <Text style={styles.festivalCardTitle}>{item.name}</Text>
                    <Text style={styles.festivalCardDate}>{item.dateTime}</Text>
                    <View style={styles.festivalLocationRow}>
                        <Ionicons name="location" size={16} color={theme.colors.primary} />
                        <Text style={styles.festivalCardLocation}>{item.location}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderStallItem = ({ item, cardWidth }) => (
        <TouchableOpacity
            style={[styles.stallCard, { height: cardWidth * 0.85 }]}
            onPress={() => setSelectedStall(item)}
            activeOpacity={0.9}
        >
            <Image source={item.image} style={styles.stallImage} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.stallOverlay}
            >
                <Text style={styles.stallName} numberOfLines={1}>{item.name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Background Gradient */}
            <LinearGradient
                colors={['#FFFFFF', '#F0F2F5']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTopRow}>
                            <Image source={require('../../assets/logo.png')} style={styles.logo} />
                            <TouchableOpacity
                                style={styles.profileButton}
                                onPress={() => props.navigation && props.navigation.navigate('Profile')}
                            >
                                <Ionicons name="person" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.welcomeMessage, responsiveStyles.welcomeMessage]}>
                            Discover{"\n"}
                            <Text style={{ color: theme.colors.primary }}>Buyuk Chamlija</Text>
                        </Text>
                    </View>

                    {/* Upcoming Festivals Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={[styles.sectionHeader, responsiveStyles.sectionHeader]}>Featured Event</Text>
                            <TouchableOpacity style={styles.viewAllBtn} onPress={() => props.navigation?.navigate('Festivals')}>
                                <Text style={styles.viewAllText}>See All</Text>
                                <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        {currentFestival && (
                            <View key={currentFestival.id} style={styles.festivalWrapper}>
                                {renderFestivalItem({ item: currentFestival })}
                            </View>
                        )}
                    </View>

                    {/* Stalls Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={[styles.sectionHeader, responsiveStyles.sectionHeader]}>Market Stalls</Text>
                            <TouchableOpacity style={styles.viewAllBtn} onPress={() => setShowAllStalls(true)}>
                                <Text style={styles.viewAllText}>View All</Text>
                                <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.stallsGrid}>
                            {stalls.slice(0, 2).map((stall) => (
                                <View key={stall.id} style={[styles.stallWrapper, { width: stallCardWidth }]}>
                                    {renderStallItem({ item: stall, cardWidth: stallCardWidth })}
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Activities Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={[styles.sectionHeader, responsiveStyles.sectionHeader]}>Activities</Text>
                            <TouchableOpacity style={styles.viewAllBtn} onPress={() => setShowAllActivities(true)}>
                                <Text style={styles.viewAllText}>View All</Text>
                                <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>

                        {activities.slice(0, 2).map((activity) => (
                            <TouchableOpacity
                                key={activity.id}
                                style={styles.activityCard}
                                onPress={() => setSelectedActivity(activity)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.activityIconContainer}>
                                    <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                                </View>
                                <View style={styles.activityInfo}>
                                    <Text style={styles.activityName}>{activity.name}</Text>
                                    <View style={styles.activityDetails}>
                                        <View style={styles.activityDetailItem}>
                                            <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                                            <Text style={styles.activityDetailText}>{activity.startTime}</Text>
                                        </View>
                                        <View style={styles.activityDetailItem}>
                                            <Ionicons name="location-outline" size={14} color={theme.colors.textSecondary} />
                                            <Text style={styles.activityDetailText}>{activity.location}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.activityCategoryBadge}>
                                    <Text style={styles.activityCategoryText}>{activity.category}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>

            <EventDetailModal
                visible={!!selectedFestival}
                event={selectedFestival}
                onClose={() => setSelectedFestival(null)}
            />
            <StallDetailModal
                visible={!!selectedStall}
                stall={selectedStall}
                onClose={() => setSelectedStall(null)}
                onBook={(stall) => {
                    if (props.navigation) {
                        props.navigation.navigate('Reservation', { stallId: stall.id });
                    }
                }}
            />
            <ActivityDetailModal
                visible={!!selectedActivity}
                activity={selectedActivity}
                onClose={() => setSelectedActivity(null)}
            />
            <AllStallsModal
                visible={showAllStalls}
                onClose={() => setShowAllStalls(false)}
                onSelect={(stall) => {
                    setShowAllStalls(false);
                    setSelectedStall(stall);
                }}
            />
            <AllActivitiesModal
                visible={showAllActivities}
                onClose={() => setShowAllActivities(false)}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    headerContainer: {
        paddingHorizontal: PADDING,
        paddingTop: 10,
        marginBottom: 20,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    welcomeMessage: {
        ...theme.typography.h1,
        color: theme.colors.textPrimary,
        lineHeight: 40,
    },
    sectionContainer: {
        paddingHorizontal: PADDING,
        marginBottom: 30,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionHeader: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
    },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 107, 107, 0.1)', // Primary with opacity
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    viewAllText: {
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: '600',
        marginRight: 4,
    },

    // Stalls Grid
    stallsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    stallWrapper: {
        marginBottom: GAP,
    },
    stallCard: {
        width: '100%',
        borderRadius: theme.borderRadius.l,
        overflow: 'hidden',
        backgroundColor: 'white',
        ...theme.shadows.medium,
    },
    stallImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    stallOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        paddingTop: 30, // For gradient fade
    },
    stallName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    // Festival Card
    festivalWrapper: {
        marginBottom: 5,
    },
    festivalCard: {
        height: 240,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        backgroundColor: 'white',
        ...theme.shadows.large,
    },
    festivalCardImage: {
        width: '100%',
        height: '100%',
    },
    festivalCardOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: 20,
    },
    festivalCardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    liveBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
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
    festivalCardContent: {
    },
    festivalCardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    festivalCardDate: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 12,
        fontWeight: '500',
    },
    festivalLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        backdropFilter: 'blur(10px)', // Works on iOS
    },
    festivalCardLocation: {
        fontSize: 12,
        color: 'white',
        marginLeft: 6,
        fontWeight: '600',
    },

    // Activities
    activityCard: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.surfaceHighlight,
    },
    activityIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    activityInfo: {
        flex: 1,
        marginRight: 8,
    },
    activityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
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
        color: theme.colors.textSecondary,
    },
    activityCategoryBadge: {
        backgroundColor: 'rgba(78, 205, 196, 0.1)', // Teal with opacity
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    activityCategoryText: {
        fontSize: 10,
        color: theme.colors.secondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
