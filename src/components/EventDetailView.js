import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Linking, Share, Dimensions } from 'react-native';
import EventHeader from './eventDetails/EventHeader';
import EventPricing from './eventDetails/EventPricing';
import EventDescription from './eventDetails/EventDescription';
import EventGallery from './eventDetails/EventGallery';
import { canOpenMapForEvent, shouldIncludeLocationInShare } from '../utils/festivalHelpers';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40;

export default function EventDetailView({ event, onBack }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!event) return null;

    // Handlers
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / ITEM_WIDTH);
        setActiveIndex(index);
    };

    const openMaps = () => {
        // Guard: only open map if location is valid
        if (!canOpenMapForEvent(event)) return;

        const address = encodeURIComponent(event.location);
        const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
        Linking.openURL(url);
    };

    const handleShare = async () => {
        try {
            // Conditionally include location if valid
            const locationLine = shouldIncludeLocationInShare(event)
                ? `\nLocation: ${event.location}`
                : '';

            await Share.share({
                message: `Check out ${event.name}!\n\nDate: ${event.dateTime}${locationLine}\n\n${event.description}`,
                title: event.name,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <EventHeader
                        event={event}
                        onBack={onBack}
                        onShare={handleShare}
                        onLocationPress={openMaps}
                    />

                    <EventPricing
                        adultFee={event.entranceFeeAdult || 'R50'}
                        childFee={event.entranceFeeChild || 'R25'}
                        onMapPress={openMaps}
                    />

                    <EventDescription description={event.description} />

                    <EventGallery
                        gallery={event.gallery}
                        activeIndex={activeIndex}
                        onScroll={handleScroll}
                        onImagePress={setSelectedImage}
                    />
                </View>
            </ScrollView>
        </View>
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
    contentContainer: {
        padding: 20,
    },
});
