import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, Book, MessageSquare, User } from 'lucide-react-native';

import DashboardScreen from '../screens/DashboardScreen';
import CycleTrackerScreen from '../screens/CycleTrackerScreen';
import WellnessScreen from '../screens/WellnessScreen';
import MoodJournalScreen from '../screens/MoodJournalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GamesScreen from '../screens/GamesScreen';
import InsightsScreen from '../screens/InsightsScreen';
import LogPeriodScreen from '../screens/LogPeriodScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: '#FF7096',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 10,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Tracker" 
        component={CycleTrackerScreen} 
        options={{
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Journal" 
        component={MoodJournalScreen} 
        options={{
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Wellness" 
        component={WellnessScreen} 
        options={{
          tabBarIcon: ({ color }) => <Book size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Games" 
        component={GamesScreen} 
        options={{
          tabBarIcon: ({ color }) => <Gamepad size={24} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
