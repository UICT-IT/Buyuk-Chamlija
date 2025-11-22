import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useWindowDimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { stalls } from '../data/mockData';
import EventDetailModal from '../components/EventDetailModal';
import StallDetailModal from '../components/StallDetailModal';
import AllStallsModal from '../components/AllStallsModal';
import AllFestivalsModal from '../components/AllFestivalsModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const GAP = 15;
const PADDING = 20;

export default function HomeScreen({ festivals }) {
    const [selectedFestival, setSelectedFestival] = useState(null);
    const [selectedStall, setSelectedStall] = useState(null);
    const [showAllStalls, setShowAllStalls] = useState(false);
    const [showAllFestivals, setShowAllFestivals] = useState(false);
    const { width } = useWindowDimensions();

    // Responsive calculations
    const numColumns = width > 700 ? 3 : 2;
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
                    <View>
                        <Text style={styles.welcomeText}>Welcome to</Text>
                        <Text style={styles.brandText}>Buyuk Chamlija</Text>
                    </View>
                </View>

                {/* Stalls Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="storefront-outline" size={24} color="#333" style={styles.sectionIcon} />
                            <Text style={styles.sectionHeader}>Stalls</Text>
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
                            <Text style={styles.sectionHeader}>Upcoming Festivals</Text>
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
            />
            <AllStallsModal
                visible={showAllStalls}
                onClose={() => setShowAllStalls(false)}
                onSelect={(stall) => {
                    setSelectedStall(stall);
                    // Optional: Close the list modal if you want only one modal open at a time
                    // setShowAllStalls(false);
                }}
            />
            <AllFestivalsModal
                visible={showAllFestivals}
                festivals={upcomingFestivals}
                onClose={() => setShowAllFestivals(false)}
                onSelect={(festival) => {
                    setSelectedFestival(festival);
                    // Optional: Close the list modal if you want only one modal open at a time
                    // setShowAllFestivals(false); 
                }}
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
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    brandText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
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
        fontSize: 14,
        marginRight: 5,
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
        borderRadius: 16,
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
        padding: 10,
        alignItems: 'center',
    },
    stallName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // Upcoming Festivals
    festivalWrapper: {
        marginBottom: 15,
    },
    festivalCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    festivalDateText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
});
