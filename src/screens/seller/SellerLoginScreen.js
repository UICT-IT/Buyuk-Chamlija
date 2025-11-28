import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockSellers } from '../../data/mockTicketData';

export default function SellerLoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log('Login attempt:', { username, password });
        console.log('Available sellers:', mockSellers);

        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }

        const seller = mockSellers.find(
            s => s.username === username && s.password === password
        );

        console.log('Found seller:', seller);

        if (seller) {
            navigation.navigate('SellerDashboard', { seller });
        } else {
            Alert.alert('Error', 'Invalid username or password');
        }
    };

    const handleQuickLogin = () => {
        setUsername('seller');
        setPassword('seller123');
        // Auto-login after setting credentials
        setTimeout(() => {
            const seller = mockSellers[0];
            navigation.navigate('SellerDashboard', { seller });
        }, 100);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Logo/Icon */}
                <View style={styles.logoContainer}>
                    <Ionicons name="person-circle-outline" size={100} color="tomato" />
                    <Text style={styles.title}>Seller Login</Text>
                    <Text style={styles.subtitle}>Buyuk Chamlija Ticket System</Text>
                </View>

                {/* Login Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Username</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Demo Credentials */}
                <View style={styles.demoInfo}>
                    <Ionicons name="information-circle-outline" size={20} color="#2196F3" />
                    <View style={styles.demoTextContainer}>
                        <Text style={styles.demoTitle}>Demo Credentials:</Text>
                        <Text style={styles.demoText}>Username: seller</Text>
                        <Text style={styles.demoText}>Password: seller123</Text>
                        <TouchableOpacity style={styles.quickLoginButton} onPress={handleQuickLogin}>
                            <Text style={styles.quickLoginText}>Quick Login (Auto-fill)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 12,
        height: 50,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: 'tomato',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: 'tomato',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    demoInfo: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FD',
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
        alignItems: 'flex-start',
    },
    demoTextContainer: {
        flex: 1,
        marginLeft: 12,
    },
    demoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976D2',
        marginBottom: 4,
    },
    demoText: {
        fontSize: 13,
        color: '#1976D2',
    },
    quickLoginButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 12,
        alignSelf: 'flex-start',
    },
    quickLoginText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
    },
});
