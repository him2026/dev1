import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { 
  Droplet, 
  MessageCircle, 
  Mic, 
  Smile, 
  Calendar, 
  Flame, 
  HeartPulse, 
  Lightbulb, 
  Star,
  ChevronRight
} from 'lucide-react-native';

// Mock data based on PHP logic
const mockUser = { name: 'Test' };
const mockPhase = { name: 'Menstrual Phase', color: '#E8567F', icon: 'droplet', description: 'Your body is shedding the uterine lining.' };
const mockDaysUntil = 26;
const mockStreak = 5;
const mockWellnessScore = 78;
const mockPoints = 1250;

const DashboardScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Welcome Banner */}
        <View className="bg-primary p-8 rounded-[32px] mb-8 shadow-lg shadow-primary/30">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-3xl font-bold font-outfit">Hi, {mockUser.name}!</Text>
              <Text className="text-white/80 text-sm font-inter mt-1">Here's your wellness overview</Text>
            </View>
            <View className="bg-white/20 p-3 rounded-2xl items-center">
              <Text className="text-white font-bold text-xl">{new Date().getDate()}</Text>
              <Text className="text-white text-xs font-semibold uppercase">{new Date().toLocaleString('default', { month: 'short' })}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
          <View className="w-[48%] bg-white border border-gray-100 p-5 rounded-3xl shadow-sm">
            <View className="w-10 h-10 rounded-xl items-center justify-center mb-3" style={{ backgroundColor: `${mockPhase.color}20` }}>
              <Droplet size={20} color={mockPhase.color} />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">{mockPhase.name}</Text>
            <Text className="text-[10px] text-gray-500 font-inter mt-1 leading-4">{mockPhase.description}</Text>
          </View>

          <View className="w-[48%] bg-white border border-gray-100 p-5 rounded-3xl shadow-sm">
            <View className="w-10 h-10 rounded-xl items-center justify-center mb-3 bg-primary-light">
              <Calendar size={20} color="#FF7096" />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">{mockDaysUntil} days</Text>
            <Text className="text-[10px] text-gray-500 font-inter mt-1">Until next period</Text>
          </View>

          <View className="w-[48%] bg-white border border-gray-100 p-5 rounded-3xl shadow-sm">
            <View className="w-10 h-10 rounded-xl items-center justify-center mb-3 bg-orange-50">
              <Flame size={20} color="#F4A261" />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">{mockStreak} days</Text>
            <Text className="text-[10px] text-gray-500 font-inter mt-1">Logging streak</Text>
          </View>

          <View className="w-[48%] bg-white border border-gray-100 p-5 rounded-3xl shadow-sm">
            <View className="w-10 h-10 rounded-xl items-center justify-center mb-3 bg-mint">
              <HeartPulse size={20} color="#7CB69E" />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">{mockWellnessScore}/100</Text>
            <Text className="text-[10px] text-gray-500 font-inter mt-1">Wellness score</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text className="text-xl font-bold text-gray-900 font-outfit mb-4">Quick Actions</Text>
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity className="items-center w-[22%]">
            <View className="w-14 h-14 bg-red-50 rounded-2xl items-center justify-center mb-2">
              <Droplet size={24} color="#EF4444" />
            </View>
            <Text className="text-[10px] font-bold text-gray-600">Log Period</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[22%]">
            <View className="w-14 h-14 bg-purple-50 rounded-2xl items-center justify-center mb-2">
              <MessageCircle size={24} color="#9B8EC0" />
            </View>
            <Text className="text-[10px] font-bold text-gray-600">Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[22%]">
            <View className="w-14 h-14 bg-pink-50 rounded-2xl items-center justify-center mb-2">
              <Mic size={24} color="#FF7096" />
            </View>
            <Text className="text-[10px] font-bold text-gray-600">Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center w-[22%]">
            <View className="w-14 h-14 bg-yellow-50 rounded-2xl items-center justify-center mb-2">
              <Smile size={24} color="#F4A261" />
            </View>
            <Text className="text-[10px] font-bold text-gray-600">Mood</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Tip */}
        <View className="bg-orange-50/50 border border-orange-100 p-6 rounded-[32px] mb-8">
          <View className="flex-row items-center mb-3">
            <Lightbulb size={20} color="#F4A261" />
            <Text className="text-sm font-bold text-orange-700 ml-2 font-outfit uppercase tracking-widest">Today's Tip</Text>
          </View>
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-2">Stay Hydrated</Text>
          <Text className="text-sm text-gray-600 leading-6 font-inter">Drinking enough water during your period helps reduce bloating and fatigue. Aim for 8-10 glasses today.</Text>
        </View>

        {/* Progress */}
        <View className="bg-white border border-gray-100 p-6 rounded-[32px] mb-12 flex-row justify-between items-center shadow-sm">
          <View className="flex-row items-center">
            <View className="bg-yellow-100 p-3 rounded-2xl mr-4">
              <Star size={24} color="#F4A261" />
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-900 font-outfit">{mockPoints} Points</Text>
              <Text className="text-xs text-gray-500 font-inter">Keep going for a new badge!</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-gray-50 p-3 rounded-xl">
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
