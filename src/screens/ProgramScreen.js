import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityDetailModal from '../components/ActivityDetailModal';

export default function ProgramScreen({ activities }) {
  const [showKidsOnly, setShowKidsOnly] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filteredActivities = showKidsOnly
    ? activities.filter(a => a.category === 'Kids')
    : activities;

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setSelectedActivity(item)}
      activeOpacity={0.7}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.startTime}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Festival Program</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Show Kids Activities</Text>
          <Switch
            value={showKidsOnly}
            onValueChange={setShowKidsOnly}
            trackColor={{ false: '#767577', true: 'tomato' }}
            thumbColor={showKidsOnly ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      <FlatList
        data={filteredActivities}
        renderItem={renderActivityItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No activities found.</Text>}
      />

      <ActivityDetailModal
        visible={!!selectedActivity}
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
  },
  listContent: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeContainer: {
    marginRight: 15,
    backgroundColor: '#ffe0dd', // light tomato
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  timeText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemLocation: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 2,
  },
  itemCategory: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
