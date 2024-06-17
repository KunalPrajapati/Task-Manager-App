/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreateScreen = () => {
  const navigation = useNavigation();

  const handleSubmit = async (task) => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    task.id = Date.now().toString();
    tasks.push(task);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CreateScreen;
