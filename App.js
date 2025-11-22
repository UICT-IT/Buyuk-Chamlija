import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'; // Added Text for visibility
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler'; // REMOVED
import AppNavigator from './src/navigation/AppNavigator';
import { festivals as mockFestivals, activities as mockActivities, faqs as mockFaqs } from './src/data/mockData';

import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [festivals, setFestivals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // ... (Your original useEffect logic remains here)
    const loadData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setFestivals(mockFestivals);
      setActivities(mockActivities);
      setFaqs(mockFaqs);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
        <Text>Loading App...</Text>
      </View>
    );
  }

  return (
    // REMOVED GestureHandlerRootView
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator festivals={festivals} activities={activities} faqs={faqs} />
      </AuthProvider>
    </SafeAreaProvider>
    // END of REMOVED GestureHandlerRootView
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});