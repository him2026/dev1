import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Droplet, Plus, Info, ChevronRight, BarChart2, TrendingUp, Sparkles, Heart } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';

const mockPhase = { 
  name: 'Luteal Phase', 
  color: '#8B004A', 
  icon: 'droplet', 
  description: 'Your energy might dip. Be kind to yourself today.' 
};
const mockDaysUntil = 4;

const CycleTrackerScreen = () => {
  const { maxContentWidth, contentPadding } = useResponsive();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: contentPadding }}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        {/* Header */}
        <View className="px-8 pt-10 pb-8">
          <Animated.Text entering={FadeInDown.duration(600)} className="text-gray-500 font-inter text-sm mb-1 uppercase tracking-widest">Cycle Monitoring</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(100).duration(600)} className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter">Your Rhythm</Animated.Text>
        </View>

        {/* Status Banner */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)} className="px-6 mb-10">
          <TouchableOpacity activeOpacity={0.9} className="bg-primary p-8 rounded-4xl shadow-premium relative overflow-hidden">
            <View className="absolute top-[-20] right-[-20] w-32 h-32 bg-white/10 rounded-full" />
            <View className="flex-row justify-between items-center">
              <View className="flex-1 pr-6">
                <View className="bg-white/20 self-start px-4 py-1.5 rounded-full mb-4 border border-white/30 flex-row items-center">
                  <Sparkles size={12} color="white" />
                  <Text className="text-white text-[10px] font-bold uppercase tracking-widest ml-2">Current Phase</Text>
                </View>
                <Text className="text-white text-3xl font-bold font-outfit mb-2">{mockPhase.name}</Text>
                <Text className="text-white/80 text-sm font-inter leading-5">{mockPhase.description}</Text>
              </View>
              <View className="bg-white/95 p-6 rounded-4xl items-center shadow-lg">
                <Text className="text-3xl font-bold text-primary font-outfit leading-9">{mockDaysUntil}</Text>
                <Text className="text-[9px] text-primary/60 font-bold text-center uppercase tracking-tighter">Days to{'\n'}Period</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Calendar Card */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)} className="px-6 mb-10">
          <View className="bg-white border border-white p-6 rounded-5xl shadow-soft">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-900 font-outfit">Cycle Calendar</Text>
              <View className="bg-background p-2.5 rounded-2xl">
                <Heart size={20} color="#8B004A" />
              </View>
            </View>
            
            <RNCalendar
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                todayTextColor: '#8B004A',
                arrowColor: '#8B004A',
                monthTextColor: '#1A1A1A',
                textMonthFontFamily: 'Outfit',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 20,
                textDayFontFamily: 'Inter',
                textDayHeaderFontFamily: 'Inter',
                textDayHeaderFontSize: 12,
                textDayHeaderFontWeight: 'bold',
                selectedDayBackgroundColor: '#8B004A',
                dayTextColor: '#4B5563',
                textSectionTitleColor: '#9CA3AF',
              }}
              markedDates={{
                '2026-05-01': { marked: true, dotColor: '#A93226' },
                '2026-05-02': { marked: true, dotColor: '#A93226' },
                '2026-05-03': { marked: true, dotColor: '#A93226' },
                '2026-05-04': { selected: true, selectedColor: '#8B004A' },
              }}
            />
            
            {/* Custom Legend */}
            <View className="flex-row justify-between mt-8 pt-8 border-t border-gray-50 px-2">
              {[
                { color: '#8B004A', label: 'Period' },
                { color: '#A93226', label: 'Fertile' },
                { color: '#D4AF37', label: 'Ovulation' }
              ].map((item, i) => (
                <View key={i} className="flex-row items-center">
                  <View className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Main Actions */}
        <Animated.View entering={FadeInUp.delay(600).duration(800)} className="flex-row gap-x-5 mb-12">
          <TouchableOpacity activeOpacity={0.8} className="flex-1 bg-white p-7 rounded-4xl flex-row items-center justify-center shadow-soft border border-white">
            <Plus size={24} color="#8B004A" />
            <Text className="text-primary font-bold text-lg ml-3 font-outfit">Log</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} className="flex-1 bg-secondary p-7 rounded-4xl flex-row items-center justify-center shadow-premium">
            <TrendingUp size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-3 font-outfit">Stats</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Data Cards */}
        <Animated.View entering={FadeInUp.delay(800).duration(800)} className="pb-20">
          <GlassCard intensity={40} style={{ padding: 30, borderRadius: 50 }}>
            <View className="flex-row items-center mb-8">
              <View className="bg-white p-3 rounded-2xl mr-4 shadow-sm">
                <Info size={24} color="#8B004A" />
              </View>
              <Text className="text-xl font-bold text-gray-900 font-outfit">Cycle Insights</Text>
            </View>
            
            <View className="gap-y-6">
              {[
                { label: 'Cycle Average', value: '28 Days' },
                { label: 'Flow Duration', value: '5 Days' },
                { label: 'Regularity', value: 'Regular', pill: true }
              ].map((row, i) => (
                <View key={i} className="flex-row justify-between items-center">
                  <Text className="text-gray-500 font-inter text-sm uppercase tracking-widest text-[11px] font-bold">{row.label}</Text>
                  {row.pill ? (
                    <View className="bg-primary/10 px-4 py-1.5 rounded-full">
                      <Text className="text-primary font-bold text-[10px] uppercase tracking-widest">{row.value}</Text>
                    </View>
                  ) : (
                    <Text className="text-gray-900 font-bold font-inter text-base tracking-tight">{row.value}</Text>
                  )}
                </View>
              ))}
            </View>
          </GlassCard>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CycleTrackerScreen;
