import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Mail, ChevronLeft, Heart, CheckCircle } from 'lucide-react-native';
import { resetPassword } from '../services/auth';
import { useResponsive } from '../hooks/useResponsive';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { maxContentWidth } = useResponsive();

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-8 justify-center"
      >
        <View style={{ maxWidth: 480, width: '100%', alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity 
          onPress={() => navigation?.goBack()} 
          className="absolute top-14 left-6 p-2"
        >
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <Animated.View entering={FadeInDown.duration(800)} className="items-center mb-12">
          <View className="bg-primary-light w-20 h-20 rounded-[30px] items-center justify-center mb-6">
            <Heart size={40} color="#FF7096" fill="#FF7096" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 font-outfit mb-2">Forgot Password</Text>
          <Text className="text-gray-500 font-inter text-center px-4">
            Enter your email and we'll send you a reset link
          </Text>
        </Animated.View>

        {sent ? (
          <Animated.View entering={FadeInUp.delay(200).duration(800)} className="bg-green-50 p-8 rounded-[40px] items-center">
            <CheckCircle size={48} color="#10B981" />
            <Text className="text-sm font-bold text-green-800 font-inter text-center mt-4 leading-6">
              If that email exists in our system, a reset link has been sent. Check your inbox.
            </Text>
            <TouchableOpacity 
              onPress={() => navigation?.navigate('Login')}
              className="mt-8 bg-green-500 px-10 py-4 rounded-2xl"
            >
              <Text className="text-white font-bold font-outfit">Back to Login</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp.delay(200).duration(800)} className="gap-y-6">
            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <Mail size={18} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900 font-inter"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleReset}
              disabled={loading}
              className="bg-primary p-6 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-primary/30 mt-2"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg ml-2 font-outfit">Send Reset Link</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
