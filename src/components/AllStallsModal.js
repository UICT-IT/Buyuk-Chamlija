import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { stalls } from '../data/mockData';

export default function AllStallsModal({ visible, onClose, onSelect }) {
    const renderStallItem = ({ item }) => (
        <TouchableOpacity style={styles.stallCard} onPress={() => onSelect(item)}>
            <Image source={item.image} style={styles.stallImage} />
            <View style={styles.stallInfo}>
                <Text style={styles.stallName}>{item.name}</Text>
                <Text style={styles.stallDescription} numberOfLines={2}>{item.about}</Text>
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
        backgroundColor: '#f5f5f5',
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
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    listContent: {
        padding: 20,
    },
    stallCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stallImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    stallInfo: {
        padding: 15,
    },
    stallName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    stallDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});
