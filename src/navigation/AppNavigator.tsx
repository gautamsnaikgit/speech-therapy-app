import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { useAppTheme } from '../context/ThemeContext';
import { HomeScreen } from '../screens/HomeScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { BiofeedbackScreen } from '../screens/BiofeedbackScreen';
import { DashboardScreen } from '../screens/DashboardScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  const { mode, colors } = useAppTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.card,
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.cardBorder,
          },
          headerTitleStyle: {
            color: colors.textPrimary,
            fontWeight: '800',
            fontSize: 16,
          },
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.cardBorder,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: mode === 'kids' ? 'Home 🏠' : 'Overview',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
          }}
        />

        <Tab.Screen
          name="Practice"
          component={PracticeScreen}
          options={{
            title: mode === 'kids' ? 'Practice 🗣️' : 'Drills',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ color, fontSize: 18 }}>🗣️</Text>,
          }}
        />

        <Tab.Screen
          name="Biofeedback"
          component={BiofeedbackScreen}
          options={{
            title: mode === 'kids' ? 'Recorder 🎙️' : 'Biofeedback',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ color, fontSize: 18 }}>🎙️</Text>,
          }}
        />

        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: mode === 'kids' ? 'Rewards 🌟' : 'Analytics',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ color, fontSize: 18 }}>📊</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
