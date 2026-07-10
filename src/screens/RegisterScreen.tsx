import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Mail, Lock, User, Calendar as CalendarIcon, Heart, ChevronRight, Hash, Droplet, Sparkles } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { Alert, ActivityIndicator } from 'react-native';
import { useResponsive } from '../hooks/useResponsive';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [lastPeriod, setLastPeriod] = useState(new Date());
  const [cycleLength, setCycleLength] = useState('28');
  
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showPeriodPicker, setShowPeriodPicker] = useState(false);
  const { register, loading } = useAuth();
  const { maxContentWidth } = useResponsive();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const { error } = await register(
      name,
      email,
      password,
      dob.toISOString().split('T')[0],
      parseInt(cycleLength) || 28,
      lastPeriod.toISOString().split('T')[0]
    );
    if (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false}>
          <View style={{ maxWidth: 480, width: '100%', alignSelf: 'center', paddingVertical: 20 }}>
          
          <Animated.View entering={FadeInDown.duration(800)} className="items-center mt-12 mb-12">
            <View className="bg-white p-5 rounded-4xl shadow-soft border border-white mb-6">
              <Heart size={36} color="#8B004A" fill="#8B004A" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 font-outfit tracking-tighter mb-1">Create Account</Text>
            <Text className="text-gray-500 font-inter text-center">Your wellness journey starts here</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200).duration(800)} className="gap-y-6">
            {/* Full Name */}
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Full Name</Text>
              <View className="flex-row items-center bg-white border border-white rounded-4xl px-6 py-4 shadow-soft">
                <User size={20} color="#8B004A" opacity={0.6} />
                <TextInput className="flex-1 ml-4 text-gray-900 font-inter" placeholder="Your Name" value={name} onChangeText={setName} />
              </View>
            </View>

            {/* Email */}
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Email Address</Text>
              <View className="flex-row items-center bg-white border border-white rounded-4xl px-6 py-4 shadow-soft">
                <Mail size={20} color="#8B004A" opacity={0.6} />
                <TextInput className="flex-1 ml-4 text-gray-900 font-inter" placeholder="hello@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
              </View>
            </View>

            {/* Passwords Row */}
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Password</Text>
                <View className="flex-row items-center bg-white border border-white rounded-4xl px-5 py-4 shadow-soft">
                  <Lock size={18} color="#8B004A" opacity={0.6} />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" placeholder="Min 8" value={password} onChangeText={setPassword} secureTextEntry />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Confirm</Text>
                <View className="flex-row items-center bg-white border border-white rounded-4xl px-5 py-4 shadow-soft">
                  <Lock size={18} color="#8B004A" opacity={0.6} />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" placeholder="Confirm" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                </View>
              </View>
            </View>

            {/* DOB & Cycle Length Row */}
            <View className="flex-row gap-x-4">
              <TouchableOpacity 
                onPress={() => setShowDobPicker(true)}
                className="flex-1"
              >
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Birth Date</Text>
                <View className="flex-row items-center bg-white border border-white rounded-4xl px-5 py-4 shadow-soft">
                  <CalendarIcon size={18} color="#8B004A" opacity={0.6} />
                  <Text className="ml-3 text-gray-900 font-inter">{dob.toLocaleDateString()}</Text>
                </View>
              </TouchableOpacity>
              
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Cycle (Days)</Text>
                <View className="flex-row items-center bg-white border border-white rounded-4xl px-5 py-4 shadow-soft">
                  <Hash size={18} color="#8B004A" opacity={0.6} />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value={cycleLength} onChangeText={setCycleLength} keyboardType="numeric" />
                </View>
              </View>
            </View>

            {/* Last Period */}
            <TouchableOpacity 
              onPress={() => setShowPeriodPicker(true)}
              className="mb-4"
            >
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-2">Last Period Start</Text>
              <View className="flex-row items-center bg-white border border-white rounded-4xl px-6 py-4 shadow-soft">
                <Droplet size={20} color="#8B004A" />
                <Text className="ml-4 text-gray-900 font-inter font-bold">{lastPeriod.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleRegister}
              disabled={loading}
              className="bg-primary p-7 rounded-4xl flex-row items-center justify-center shadow-premium mt-2"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text className="text-white font-bold text-xl font-outfit mr-2">Create Account</Text>
                  <ChevronRight size={24} color="white" />
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View className="flex-row justify-center mt-12 mb-16">
            <Text className="text-gray-500 font-inter">Already a member? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text className="text-primary font-bold font-inter">Sign In</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Pickers */}
      {showDobPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          onChange={(e, date) => {
            setShowDobPicker(false);
            if (date) setDob(date);
          }}
        />
      )}
      {showPeriodPicker && (
        <DateTimePicker
          value={lastPeriod}
          mode="date"
          onChange={(e, date) => {
            setShowPeriodPicker(false);
            if (date) setLastPeriod(date);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default RegisterScreen;
