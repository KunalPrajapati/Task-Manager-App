/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const DetailScreen = ({ route, navigation }) => {
    const { task } = route.params;

    const handleDelete = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks = JSON.parse(storedTasks).filter(t => t.id !== task.id);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        navigation.goBack();
        Toast.show({
            type: 'success',
            text1: 'Task Deleted',
            text2: 'The task has been successfully deleted.'
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Task Details</Text>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>Description: {task.description}</Text>
            <Text style={styles.description}>Due Date: {task.dueDate.slice(0, 10)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                <TouchableOpacity onPress={handleDelete} style={[styles.button, { backgroundColor: '#db393c' }]}>
                    <Text style={styles.buttonText}>Delete Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 18,
        marginBottom: 8,
    },
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        width: 150,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default DetailScreen;
