import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import NPKTest from '../screens/NPKTest';
import Advisory from '../screens/Advisory';
import FarmMap from '../screens/FarmMap';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') iconName = 'view-dashboard';
            else if (route.name === 'NPK Test') iconName = 'flask';
            else if (route.name === 'Advisory') iconName = 'book-open-page-variant';
            else if (route.name === 'Farm Map') iconName = 'map';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="NPK Test" component={NPKTest} />
        <Tab.Screen name="Advisory" component={Advisory} />
        <Tab.Screen name="Farm Map" component={FarmMap} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
