import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Dimensions, Linking, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40; // Full width minus container padding (20 left + 20 right)

export default function EventDetailModal({ visible, onClose, event }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!event) return null;

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / ITEM_WIDTH);
        setActiveIndex(index);
    };

    const openMaps = () => {
        const address = encodeURIComponent('Buyuk Chamlija – Socio, Eco, Techno Village');
        const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
        Linking.openURL(url);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${event.name}!\n\nDate: ${event.dateTime}\nLocation: Buyuk Chamlija – Socio, Eco, Techno Village\n\n${event.description}`,
                title: event.name,
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
                        {event.image ? (
                            <Image source={event.image} style={styles.eventImage} resizeMode="cover" />
                        ) : (
                            <View style={[styles.eventImage, { backgroundColor: event.isActive ? '#FF6347' : '#6B4FA0' }]}>
                                <Ionicons name="image-outline" size={64} color="rgba(255,255,255,0.5)" />
                            </View>
                        )}

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
                        <Text style={styles.title}>{event.name}</Text>

                        {/* Info Rows */}
                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="calendar-outline" size={20} color="tomato" />
                            </View>
                            <Text style={styles.infoText}>{event.dateTime}</Text>
                        </View>

                        <TouchableOpacity style={styles.infoRow} onPress={openMaps}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="location-outline" size={20} color="tomato" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.infoText}>Buyuk Chamlija – Socio, Eco, Techno Village</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        {/* Action Buttons */}
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity style={styles.primaryButton}>
                                <Ionicons name="add" size={20} color="white" style={{ marginRight: 8 }} />
                                <Text style={styles.primaryButtonText}>Add to Calendar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.secondaryButton} onPress={openMaps}>
                                <Ionicons name="map-outline" size={20} color="#333" style={{ marginRight: 8 }} />
                                <Text style={styles.secondaryButtonText}>View on Map</Text>
                            </TouchableOpacity>
                        </View>

                        {/* About Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About the Event</Text>
                            <Text style={styles.description}>
                                {event.description}
                            </Text>
                        </View>

                        {/* Gallery Section */}
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
                                {event.gallery && event.gallery.length > 0 ? (
                                    event.gallery.map((galleryImage, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setSelectedImage(galleryImage)}
                                            activeOpacity={0.9}
                                            style={[styles.galleryItemContainer, { width: ITEM_WIDTH }]}
                                        >
                                            <Image
                                                source={galleryImage}
                                                style={styles.galleryItem}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    [1, 2, 3, 4].map((item) => (
                                        <View key={item} style={[styles.galleryItem, styles.galleryItemContainer, { width: ITEM_WIDTH, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
                                            <Ionicons name="image" size={32} color="#ccc" />
                                        </View>
                                    ))
                                )}
                            </ScrollView>

                            {/* Pagination Dots */}
                            {event.gallery && event.gallery.length > 1 && (
                                <View style={styles.paginationContainer}>
                                    {event.gallery.map((_, index) => (
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
                    </View>
                </ScrollView>
            </View>

            {/* Image Viewer Modal */}
            <Modal
                visible={!!selectedImage}
                transparent={true}
                onRequestClose={() => setSelectedImage(null)}
                animationType="fade"
            >
                <View style={styles.imageViewerContainer}>
                    <TouchableOpacity
                        style={styles.imageViewerCloseButton}
                        onPress={() => setSelectedImage(null)}
                    >
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image
                            source={selectedImage}
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </Modal>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light background
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        height: 250,
        width: '100%',
        position: 'relative',
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
    },
    subInfoText: {
        color: '#666',
        fontSize: 14,
        marginTop: 2,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
        marginTop: 10,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: 'tomato',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    secondaryButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
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
    imageViewerContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageViewerCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    fullScreenImage: {
        width: width,
        height: '100%',
    },
});
