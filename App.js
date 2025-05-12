import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ProfileSelectionScreen from './screens/ProfileSelectionScreen';
import HomeScreen from './screens/HomeScreen';
import LogsScreen from './screens/LogsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainDrawer({ navigation }) {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }} // Desactiva la barra superior del Drawer
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Logs" component={LogsScreen} />
      <Drawer.Screen
        name="Salir"
        component={() => null} // No renderiza una pantalla, solo maneja la acción
        listeners={{
          focus: () => handleLogout(), // Ejecuta logout al enfocarse en "Salir"
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}