/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const CreateScreen = () => {
  const navigation = useNavigation();

  const handleSubmit = async (task) => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      let tasks = [];

      if (storedTasks) {
        try {
          tasks = JSON.parse(storedTasks);

          if (!Array.isArray(tasks)) {
            tasks = [];
          }
        } catch (error) {
          tasks = [];
        }
      }

      task.id = Date.now().toString();
      const updatedTasks = [...tasks, task];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Task Created',
        text2: 'The task has been successfully created.'
      });
    } catch (error) {
      console.error('Error creating task:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create task. Please try again.'
      });
    }
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
