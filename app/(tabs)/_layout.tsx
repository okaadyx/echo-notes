import { Home, Library } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4f46e5', // EchoNotes Blue
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '$background',
          borderTopWidth: 0,
          elevation: 0,
        }

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <Library size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
