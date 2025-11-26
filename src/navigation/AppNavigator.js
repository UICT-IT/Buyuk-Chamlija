import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import FestivalScreen from '../screens/FestivalScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfoScreen from '../screens/InfoScreen';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ festivals, activities, faqs }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Festivals') {
                        iconName = focused ? 'balloon' : 'balloon-outline';
                    } else if (route.name === 'Reservation') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
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
            <Tab.Screen name="Festivals">
                {props => <FestivalScreen {...props} festivals={festivals} />}
            </Tab.Screen>
            <Tab.Screen name="Reservation">
                {props => <ReservationScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {props => <ProfileScreen {...props} faqs={faqs} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default function AppNavigator({ festivals, activities, faqs }) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main">
                    {props => <MainTabs {...props} festivals={festivals} activities={activities} faqs={faqs} />}
                </Stack.Screen>
                <Stack.Screen name="EventDetail" component={EventDetailScreen} />
                <Stack.Screen name="FAQ">
                    {props => <InfoScreen {...props} faqs={faqs} />}
                </Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}