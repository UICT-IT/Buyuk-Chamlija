import React from 'react';
// AppNavigator - Main navigation configuration
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ReservationScreen from '../screens/ReservationScreen';
import InfoScreen from '../screens/InfoScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator({ festivals, activities, faqs }) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // 💥 CRUCIAL FIX: Explicitly set headerShown to a BOOLEAN 💥
                    headerShown: false, // Set to true if you want to see the header
                    // --------------------------------------------------------

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Reservation') {
                            iconName = focused ? 'calendar' : 'calendar-outline';
                        } else if (route.name === 'Info') {
                            iconName = focused ? 'information-circle' : 'information-circle-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home">
                    {props => <HomeScreen {...props} festivals={festivals} />}
                </Tab.Screen>
                <Tab.Screen name="Reservation">
                    {props => <ReservationScreen {...props} />}
                </Tab.Screen>
                <Tab.Screen name="Info">
                    {props => <InfoScreen {...props} faqs={faqs} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}