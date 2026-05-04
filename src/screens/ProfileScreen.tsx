import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { User, Mail, Calendar, Hash, Bell, Palette, Trash2, ChevronRight, LogOut } from 'lucide-react-native';

const themes = [
  { name: 'Blossom', color1: '#FF7096', color2: '#B19CD9' },
  { name: 'Pookie', color1: '#FFB3C6', color2: '#FFC8DD' },
  { name: 'Lavender', color1: '#9B72CF', color2: '#C9A8E8' },
  { name: 'Mint', color1: '#10B981', color2: '#6EE7B7' },
  { name: 'Ocean', color1: '#0EA5E9', color2: '#38BDF8' },
  { name: 'Dark Night', color1: '#1A1030', color2: '#FF7096' },
];

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('Blossom');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-primary-light rounded-[40px] items-center justify-center mb-4 border-4 border-white shadow-sm">
            <User size={48} color="#FF7096" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 font-outfit">Test User</Text>
          <Text className="text-gray-400 font-inter text-sm">Member since May 2026</Text>
        </View>

        {/* Personal Info */}
        <View className="mb-10">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6">Personal Information</Text>
          
          <View className="gap-y-6">
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <User size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value="Test User" />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <Mail size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-400 font-inter" value="test@example.com" editable={false} />
              </View>
            </View>

            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Cycle Length</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                  <Hash size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value="28" keyboardType="numeric" />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Period Length</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                  <Hash size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value="5" keyboardType="numeric" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View className="mb-10">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6">Preferences</Text>
          
          <View className="bg-gray-50 border border-gray-100 rounded-[32px] p-6 gap-y-6">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="bg-blue-50 p-2 rounded-xl mr-3">
                  <Bell size={20} color="#3B82F6" />
                </View>
                <Text className="font-bold text-gray-900 font-inter">Notifications</Text>
              </View>
              <Switch 
                value={notifications} 
                onValueChange={setNotifications} 
                trackColor={{ false: '#D1D5DB', true: '#FF7096' }}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="bg-purple-50 p-2 rounded-xl mr-3">
                  <Palette size={20} color="#9B72CF" />
                </View>
                <Text className="font-bold text-gray-900 font-inter">Theme</Text>
              </View>
              <Text className="text-gray-400 font-bold text-sm">{selectedTheme}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
              {themes.map((t) => (
                <TouchableOpacity 
                  key={t.name}
                  onPress={() => setSelectedTheme(t.name)}
                  className={`w-12 h-12 rounded-full mr-4 border-4 ${selectedTheme === t.name ? 'border-primary' : 'border-white'} shadow-sm`}
                  style={{ backgroundColor: t.color1 }}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Account Actions */}
        <View className="mb-12">
          <TouchableOpacity className="flex-row items-center justify-between bg-white border border-gray-100 p-6 rounded-3xl mb-4 shadow-sm">
            <View className="flex-row items-center">
              <LogOut size={20} color="#6B7280" />
              <Text className="ml-3 font-bold text-gray-700 font-inter">Sign Out</Text>
            </View>
            <ChevronRight size={20} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between bg-red-50 border border-red-100 p-6 rounded-3xl">
            <View className="flex-row items-center">
              <Trash2 size={20} color="#EF4444" />
              <Text className="ml-3 font-bold text-red-500 font-inter">Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
