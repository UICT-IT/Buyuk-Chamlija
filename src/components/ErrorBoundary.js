import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details to console
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReload = () => {
        // Reset the error boundary state
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <View style={styles.container}>
                    <Ionicons name="warning-outline" size={80} color="tomato" />
                    <Text style={styles.title}>Oops! Something went wrong</Text>
                    <Text style={styles.message}>
                        The app encountered an unexpected error. Please try reloading.
                    </Text>

                    {__DEV__ && this.state.error && (
                        <View style={styles.errorDetails}>
                            <Text style={styles.errorTitle}>Error Details (Dev Mode):</Text>
                            <Text style={styles.errorText}>{this.state.error.toString()}</Text>
                            {this.state.errorInfo && (
                                <Text style={styles.errorStack}>
                                    {this.state.errorInfo.componentStack}
                                </Text>
                            )}
                        </View>
                    )}

                    <TouchableOpacity style={styles.reloadButton} onPress={this.handleReload}>
                        <Ionicons name="refresh" size={24} color="white" />
                        <Text style={styles.reloadButtonText}>Reload App</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    errorDetails: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        maxWidth: '100%',
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    errorTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    errorText: {
        fontSize: 12,
        color: '#d32f2f',
        fontFamily: 'monospace',
        marginBottom: 8,
    },
    errorStack: {
        fontSize: 10,
        color: '#666',
        fontFamily: 'monospace',
    },
    reloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'tomato',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        gap: 8,
    },
    reloadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ErrorBoundary;
