/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;

  const handleSubmit = (updatedTask) => {
    console.log('Updated Task:', updatedTask);
    // Navigate back to DetailScreen after editing
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} initialData={task} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EditTaskScreen;
