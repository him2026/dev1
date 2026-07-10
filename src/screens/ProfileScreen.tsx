import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Switch, Alert, ActivityIndicator } from 'react-native';
import { User, Mail, Calendar, Hash, Bell, Palette, Trash2, ChevronRight, LogOut } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile, deleteAccount } from '../services/api';
import { useResponsive } from '../hooks/useResponsive';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const themes = [
  { name: 'Blossom', color1: '#FF7096', color2: '#B19CD9' },
  { name: 'Pookie', color1: '#FFB3C6', color2: '#FFC8DD' },
  { name: 'Lavender', color1: '#9B72CF', color2: '#C9A8E8' },
  { name: 'Mint', color1: '#10B981', color2: '#6EE7B7' },
  { name: 'Ocean', color1: '#0EA5E9', color2: '#38BDF8' },
  { name: 'Dark Night', color1: '#1A1030', color2: '#FF7096' },
];

const ProfileScreen = () => {
  const { user, logout, updateUserContext } = useAuth();
  const [notifications, setNotifications] = useState(user?.notifications_enabled ?? true);
  const [selectedTheme, setSelectedTheme] = useState(user?.theme || 'Blossom');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [loading, setLoading] = useState(true);
  const { maxContentWidth, contentPadding, isDesktop } = useResponsive();

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { cycleSettings } = await getProfile(user!.id);
      setCycleLength(cycleSettings.avg_cycle_length.toString());
      setPeriodLength(cycleSettings.avg_period_length.toString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleDelete = () => {
    Alert.alert('Delete Account', 'Are you sure? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        if (user) {
          try {
            await deleteAccount(user.id);
            await logout();
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        }
      }}
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#FF7096" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-10">
          <View className="w-24 h-24 bg-primary-light rounded-[40px] items-center justify-center mb-4 border-4 border-white shadow-sm">
            <User size={48} color="#FF7096" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 font-outfit">{user?.full_name}</Text>
          <Text className="text-gray-400 font-inter text-sm">Member since {new Date(user?.created_at || '').toLocaleDateString()}</Text>
        </Animated.View>

        {/* Personal Info */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} className="mb-10">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6">Personal Information</Text>
          
          <View className="gap-y-6">
            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <User size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value={user?.full_name} editable={false} />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                <Mail size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-400 font-inter" value={user?.email} editable={false} />
              </View>
            </View>

            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Cycle Length</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                  <Hash size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value={cycleLength} editable={false} />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Period Length</Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4">
                  <Hash size={18} color="#9CA3AF" />
                  <TextInput className="flex-1 ml-3 text-gray-900 font-inter" value={periodLength} editable={false} />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Preferences */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} className="mb-10">
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
                onValueChange={async (val) => {
                  setNotifications(val);
                  await updateProfile(user!.id, { notifications_enabled: val });
                  updateUserContext({ notifications_enabled: val });
                }} 
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
                  onPress={async () => {
                    setSelectedTheme(t.name);
                    await updateProfile(user!.id, { theme: t.name });
                    updateUserContext({ theme: t.name });
                  }}
                  className={`w-12 h-12 rounded-full mr-4 border-4 ${selectedTheme === t.name ? 'border-primary' : 'border-white'} shadow-sm`}
                  style={{ backgroundColor: t.color1 }}
                />
              ))}
            </ScrollView>
          </View>
        </Animated.View>

        {/* Account Actions */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} className="mb-12">
          <TouchableOpacity onPress={handleLogout} className="flex-row items-center justify-between bg-white border border-gray-100 p-6 rounded-3xl mb-4 shadow-sm">
            <View className="flex-row items-center">
              <LogOut size={20} color="#6B7280" />
              <Text className="ml-3 font-bold text-gray-700 font-inter">Sign Out</Text>
            </View>
            <ChevronRight size={20} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} className="flex-row items-center justify-between bg-red-50 border border-red-100 p-6 rounded-3xl">
            <View className="flex-row items-center">
              <Trash2 size={20} color="#EF4444" />
              <Text className="ml-3 font-bold text-red-500 font-inter">Delete Account</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
