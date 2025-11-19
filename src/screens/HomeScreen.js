import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ festivals }) {
    const [selectedFestival, setSelectedFestival] = useState(null);

    const activeFestival = festivals.find(f => f.isActive);
    const upcomingFestivals = festivals.filter(f => !f.isActive);

    const renderFestivalItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => setSelectedFestival(item)}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemDate}>Starts: {item.startDate}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {activeFestival && (
                    <View style={styles.heroContainer}>
                        <View style={styles.liveBadge}>
                            <Text style={styles.liveText}>LIVE NOW</Text>
                        </View>
                        <Text style={styles.heroTitle}>{activeFestival.name}</Text>
                        <Text style={styles.heroTheme}>{activeFestival.theme}</Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => setSelectedFestival(activeFestival)}>
                            <Text style={styles.detailsButtonText}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.sectionHeader}>Upcoming Festivals</Text>
                <FlatList
                    data={upcomingFestivals}
                    renderItem={renderFestivalItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                />

                <Modal
                    visible={!!selectedFestival}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setSelectedFestival(null)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {selectedFestival && (
                                <>
                                    <Text style={styles.modalTitle}>{selectedFestival.name}</Text>
                                    <Text style={styles.modalText}>Operating Hours: {selectedFestival.operatingHours}</Text>
                                    <Text style={styles.modalText}>Adult Fee: {selectedFestival.entranceFeeAdult}</Text>
                                    <Text style={styles.modalText}>Child Fee: {selectedFestival.entranceFeeChild}</Text>
                                    <Button title="Close" onPress={() => setSelectedFestival(null)} color="tomato" />
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    heroContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    liveBadge: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
    },
    liveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    heroTheme: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 15,
        fontStyle: 'italic',
    },
    detailsButton: {
        backgroundColor: 'tomato',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemDate: {
        color: 'gray',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
});
