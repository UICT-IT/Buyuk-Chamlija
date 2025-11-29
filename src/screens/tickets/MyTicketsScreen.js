import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusColor } from '../../data/mockTicketData';
import { useAuth } from '../../context/AuthContext';
import { useTickets } from '../../context/TicketContext';
import { theme } from '../../theme';

export default function MyTicketsScreen({ navigation }) {
    const { user } = useAuth();
    const { tickets, loading, getUserTickets } = useTickets();
    const [showHistory, setShowHistory] = React.useState(false);

    const renderTicketCard = ({ item }) => {
        const isExpired = item.status === 'EXPIRED' || item.status === 'USED';
        const gradientColors = isExpired
            ? ['#636E72', '#2D3436'] // Grey for expired
            : [theme.colors.primary, theme.colors.primaryDark]; // Brand color for active

        return (
            <TouchableOpacity
                style={styles.ticketCardContainer}
                onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.ticketCard}
                >
                    {/* Decorative Circles */}
                    <View style={styles.decorativeCircle1} />
                    <View style={styles.decorativeCircle2} />

                    <View style={styles.ticketHeader}>
                        <View>
                            <Text style={styles.ticketLabel}>Ticket ID</Text>
                            <Text style={styles.ticketId}>{item.id}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                    </View>

                    <View style={styles.ticketBody}>
                        <View style={styles.ticketRow}>
                            <View style={styles.ticketInfoItem}>
                                <Text style={styles.infoLabel}>Guests</Text>
                                <View style={styles.infoValueRow}>
                                    <Ionicons name="people" size={16} color="rgba(255,255,255,0.9)" />
                                    <Text style={styles.infoValue}>
                                        {item.kids} Kids, {item.adults} Adults
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.ticketRow}>
                            <View style={styles.ticketInfoItem}>
                                <Text style={styles.infoLabel}>Expires</Text>
                                <Text style={styles.infoValue}>
                                    {new Date(item.expiryDate).toLocaleDateString()}
                                </Text>
                            </View>
                            <View style={styles.ticketInfoItem}>
                                <Text style={styles.infoLabel}>Total</Text>
                                <Text style={styles.totalAmount}>R{item.totalAmount}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ticketFooter}>
                        <Text style={styles.tapText}>Tap to view QR Code</Text>
                        <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.8)" />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    // Show login prompt for guests
    if (!user) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.guestPromptContainer}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="wallet-outline" size={60} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.guestPromptTitle}>My Wallet</Text>
                        <Text style={styles.guestPromptMessage}>
                            Log in to access your digital tickets and passes.
                        </Text>
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
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    // Show loading indicator
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Loading wallet...</Text>
                </View>
            </View>
        );
    }

    const allUserTickets = getUserTickets(user.id);
    const displayedTickets = allUserTickets.filter(ticket => {
        const isHistory = ticket.status === 'EXPIRED' || ticket.status === 'USED';
        return showHistory ? isHistory : !isHistory;
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {showHistory ? 'Ticket History' : 'My Wallet'}
                    </Text>
                    <TouchableOpacity
                        style={[styles.historyButton, showHistory && styles.historyButtonActive]}
                        onPress={() => setShowHistory(!showHistory)}
                    >
                        <Ionicons
                            name={showHistory ? "wallet-outline" : "time-outline"}
                            size={24}
                            color={showHistory ? "white" : theme.colors.primary}
                        />
                    </TouchableOpacity>
                </View>

                {displayedTickets.length > 0 ? (
                    <FlatList
                        data={displayedTickets}
                        renderItem={renderTicketCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <Text style={styles.listHeader}>
                                {showHistory ? 'Past Tickets' : 'Active Passes'}
                            </Text>
                        }
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons
                                name={showHistory ? "time-outline" : "wallet-outline"}
                                size={60}
                                color={theme.colors.textLight}
                            />
                        </View>
                        <Text style={styles.emptyTitle}>
                            {showHistory ? 'No Past Tickets' : 'Your Wallet is Empty'}
                        </Text>
                        <Text style={styles.emptyText}>
                            {showHistory
                                ? 'Expired or used tickets will appear here.'
                                : 'Tickets you purchase will appear here.'}
                        </Text>
                        {!showHistory && (
                            <TouchableOpacity
                                style={styles.browseButton}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={styles.browseButtonText}>Browse Events</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </SafeAreaView>
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
    header: {
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        ...theme.typography.h1,
        color: theme.colors.textPrimary,
    },
    historyButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
    },
    historyButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    listContent: {
        padding: theme.spacing.l,
    },
    listHeader: {
        ...theme.typography.h3,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.m,
        textTransform: 'uppercase',
        fontSize: 14,
        letterSpacing: 1,
    },

    // Ticket Card
    ticketCardContainer: {
        marginBottom: theme.spacing.l,
        ...theme.shadows.medium,
    },
    ticketCard: {
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.l,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 180,
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.l,
    },
    ticketLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    ticketId: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    ticketBody: {
        flex: 1,
        justifyContent: 'center',
    },
    ticketRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.m,
    },
    ticketInfoItem: {
        flex: 1,
    },
    infoLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginBottom: 4,
    },
    infoValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoValue: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    totalAmount: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    ticketFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.s,
        opacity: 0.8,
    },
    tapText: {
        color: 'white',
        fontSize: 12,
        marginRight: 4,
    },

    // Empty State
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
        ...theme.shadows.small,
    },
    emptyTitle: {
        ...theme.typography.h2,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.s,
    },
    emptyText: {
        ...theme.typography.body,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    browseButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.m,
        borderRadius: theme.borderRadius.round,
        ...theme.shadows.medium,
    },
    browseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Guest Prompt
    guestPromptContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    guestPromptTitle: {
        ...theme.typography.h1,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.s,
    },
    guestPromptMessage: {
        ...theme.typography.body,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    authButtonsRow: {
        flexDirection: 'row',
        gap: theme.spacing.m,
    },
    authButton: {
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.borderRadius.m,
        minWidth: 130,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        ...theme.shadows.small,
    },
    signupButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupButtonText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: theme.spacing.m,
        fontSize: 16,
        color: theme.colors.textSecondary,
    },
});
