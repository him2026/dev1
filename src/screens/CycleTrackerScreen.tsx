import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Droplet, Plus, Info, ChevronRight, BarChart2, TrendingUp } from 'lucide-react-native';

const mockPhase = { name: 'Menstrual Phase', color: '#E8567F', icon: 'droplet', description: 'Your body is shedding the uterine lining. Take it easy.' };
const mockDaysUntil = 26;

const CycleTrackerScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Phase Banner */}
        <View className="p-6 rounded-[32px] mb-8 flex-row justify-between items-center" style={{ backgroundColor: `${mockPhase.color}15` }}>
          <View className="flex-1 pr-4">
            <View className="flex-row items-center mb-2">
              <Droplet size={16} color={mockPhase.color} />
              <Text className="text-sm font-bold ml-2 uppercase tracking-widest" style={{ color: mockPhase.color }}>{mockPhase.name}</Text>
            </View>
            <Text className="text-gray-600 text-xs font-inter leading-4">{mockPhase.description}</Text>
          </View>
          <View className="items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
            <Text className="text-2xl font-bold text-gray-900 font-outfit">{mockDaysUntil}</Text>
            <Text className="text-[10px] text-gray-400 font-bold text-center">Days until{'\n'}period</Text>
          </View>
        </View>

        {/* Calendar */}
        <View className="bg-white border border-gray-100 p-4 rounded-[32px] mb-8 shadow-sm">
          <RNCalendar
            theme={{
              todayTextColor: '#FF7096',
              arrowColor: '#FF7096',
              monthTextColor: '#1A1A1A',
              textMonthFontFamily: 'Outfit',
              textMonthFontWeight: 'bold',
              textDayFontFamily: 'Inter',
              textDayHeaderFontFamily: 'Inter',
              selectedDayBackgroundColor: '#FF7096',
            }}
            markedDates={{
              '2026-05-01': { marked: true, dotColor: '#E8567F' },
              '2026-05-02': { marked: true, dotColor: '#E8567F' },
              '2026-05-03': { marked: true, dotColor: '#E8567F' },
              '2026-05-04': { selected: true, selectedColor: '#FF7096' },
            }}
          />
          
          {/* Legend */}
          <View className="flex-row flex-wrap gap-4 mt-6 pt-6 border-t border-gray-50">
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#E8567F] mr-2" />
              <Text className="text-[10px] text-gray-500 font-inter">Period</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#7CB69E] mr-2" />
              <Text className="text-[10px] text-gray-500 font-inter">Follicular</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#F4A261] mr-2" />
              <Text className="text-[10px] text-gray-500 font-inter">Ovulation</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#9B8EC0] mr-2" />
              <Text className="text-[10px] text-gray-500 font-inter">Luteal</Text>
            </View>
          </View>
        </View>

        {/* Log Button */}
        <View className="flex-row gap-x-4 mb-8">
          <TouchableOpacity className="flex-1 bg-primary p-6 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-primary/30">
            <Plus size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2 font-outfit">Log Period</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-secondary p-6 rounded-[24px] flex-row items-center justify-center shadow-lg shadow-secondary/30"
          >
            <TrendingUp size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2 font-outfit">Insights</Text>
          </TouchableOpacity>
        </View>

        {/* Cycle Info */}
        <View className="bg-white border border-gray-100 p-6 rounded-[32px] mb-8 shadow-sm">
          <View className="flex-row items-center mb-6">
            <Info size={20} color="#FF7096" />
            <Text className="text-lg font-bold text-gray-900 font-outfit ml-2">Cycle Info</Text>
          </View>
          
          <View className="gap-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 font-inter text-sm">Average Cycle</Text>
              <Text className="text-gray-900 font-bold font-inter text-sm">28 days</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 font-inter text-sm">Average Period</Text>
              <Text className="text-gray-900 font-bold font-inter text-sm">5 days</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 font-inter text-sm">Last Period</Text>
              <Text className="text-gray-900 font-bold font-inter text-sm">May 01, 2026</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 font-inter text-sm">Regularity</Text>
              <View className="bg-green-50 px-3 py-1 rounded-full">
                <Text className="text-green-600 font-bold text-[10px] uppercase">Regular</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Periods */}
        <View className="bg-white border border-gray-100 p-6 rounded-[32px] mb-12 shadow-sm">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-bold text-gray-900 font-outfit">Recent Periods</Text>
            <TouchableOpacity><BarChart2 size={20} color="#9CA3AF" /></TouchableOpacity>
          </View>

          <View className="gap-y-4">
            {[1, 2, 3].map((i) => (
              <View key={i} className="flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <View>
                  <Text className="text-sm font-bold text-gray-900">Apr 03 — Apr 08</Text>
                  <Text className="text-[10px] text-gray-400 mt-1">28 day cycle</Text>
                </View>
                <View className="bg-red-50 px-3 py-1 rounded-full">
                  <Text className="text-red-500 font-bold text-[10px]">Medium</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CycleTrackerScreen;
