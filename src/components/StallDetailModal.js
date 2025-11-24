import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Dimensions, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function StallDetailModal({ visible, onClose, stall, onBook }) {
    if (!stall) return null;

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${stall.name}!\n\nLocation: Buyuk Chamlija – Socio, Eco, Techno Village\n\n${stall.about}`,
                title: stall.name,
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
                        <Image source={stall.image} style={styles.stallImage} />

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
                        <Text style={styles.title}>{stall.name}</Text>

                        {/* About Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About the Stall</Text>
                            <Text style={styles.description}>
                                {stall.about}
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

                        {/* Book Button */}
                        <TouchableOpacity
                            style={styles.bookButton}
                            onPress={() => {
                                onClose();
                                onBook(stall);
                            }}
                        >
                            <Text style={styles.bookButtonText}>Book Reservation</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    stallImage: {
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
        fontSize: 16,
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
    bookButton: {
        backgroundColor: 'tomato',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: 'tomato',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    bookButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
