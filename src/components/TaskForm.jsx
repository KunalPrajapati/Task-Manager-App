/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const TaskForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [dueDate, setDueDate] = useState(initialData ? new Date(initialData.dueDate) : new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }
    onSubmit({ title, description, dueDate: dueDate.toISOString() });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: 60,  }]}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 70,  }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <Text style={styles.dateInput}>
          {dueDate ? dueDate.toDateString() : 'Select Due Date'}
        </Text>
      </TouchableOpacity>
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <CalendarPicker 
              onDateChange={handleDateChange} 
              selectedStartDate={dueDate}
              minDate={new Date()}
            />
            <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.saveButton}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
  },
  dateInput: {
    marginBottom: 16,
    padding: 8,
    borderColor: '#ccc',
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 16,
    width: 200,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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

export default TaskForm;

