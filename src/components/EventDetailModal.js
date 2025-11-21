import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function EventDetailModal({ visible, onClose, event }) {
    if (!event) return null;

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
                        {/* Placeholder for Event Image - using a colored view for now or a placeholder image */}
                        <View style={[styles.eventImage, { backgroundColor: event.isActive ? '#FF6347' : '#6B4FA0' }]}>
                            <Ionicons name="image-outline" size={64} color="rgba(255,255,255,0.5)" />
                        </View>

                        {/* Header Buttons */}
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={styles.iconButton} onPress={onClose}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
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

                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="location-outline" size={20} color="tomato" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.infoText}>{event.venue}</Text>
                                <Text style={styles.subInfoText}>{event.location}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity style={styles.primaryButton}>
                                <Ionicons name="add" size={20} color="white" style={{ marginRight: 8 }} />
                                <Text style={styles.primaryButtonText}>Add to Calendar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.secondaryButton}>
                                <Ionicons name="map-outline" size={20} color="#333" style={{ marginRight: 8 }} />
                                <Text style={styles.secondaryButtonText}>View on Map</Text>
                            </TouchableOpacity>
                        </View>

                        {/* About Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About the Event</Text>
                            <Text style={styles.description}>
                                {event.description}
                                {"\n\n"}
                                Discover the beauty and intricacy of our community gathering. This event showcases a diverse collection of activities, food stalls, and cultural exhibitions. Join us for a journey through the rich cultural heritage.
                            </Text>
                        </View>

                        {/* Gallery Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Gallery</Text>
                            <View style={styles.galleryGrid}>
                                {[1, 2, 3, 4].map((item) => (
                                    <View key={item} style={styles.galleryItem}>
                                        <Ionicons name="image" size={32} color="#ccc" />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Fixed Section (Review) */}
                <View style={styles.bottomSection}>
                    <View style={styles.reviewCard}>
                        <View style={styles.reviewIconContainer}>
                            <Ionicons name="chatbubble-outline" size={24} color="tomato" />
                        </View>
                        <Text style={styles.reviewTitle}>Enjoyed the event?</Text>
                        <Text style={styles.reviewSubtitle}>Share your experience with the community by submitting a review.</Text>
                        <TouchableOpacity style={styles.reviewButton}>
                            <Text style={styles.reviewButtonText}>Submit a Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    galleryItem: {
        width: (width - 50) / 2,
        height: 120,
        backgroundColor: '#eee',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        padding: 20,
        paddingTop: 0,
    },
    reviewCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    reviewIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    reviewSubtitle: {
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    reviewButton: {
        backgroundColor: 'tomato',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    reviewButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
