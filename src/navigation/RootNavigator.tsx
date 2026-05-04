import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import LandingScreen from '../screens/LandingScreen';
import LogPeriodScreen from '../screens/LogPeriodScreen';
import InsightsScreen from '../screens/InsightsScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PartnerModeScreen from '../screens/PartnerModeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AudioLibraryScreen from '../screens/AudioLibraryScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="LogPeriod" component={LogPeriodScreen} />
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PartnerMode" component={PartnerModeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="AudioLibrary" component={AudioLibraryScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
