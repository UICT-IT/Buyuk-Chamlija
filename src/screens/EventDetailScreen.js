import React from 'react';
import EventDetailView from '../components/EventDetailView';

export default function EventDetailScreen({ route, navigation }) {
    const { event } = route.params;

    if (!event) {
        navigation.goBack();
        return null;
    }

    return <EventDetailView event={event} onBack={() => navigation.goBack()} />;
}
