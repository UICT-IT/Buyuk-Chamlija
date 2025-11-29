import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

export default function ProfileScreen({ navigation, faqs }) {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>My Profile</Text>
                    </View>

                    {/* Profile Card */}
                    <View style={styles.profileCardContainer}>
                        <LinearGradient
                            colors={['#ffffff', '#f8f9fa']}
                            style={styles.profileCard}
                        >
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
                        </LinearGradient>
                    </View>

                    {/* Personal Info Section - Only for Logged In Users */}
                    {user && (
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Personal Information</Text>
                            <View style={styles.infoCard}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoIcon}>
                                        <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
                                    </View>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>Phone</Text>
                                        <Text style={styles.infoValue}>{user.phone || '+27 -- --- ----'}</Text>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.infoRow}>
                                    <View style={styles.infoIcon}>
                                        <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
                                    </View>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>Location</Text>
                                        <Text style={styles.infoValue}>{user.location || 'South Africa'}</Text>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.infoRow}>
                                    <View style={styles.infoIcon}>
                                        <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
                                    </View>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>Member Since</Text>
                                        <Text style={styles.infoValue}>{user.memberSince}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Member QR Code Button - Only for Logged In Users */}
                    {user && (
                        <TouchableOpacity
                            style={styles.qrButtonContainer}
                            onPress={() => navigation.navigate('UserQRCode')}
                            activeOpacity={0.9}
                        >
                            <LinearGradient
                                colors={[theme.colors.secondary, '#2ecc71']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.qrButton}
                            >
                                <View style={styles.qrButtonContent}>
                                    <View style={styles.qrIconContainer}>
                                        <Ionicons name="qr-code" size={24} color="white" />
                                    </View>
                                    <View style={styles.qrTextContainer}>
                                        <Text style={styles.qrButtonTitle}>My Member QR</Text>
                                        <Text style={styles.qrButtonSubtitle}>Show to sellers for new purchases</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={24} color="white" />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}

                    {/* Seller Dashboard Section - Only for Sellers */}
                    {user && user.isSeller && (
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Seller Dashboard</Text>
                            <TouchableOpacity
                                style={styles.sellerCardContainer}
                                onPress={() => navigation.navigate('SellerDashboard')}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                                    style={styles.sellerCard}
                                >
                                    <View style={styles.sellerCardHeader}>
                                        <View style={styles.sellerBadge}>
                                            <Ionicons name="storefront" size={24} color={theme.colors.primary} />
                                        </View>
                                        <View style={styles.sellerInfo}>
                                            <Text style={styles.sellerTitle}>Ticket Seller Mode</Text>
                                            <Text style={styles.sellerSubtitle}>Manage sales and scan tickets</Text>
                                        </View>
                                    </View>
                                    <View style={styles.sellerCardFooter}>
                                        <Text style={styles.sellerActionText}>Open Dashboard</Text>
                                        <Ionicons name="arrow-forward" size={20} color="white" />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* FAQ Button */}
                    <TouchableOpacity
                        style={styles.faqButton}
                        onPress={() => navigation.navigate('FAQ')}
                    >
                        <View style={styles.faqButtonContent}>
                            <View style={styles.faqButtonLeft}>
                                <View style={styles.faqIconContainer}>
                                    <Ionicons name="help-circle-outline" size={24} color={theme.colors.primary} />
                                </View>
                                <Text style={styles.faqButtonText}>Frequently Asked Questions</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
                        </View>
                    </TouchableOpacity>

                    {/* Logout Button - Only for Logged In Users */}
                    {user && (
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={20} color={theme.colors.error} style={{ marginRight: 8 }} />
                            <Text style={styles.logoutText}>Log Out</Text>
                        </TouchableOpacity>
                    )}

                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </ScrollView>
            </SafeAreaView >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.l,
        paddingBottom: 40,
    },
    header: {
        marginBottom: theme.spacing.l,
        marginTop: theme.spacing.s,
    },
    headerTitle: {
        ...theme.typography.h1,
        color: theme.colors.textPrimary,
    },

    // Profile Card
    profileCardContainer: {
        marginBottom: theme.spacing.xl,
        ...theme.shadows.medium,
    },
    profileCard: {
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.l,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: theme.spacing.m,
        ...theme.shadows.medium,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: 'white',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'white',
    },
    userName: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
        marginBottom: 4,
    },
    userEmail: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.l,
    },
    editProfileBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
    },
    editProfileText: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },

    // Auth Buttons
    authButtonsRow: {
        flexDirection: 'row',
        marginTop: theme.spacing.m,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.s,
    },
    authButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
    },
    loginButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    signupButton: {
        backgroundColor: theme.colors.primary,
        ...theme.shadows.small,
    },
    loginButtonText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Info Section
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        ...theme.typography.h3,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.m,
        marginLeft: 4,
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        ...theme.shadows.small,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 16,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.divider,
        marginLeft: 56,
        marginVertical: 4,
    },

    // QR Button
    qrButtonContainer: {
        marginBottom: theme.spacing.xl,
        ...theme.shadows.medium,
    },
    qrButton: {
        borderRadius: theme.borderRadius.l,
        overflow: 'hidden',
    },
    qrButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.l,
    },
    qrIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    qrTextContainer: {
        flex: 1,
    },
    qrButtonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 2,
    },
    qrButtonSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
    },

    // Seller Dashboard
    sellerCardContainer: {
        ...theme.shadows.medium,
    },
    sellerCard: {
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
    },
    sellerCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    sellerBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        ...theme.shadows.small,
    },
    sellerInfo: {
        flex: 1,
    },
    sellerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    sellerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    sellerCardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        gap: 8,
    },
    sellerActionText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },

    // FAQ Button
    faqButton: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        marginBottom: theme.spacing.xl,
        ...theme.shadows.small,
    },
    faqButtonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    faqButtonLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    faqIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    faqButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },

    // Logout Button
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: theme.borderRadius.l,
        marginBottom: theme.spacing.l,
        borderWidth: 1,
        borderColor: theme.colors.divider,
    },
    logoutText: {
        color: theme.colors.error,
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        textAlign: 'center',
        color: theme.colors.textLight,
        fontSize: 12,
        marginBottom: 20,
    },
});
