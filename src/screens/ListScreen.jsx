/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import notFoundImage from "../assets/notfound.png";
import Toast from 'react-native-toast-message';

const ListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [openSwipeableId, setOpenSwipeableId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
        };

        const unsubscribe = navigation.addListener('focus', fetchTasks);
        return unsubscribe;
    }, [navigation]);

    const handleCloseSwipe = () => {
        setOpenSwipeableId(null);
    };

    const handleDelete = async (taskId) => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            let tasks = [];
            if (storedTasks) {
                tasks = JSON.parse(storedTasks);
                tasks = tasks.filter(t => t.id !== taskId);
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
                setTasks(tasks);  // Update state after deletion
                Toast.show({
                    type: 'success',
                    text1: 'Task Deleted',
                    text2: 'The task has been successfully deleted.'
                });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <View style={styles.container}>
            {
                tasks.length > 0
                    ? (<FlatList
                        data={tasks}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onPress={() => navigation.navigate('Detail', { task: item })}
                                onCloseSwipe={handleCloseSwipe}
                                isOpen={item.id === openSwipeableId}
                                onDelete={() => handleDelete(item.id)}  
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        style={{ marginTop: 16 }}
                    />)
                    : <Image source={notFoundImage} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 200 }} />
            }
            <TouchableOpacity onPress={() => navigation.navigate('Create')} style={styles.saveButton}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Create Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    saveButton: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 50,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#000',
    },
});

export default ListScreen;
