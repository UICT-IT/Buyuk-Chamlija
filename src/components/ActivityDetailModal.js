import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Dimensions, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width - 40; // Full width minus container padding

export default function ActivityDetailModal({ visible, onClose, activity }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fullScreenImage, setFullScreenImage] = useState(null);

    if (!activity) return null;

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / ITEM_WIDTH);
        setActiveIndex(index);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${activity.name}!\n\nTime: ${activity.startTime}\nLocation: ${activity.location}\n\n${activity.about}`,
                title: activity.name,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header Image Section */}
                    <View style={styles.imageContainer}>
                        <Image source={activity.image} style={styles.activityImage} />

                        {/* Header Buttons */}
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={styles.iconButton} onPress={onClose}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                                <Ionicons name="share-social-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        {/* Title */}
                        <Text style={styles.title}>{activity.name}</Text>

                        {/* Info Rows */}
                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="time-outline" size={20} color="tomato" />
                            </View>
                            <Text style={styles.infoText}>{activity.startTime}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="location-outline" size={20} color="tomato" />
                            </View>
                            <Text style={styles.infoText}>{activity.location}</Text>
                        </View>

                        {/* About Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About the Activity</Text>
                            <Text style={styles.description}>
                                {activity.about}
                            </Text>
                        </View>

                        {/* Gallery Section */}
                        {activity.gallery && activity.gallery.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Gallery</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.galleryCarousel}
                                    onScroll={handleScroll}
                                    scrollEventThrottle={16}
                                    snapToInterval={ITEM_WIDTH}
                                    decelerationRate="fast"
                                    pagingEnabled
                                >
                                    {activity.gallery.map((galleryImage, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.galleryItemContainer, { width: ITEM_WIDTH }]}
                                            activeOpacity={0.9}
                                            onPress={() => setFullScreenImage(galleryImage)}
                                        >
                                            <Image
                                                source={galleryImage}
                                                style={styles.galleryItem}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                {/* Pagination Dots */}
                                {activity.gallery.length > 1 && (
                                    <View style={styles.paginationContainer}>
                                        {activity.gallery.map((_, index) => (
                                            <View
                                                key={index}
                                                style={[
                                                    styles.paginationDot,
                                                    index === activeIndex ? styles.paginationDotActive : styles.paginationDotInactive
                                                ]}
                                            />
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Full Screen Image Modal */}
                <Modal
                    visible={!!fullScreenImage}
                    transparent={true}
                    onRequestClose={() => setFullScreenImage(null)}
                    animationType="fade"
                >
                    <View style={styles.fullScreenContainer}>
                        <TouchableOpacity
                            style={styles.fullScreenCloseButton}
                            onPress={() => setFullScreenImage(null)}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                        {fullScreenImage && (
                            <Image
                                source={fullScreenImage}
                                style={styles.fullScreenImage}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                </Modal>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    activityImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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
    contentContainer: {
        padding: 20,
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
        backgroundColor: 'rgba(255, 99, 71, 0.1)', // Tomato tint
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        flex: 1, // Allow text to wrap
    },
    section: {
        marginBottom: 30,
        marginTop: 10,
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
        fontSize: 16,
    },
    galleryCarousel: {
        flexDirection: 'row',
    },
    galleryItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryItem: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
        gap: 8,
    },
    paginationDot: {
        height: 8,
        borderRadius: 4,
    },
    paginationDotActive: {
        backgroundColor: 'tomato',
        width: 24,
    },
    paginationDotInactive: {
        backgroundColor: '#ddd',
        width: 8,
    },
    // Full Screen Image Styles
    fullScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width,
        height: height,
    },
    fullScreenCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
});
