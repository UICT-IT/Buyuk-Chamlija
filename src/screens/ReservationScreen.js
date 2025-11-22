import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Image,
    Modal,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { stalls } from '../data/mockData';

export default function ReservationScreen({ route }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: new Date(),
        time: new Date(),
        guests: '',
        requests: '',
        stallId: null,
    });

    // Effect to handle stallId passed from navigation
    useEffect(() => {
        if (route?.params?.stallId) {
            setFormData(prev => ({ ...prev, stallId: route.params.stallId }));
        }
    }, [route?.params?.stallId]);
    const [isStallModalVisible, setIsStallModalVisible] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleStallSelect = (id) => {
        setFormData({ ...formData, stallId: id });
        setIsStallModalVisible(false);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.date;
        setShowDatePicker(Platform.OS === 'ios');
        setFormData({ ...formData, date: currentDate });
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || formData.time;
        setShowTimePicker(Platform.OS === 'ios');
        setFormData({ ...formData, time: currentTime });
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.time || !formData.guests || !formData.stallId) {
            Alert.alert('Missing Information', 'Please fill in all required fields, including selecting a stall.');
            return;
        }

        const selectedStall = stalls.find(s => s.id === formData.stallId);
        const formattedDate = formData.date.toLocaleDateString();
        const formattedTime = formData.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Here you would typically send the data to a backend
        console.log('Reservation Details:', { ...formData, date: formattedDate, time: formattedTime });
        Alert.alert(
            'Reservation Received',
            `Thank you, ${formData.name}! Your reservation at ${selectedStall?.name} for ${formData.guests} people on ${formattedDate} at ${formattedTime} has been requested. We will confirm shortly.`
        );

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: new Date(),
            time: new Date(),
            guests: '',
            requests: '',
            stallId: null,
        });
    };

    const selectedStall = stalls.find(s => s.id === formData.stallId);

    const renderStallItem = ({ item }) => (
        <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleStallSelect(item.id)}
        >
            <Image source={item.image} style={styles.modalItemImage} />
            <Text style={styles.modalItemText}>{item.name}</Text>
            {formData.stallId === item.id && (
                <Ionicons name="checkmark" size={24} color="tomato" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Table Reservation</Text>
                        <Text style={styles.headerSubtitle}>Book your spot at our restaurant</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Select a Stall *</Text>
                            <TouchableOpacity
                                style={styles.dropdownTrigger}
                                onPress={() => setIsStallModalVisible(true)}
                            >
                                <Text style={[styles.dropdownText, !selectedStall && styles.placeholderText]}>
                                    {selectedStall ? selectedStall.name : 'Choose a stall...'}
                                </Text>
                                <Ionicons name="chevron-down" size={20} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name *</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color="gray" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChangeText={(text) => handleInputChange('name', text)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address *</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="john@example.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number *</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="call-outline" size={20} color="gray" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+1 234 567 8900"
                                    keyboardType="phone-pad"
                                    value={formData.phone}
                                    onChangeText={(text) => handleInputChange('phone', text)}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, styles.halfWidth]}>
                                <Text style={styles.label}>Date *</Text>
                                <TouchableOpacity style={styles.inputWrapper} onPress={showDatepicker}>
                                    <Ionicons name="calendar-outline" size={20} color="gray" style={styles.icon} />
                                    <Text style={styles.input}>
                                        {formData.date.toLocaleDateString()}
                                    </Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={formData.date}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onDateChange}
                                        minimumDate={new Date()}
                                    />
                                )}
                            </View>

                            <View style={[styles.inputGroup, styles.halfWidth]}>
                                <Text style={styles.label}>Time *</Text>
                                <TouchableOpacity style={styles.inputWrapper} onPress={showTimepicker}>
                                    <Ionicons name="time-outline" size={20} color="gray" style={styles.icon} />
                                    <Text style={styles.input}>
                                        {formData.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </TouchableOpacity>
                                {showTimePicker && (
                                    <DateTimePicker
                                        testID="timePicker"
                                        value={formData.time}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={onTimeChange}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Number of Guests *</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="people-outline" size={20} color="gray" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="2"
                                    keyboardType="numeric"
                                    value={formData.guests}
                                    onChangeText={(text) => handleInputChange('guests', text)}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Special Requests</Text>
                            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Any allergies or special occasions?"
                                    multiline
                                    numberOfLines={4}
                                    value={formData.requests}
                                    onChangeText={(text) => handleInputChange('requests', text)}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Reserve Now</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Stall Selection Modal */}
            <Modal
                visible={isStallModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsStallModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select a Stall</Text>
                            <TouchableOpacity onPress={() => setIsStallModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={stalls}
                            renderItem={renderStallItem}
                            keyExtractor={item => item.id}
                            contentContainerStyle={styles.modalList}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfWidth: {
        width: '48%',
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
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 12,
        height: 50,
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    placeholderText: {
        color: '#999',
    },
    textAreaWrapper: {
        height: 100,
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        height: '100%',
    },
    submitButton: {
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
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalList: {
        padding: 20,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalItemImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
});
