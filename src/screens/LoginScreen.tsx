import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Heart } from 'lucide-react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-8 justify-center"
      >
        <View className="items-center mb-12">
          <View className="bg-primary-light w-20 h-20 rounded-[30px] items-center justify-center mb-6">
            <Heart size={40} color="#FF7096" fill="#FF7096" />
          </View>
          <Text className="text-4xl font-bold text-gray-900 font-outfit mb-2">Welcome Back</Text>
          <Text className="text-gray-500 font-inter text-center px-4">
            Sign in to continue your journey with your intelligent mate.
          </Text>
        </View>

        <View className="gap-y-6">
          <View>
            <Text className="text-sm font-bold text-gray-900 font-outfit mb-2 ml-1">Email Address</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-[24px] px-6 py-4">
              <Mail size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-4 text-gray-900 font-inter"
                placeholder="hello@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text className="text-sm font-bold text-gray-900 font-outfit mb-2 ml-1">Password</Text>
            <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-[24px] px-6 py-4">
              <Lock size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-4 text-gray-900 font-inter"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity className="self-end mr-2">
            <Text className="text-primary font-bold text-sm font-inter">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary p-6 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-primary/30 mt-4">
            <Text className="text-white font-bold text-lg font-outfit mr-2">Sign In</Text>
            <ChevronRight size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-500 font-inter">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold font-inter">Sign Up</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
