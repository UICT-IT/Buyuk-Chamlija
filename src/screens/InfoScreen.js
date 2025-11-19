import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function InfoScreen({ faqs }) {
    const [expandedId, setExpandedId] = useState(null);

    const globalFaqs = faqs.filter(f => f.type === 'global');
    const specificFaqs = faqs.filter(f => f.type === 'specific');

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const renderFaqItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.questionRow}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                    name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="gray"
                />
            </View>
            {expandedId === item.id && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Information & FAQ</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>General Information</Text>
                    {globalFaqs.map(renderFaqItem)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Festival Specifics</Text>
                    {specificFaqs.map(renderFaqItem)}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: 'tomato',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        marginRight: 10,
    },
    answerContainer: {
        padding: 15,
        paddingTop: 0,
        backgroundColor: '#fafafa',
    },
    answerText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
});
