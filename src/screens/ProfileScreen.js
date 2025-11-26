import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation, faqs }) {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    const renderSettingItem = (icon, title, showChevron = true, rightElement = null) => (
        <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={22} color="#555" />
                </View>
                <Text style={styles.settingText}>{title}</Text>
            </View>
            {rightElement ? (
                rightElement
            ) : (
                showChevron && <Ionicons name="chevron-forward" size={20} color="#ccc" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Profile</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }}
                            style={styles.avatar}
                        />
                        {user && (
                            <TouchableOpacity style={styles.editBadge}>
                                <Ionicons name="camera" size={14} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.userName}>{user ? user.name : 'Guest User'}</Text>
                    <Text style={styles.userEmail}>{user ? user.email : 'Sign in to access all features'}</Text>

                    {user ? (
                        <TouchableOpacity style={styles.editProfileBtn}>
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.authButtonsRow}>
                            <TouchableOpacity
                                style={[styles.authButton, styles.loginButton]}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.loginButtonText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.authButton, styles.signupButton]}
                                onPress={() => navigation.navigate('Signup')}
                            >
                                <Text style={styles.signupButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Personal Info Section - Only for Logged In Users */}
                {user && (
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Personal Information</Text>
                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Phone</Text>
                                <Text style={styles.infoValue}>{user.phone || '+27 -- --- ----'}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Location</Text>
                                <Text style={styles.infoValue}>{user.location || 'South Africa'}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Member Since</Text>
                                <Text style={styles.infoValue}>{user.memberSince}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* FAQ Button */}
                <TouchableOpacity
                    style={styles.faqButton}
                    onPress={() => navigation.navigate('FAQ')}
                >
                    <View style={styles.faqButtonContent}>
                        <View style={styles.faqButtonLeft}>
                            <Ionicons name="help-circle-outline" size={24} color="tomato" />
                            <Text style={styles.faqButtonText}>Frequently Asked Questions</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="tomato" />
                    </View>
                </TouchableOpacity>

                {/* Logout Button - Only for Logged In Users */}
                {user && (
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={20} color="tomato" style={{ marginRight: 8 }} />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'tomato',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    editProfileBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#fff0ee',
    },
    editProfileText: {
        color: 'tomato',
        fontWeight: '600',
        fontSize: 14,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    infoLabel: {
        fontSize: 15,
        color: '#666',
    },
    infoValue: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    settingsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    settingText: {
        fontSize: 16,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginLeft: 70,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ffe0dd',
    },
    logoutText: {
        color: 'tomato',
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
        marginBottom: 20,
    },
    authButtonsRow: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    authButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    loginButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'tomato',
    },
    signupButton: {
        backgroundColor: 'tomato',
    },
    loginButtonText: {
        color: 'tomato',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // FAQ Button Styles
    faqButton: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    faqButtonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
    },
    faqButtonLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    faqButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 15,
    },
});
