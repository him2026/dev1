import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Dimensions } from 'react-native';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Heart, Sparkles } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { Alert, ActivityIndicator } from 'react-native';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const { error } = await login(email, password);
    if (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      {/* Decorative Glow */}
      <View className="absolute top-[-50] left-[-50] w-64 h-64 bg-primary/5 rounded-full blur-[60px]" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-8"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 40 }}>
          <View style={{ maxWidth: 480, width: '100%', alignSelf: 'center' }}>
          
          <Animated.View entering={FadeInDown.duration(800)} className="items-center mb-16">
            <View className="bg-white p-6 rounded-5xl shadow-soft border border-white mb-8">
              <Heart size={48} color="#8B004A" fill="#8B004A" />
              <View className="absolute top-2 right-2">
                <Sparkles size={16} color="#D4AF37" />
              </View>
            </View>
            <Text className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter mb-3">Welcome Back</Text>
            <Text className="text-gray-500 font-inter text-center leading-6 px-6">
              Step back into your sacred space with your intelligent mate.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200).duration(800)} className="gap-y-6">
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Email Address</Text>
              <View className="flex-row items-center bg-white border border-white rounded-4xl px-7 py-5 shadow-soft">
                <Mail size={22} color="#8B004A" opacity={0.6} />
                <TextInput
                  className="flex-1 ml-4 text-gray-900 font-inter text-base"
                  placeholder="name@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Secure Password</Text>
              <View className="flex-row items-center bg-white border border-white rounded-4xl px-7 py-5 shadow-soft">
                <Lock size={22} color="#8B004A" opacity={0.6} />
                <TextInput
                  className="flex-1 ml-4 text-gray-900 font-inter text-base"
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                  {showPassword ? <EyeOff size={22} color="#9CA3AF" /> : <Eye size={22} color="#9CA3AF" />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="self-end px-2">
              <Text className="text-primary font-bold text-sm font-inter tracking-tight">Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleLogin}
              disabled={loading}
              className="bg-primary p-7 rounded-4xl flex-row items-center justify-center shadow-premium mt-4"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className="text-white font-bold text-xl font-outfit mr-2">Sign In</Text>
                  <ChevronRight size={24} color="white" />
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(800)} className="flex-row justify-center mt-12 pb-10">
            <Text className="text-gray-500 font-inter">New to HIM? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
              <Text className="text-primary font-bold font-inter">Create Account</Text>
            </TouchableOpacity>
          </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Added missing ScrollView import for better handling of different screen heights
import { ScrollView } from 'react-native';

export default LoginScreen;
