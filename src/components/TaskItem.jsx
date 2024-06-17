/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TaskItem = ({ task, onPress, onDelete }) => {
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      await onDelete(); 
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task. Please try again.');
    }
  };

  const leftSwipe = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity
        style={{
          backgroundColor: '#db393c',
          height: 110,
          width: 100,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={handleDelete}>
        <View>
          <Image
            source={require('../assets/delete.png')}
            style={{
              width: 30,
              height: 40,
              tintColor: '#fff'
            }}
          />
        </View>
      </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <SafeAreaView>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.title}>{task.title.slice(0, 30)}</Text>
            <Text style={styles.description}>{task.description.slice(0, 30) + '....'}</Text>
            <Text style={{ marginTop: 5, color: '#db393c' }}>Due Date: {task.dueDate.slice(0, 10)}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#c7c8c9',
    borderRadius: 10,
    marginBottom: 10,
    height: 110
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    color: '#666'
  }
});

export default TaskItem;
