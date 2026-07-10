import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
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
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2EFE7' }}>
        <ActivityIndicator size="large" color="#8B004A" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: { animation: 'spring', config: { damping: 20, stiffness: 200, mass: 0.8 } },
          close: { animation: 'spring', config: { damping: 20, stiffness: 200, mass: 0.8 } },
        },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter }} />
          <Stack.Screen name="LogPeriod" component={LogPeriodScreen} />
          <Stack.Screen name="Insights" component={InsightsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
          <Stack.Screen name="PartnerMode" component={PartnerModeScreen} />
          <Stack.Screen name="AudioLibrary" component={AudioLibraryScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
