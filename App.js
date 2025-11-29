import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { festivals as mockFestivals, activities as mockActivities, faqs as mockFaqs } from './src/data/mockData';
import { AuthProvider } from './src/context/AuthContext';
import { TicketProvider } from './src/context/TicketContext';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [festivals, setFestivals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
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
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <TicketProvider>
            <AppNavigator festivals={festivals} activities={activities} faqs={faqs} />
          </TicketProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});