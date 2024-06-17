/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';
import CreateScreen from './src/screens/CreateScreen';
import Splash from './src/screens/SplashScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="List" component={ListScreen} options={{ title: 'Task List', headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Task Details' }} />
          <Stack.Screen name="Create" component={CreateScreen} options={{ title: 'Create Task' }} />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


export default App;
