import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import FestivalScreen from '../screens/FestivalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfoScreen from '../screens/InfoScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

// Ticket Screens
import MyTicketsScreen from '../screens/tickets/MyTicketsScreen';
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
import QRCodeScreen from '../screens/tickets/QRCodeScreen';
import UserQRCodeScreen from '../screens/tickets/UserQRCodeScreen';

// Seller Screens
import SellerDashboardScreen from '../screens/seller/SellerDashboardScreen';
import ScanTicketScreen from '../screens/seller/ScanTicketScreen';
import TicketScanResultScreen from '../screens/seller/TicketScanResultScreen';
import PaymentConfirmationScreen from '../screens/seller/PaymentConfirmationScreen';
import SaleHistoryScreen from '../screens/seller/SaleHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Normal user tabs
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
                    } else if (route.name === 'Tickets') {
                        iconName = focused ? 'ticket' : 'ticket-outline';
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
            <Tab.Screen name="Tickets" component={MyTicketsScreen} />
            <Tab.Screen name="Profile">
                {props => <ProfileScreen {...props} faqs={faqs} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

// Seller-only stack navigator
function SellerStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
            <Stack.Screen name="ScanTicket" component={ScanTicketScreen} />
            <Stack.Screen name="TicketScanResult" component={TicketScanResultScreen} />
            <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
            <Stack.Screen name="SaleHistory" component={SaleHistoryScreen} />
        </Stack.Navigator>
    );
}

// Main navigator wrapper that checks user type
function MainNavigator({ festivals, activities, faqs }) {
    const { user } = useAuth();

    // Sellers get seller-only navigation
    if (user?.isSeller) {
        return <SellerStack />;
    }

    // Normal users get tab navigation
    return <MainTabs festivals={festivals} activities={activities} faqs={faqs} />;
}

export default function AppNavigator({ festivals, activities, faqs }) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main">
                    {props => <MainNavigator {...props} festivals={festivals} activities={activities} faqs={faqs} />}
                </Stack.Screen>
                <Stack.Screen name="EventDetail" component={EventDetailScreen} />
                <Stack.Screen name="FAQ">
                    {props => <InfoScreen {...props} faqs={faqs} />}
                </Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />

                {/* Ticket Screens */}
                <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
                <Stack.Screen name="QRCode" component={QRCodeScreen} />
                <Stack.Screen name="UserQRCode" component={UserQRCodeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}