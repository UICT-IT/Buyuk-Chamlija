import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AllFestivalsModal({ visible, onClose, festivals, onSelect }) {
    const renderFestivalItem = ({ item }) => (
        <TouchableOpacity
            style={styles.festivalCard}
            onPress={() => onSelect(item)}
            activeOpacity={0.7}
        >
            <View style={styles.festivalInfo}>
                <Text style={styles.festivalDateText}>{item.dateTime}</Text>
                <Text style={styles.festivalTitle}>{item.name}</Text>
                <Text style={styles.festivalTheme}>{item.theme}</Text>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.locationText}>{item.venue}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
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
                    <Text style={styles.headerTitle}>All Festivals</Text>
                    <View style={{ width: 28 }} />
                </View>

                <FlatList
                    data={festivals}
                    renderItem={renderFestivalItem}
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
    festivalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
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
    festivalDateText: {
        color: 'tomato',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    festivalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    festivalTheme: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
});
