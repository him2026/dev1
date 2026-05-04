import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Mail, Lock, User, Calendar as CalendarIcon, Heart, ChevronRight, Hash } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-8 pt-8" showsVerticalScrollIndicator={false}>
          
          <View className="items-center mb-10">
            <View className="bg-primary-light w-16 h-16 rounded-[24px] items-center justify-center mb-4">
              <Heart size={32} color="#FF7096" fill="#FF7096" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 font-outfit mb-1">Create Account</Text>
            <Text className="text-gray-500 font-inter text-center">Join HIM and start your wellness journey</Text>
          </View>

          <View className="gap-y-6">
            {/* Full Name */}
            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <User size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-900 font-inter" placeholder="Your Name" value={name} onChangeText={setName} />
              </View>
            </View>

            {/* Email */}
            <View>
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <Mail size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-900 font-inter" placeholder="hello@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" />
              </View>
            </View>

            {/* Passwords */}
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Password</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                  <Lock size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" placeholder="Min 8" value={password} onChangeText={setPassword} secureTextEntry />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Confirm</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                  <Lock size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" placeholder="Confirm" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                </View>
              </View>
            </View>

            {/* DOB & Cycle Length */}
            <View className="flex-row gap-x-4">
              <TouchableOpacity 
                onPress={() => setShowDobPicker(true)}
                className="flex-1"
              >
                <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Date of Birth</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                  <CalendarIcon size={18} color="#9CA3AF" />
                  <Text className="ml-3 text-gray-900 font-inter text-xs">{dob.toLocaleDateString()}</Text>
                </View>
              </TouchableOpacity>
              
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Cycle Length</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                  <Hash size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value={cycleLength} onChangeText={setCycleLength} keyboardType="numeric" />
                </View>
              </View>
            </View>

            {/* Last Period */}
            <TouchableOpacity 
              onPress={() => setShowPeriodPicker(true)}
              className="mb-4"
            >
              <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Last Period Start Date</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <Droplet size={18} color="#FF7096" />
                <Text className="ml-3 text-gray-900 font-inter">{lastPeriod.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-primary p-6 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-primary/30">
              <Text className="text-white font-bold text-lg font-outfit mr-2">Create Account</Text>
              <ChevronRight size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-10 mb-12">
            <Text className="text-gray-500 font-inter">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text className="text-primary font-bold font-inter">Sign In</Text>
            </TouchableOpacity>
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
