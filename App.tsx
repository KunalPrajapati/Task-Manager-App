/* eslint-disable prettier/prettier */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { create } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import Splash from './src/screens/SplashScreen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    {/* <Stack.Navigator initialRouteName="List"> */}
    <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Task List' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Task Details' }} />
      <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create Task' }} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


export default App;
