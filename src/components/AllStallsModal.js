import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { stalls } from '../data/mockData';

export default function AllStallsModal({ visible, onClose, onSelect }) {
    const renderStallItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onSelect(item)}
            activeOpacity={0.9}
        >
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardOverlay}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDescription} numberOfLines={2}>{item.about}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>All Stalls</Text>
                    <View style={{ width: 28 }} />
                </View>

                <FlatList
                    data={stalls}
                    renderItem={renderStallItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    closeButton: {
        padding: 4,
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        padding: 16,
    },
    cardContent: {
        // Container for text
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    cardDescription: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
});
