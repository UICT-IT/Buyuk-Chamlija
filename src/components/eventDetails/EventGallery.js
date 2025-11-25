import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40;

export default function EventGallery({ gallery, activeIndex, onScroll, onImagePress }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryCarousel}
                onScroll={onScroll}
                scrollEventThrottle={16}
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                pagingEnabled
            >
                {gallery && gallery.length > 0 ? (
                    gallery.map((galleryImage, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onImagePress(galleryImage)}
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
            {gallery && gallery.length > 1 && (
                <View style={styles.paginationContainer}>
                    {gallery.map((_, index) => (
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
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
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
});
