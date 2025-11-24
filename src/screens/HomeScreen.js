import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useWindowDimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { stalls, activities } from '../data/mockData';
import EventDetailModal from '../components/EventDetailModal';
import StallDetailModal from '../components/StallDetailModal';
import AllStallsModal from '../components/AllStallsModal';
import AllFestivalsModal from '../components/AllFestivalsModal';
import AllActivitiesModal from '../components/AllActivitiesModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const GAP = 20; // Increased gap
const PADDING = 20; // Increased padding for better margins

export default function HomeScreen(props) {
    const { festivals } = props;
    const [selectedFestival, setSelectedFestival] = useState(null);
    const [selectedStall, setSelectedStall] = useState(null);
    const [showAllStalls, setShowAllStalls] = useState(false);
    const [showAllFestivals, setShowAllFestivals] = useState(false);
    const [showAllActivities, setShowAllActivities] = useState(false);
    const { width } = useWindowDimensions();

    // Responsive styles
    const responsiveStyles = {
        sectionHeader: {
            fontSize: width > 600 ? 22 : 20,
        },
        welcomeMessage: {
            fontSize: width > 600 ? 32 : 28,
        },
    };

    // Responsive calculations
    // Keep 2 columns for mobile to make them wide, 3 for tablet, 4 for desktop
    const numColumns = width > 1000 ? 4 : width > 700 ? 3 : 2;
    const stallCardWidth = (width - (PADDING * 2) - (GAP * (numColumns - 1))) / numColumns;

    const upcomingFestivals = festivals.filter(f => !f.isActive);

    const renderFestivalItem = ({ item }) => (
        <TouchableOpacity style={styles.festivalCard} onPress={() => setSelectedFestival(item)}>
            <View style={styles.festivalInfo}>
                <Text style={styles.festivalDateText}>{item.dateTime}</Text>
                <Text style={styles.festivalTitle}>{item.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    const renderStallItem = ({ item, cardWidth }) => (
        <TouchableOpacity
            style={[styles.stallCard, { height: cardWidth * 0.8 }]}
            onPress={() => setSelectedStall(item)}
        >
            <Image source={item.image} style={styles.stallImage} />
            <View style={styles.stallOverlay}>
                <Text style={styles.stallName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerTopRow}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                        <TouchableOpacity
                            onPress={() => props.navigation && props.navigation.navigate('Profile')}
                        >
                            <Ionicons name="person-outline" size={22} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stalls Section */}
                <View style={styles.sectionContainer}>
                    {/* Welcome Message */}
                    <Text style={[styles.welcomeMessage, responsiveStyles.welcomeMessage]}>Welcome to{"\n"}Buyuk Chamlija</Text>

                    <View style={styles.sectionHeaderRow}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="storefront-outline" size={24} color="#333" style={styles.sectionIcon} />
                            <Text style={[styles.sectionHeader, responsiveStyles.sectionHeader]}>Stalls</Text>
                        </View>
                        <TouchableOpacity style={styles.viewAllBtn} onPress={() => setShowAllStalls(true)}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Ionicons name="arrow-forward" size={18} color="tomato" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.stallsGrid}>
                        {stalls.slice(0, 4).map((stall) => (
                            <View key={stall.id} style={[styles.stallWrapper, { width: stallCardWidth }]}>
                                {renderStallItem({ item: stall, cardWidth: stallCardWidth })}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Upcoming Festivals Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="calendar-outline" size={24} color="#333" style={styles.sectionIcon} />
                            <Text style={[styles.sectionHeader, responsiveStyles.sectionHeader]}>Upcoming Festivals</Text>
                        </View>
                        <TouchableOpacity style={styles.viewAllBtn} onPress={() => setShowAllFestivals(true)}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Ionicons name="arrow-forward" size={18} color="tomato" />
                        </TouchableOpacity>
                    </View>

                    {upcomingFestivals.slice(0, 3).map((festival) => (
                        <View key={festival.id} style={styles.festivalWrapper}>
                            {renderFestivalItem({ item: festival })}
                        </View>
                    ))}
                </View>

                {/* Activities Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="fitness-outline" size={24} color="#333" style={styles.sectionIcon} />
                            <Text style={[styles.sectionHeader, responsiveStyles.sectionHeader]}>Activities</Text>
                        </View>
                        <TouchableOpacity style={styles.viewAllBtn} onPress={() => setShowAllActivities(true)}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Ionicons name="arrow-forward" size={18} color="tomato" />
                        </TouchableOpacity>
                    </View>

                    {activities.slice(0, 2).map((activity) => (
                        <View key={activity.id} style={styles.activityCard}>
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
                        </View>
                    ))}
                </View>
            </ScrollView>

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
                    // Navigate to Reservation tab and pass stallId
                    // We need to access navigation prop here
                    // HomeScreen receives 'navigation' prop from Tab.Screen
                    if (props.navigation) {
                        props.navigation.navigate('Reservation', { stallId: stall.id });
                    }
                }}
            />
            <AllStallsModal
                visible={showAllStalls}
                onClose={() => setShowAllStalls(false)}
                onSelect={(stall) => {
                    setShowAllStalls(false);
                    setSelectedStall(stall);
                }}
            />
            <AllFestivalsModal
                visible={showAllFestivals}
                festivals={upcomingFestivals}
                onClose={() => setShowAllFestivals(false)}
                onSelect={(festival) => {
                    setShowAllFestivals(false);
                    setSelectedFestival(festival);
                }}
            />
            <AllActivitiesModal
                visible={showAllActivities}
                onClose={() => setShowAllActivities(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light background
    },
    scrollContent: {
        paddingBottom: 40,
    },
    headerContainer: {
        padding: PADDING,
        paddingTop: 10, // Reduced from 60
        marginBottom: 30, // Increased from 20
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    sectionContainer: {
        paddingHorizontal: PADDING,
        marginBottom: 25,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        marginRight: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: 'tomato',
        fontSize: 14, // Reduced from 16
        marginRight: 5,
    },
    welcomeMessage: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'left',
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
        // Height is set dynamically
        borderRadius: 20, // Increased radius
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15, // Increased padding
        alignItems: 'center',
    },
    stallName: {
        color: 'white',
        fontSize: 16, // Reduced from 18
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // Upcoming Festivals
    festivalWrapper: {
        marginBottom: 15,
    },
    festivalCard: {
        backgroundColor: 'white',
        borderRadius: 24, // Increased radius
        padding: 24, // Increased padding
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    festivalInfo: {
        flex: 1,
    },
    festivalTitle: {
        color: '#333',
        fontSize: 18, // Reduced from 22
        fontWeight: 'bold',
    },
    festivalDateText: {
        color: '#666',
        fontSize: 14, // Reduced from 16
        fontWeight: '600',
        marginBottom: 6,
    },

    // Activities
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
    },
    activityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    activityDetails: {
        flexDirection: 'row',
        gap: 12,
    },
    activityDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    activityDetailText: {
        fontSize: 12,
        color: '#666',
    },
    activityCategoryBadge: {
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    activityCategoryText: {
        fontSize: 12,
        color: 'tomato',
        fontWeight: '600',
    },
});
