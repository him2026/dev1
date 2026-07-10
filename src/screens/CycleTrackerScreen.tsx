import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Droplet, Plus, Info, BarChart2, TrendingUp, Sparkles, Heart } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../context/AuthContext';
import { getProfile, getPeriodLogs } from '../services/api';
import { getCurrentPhase } from '../utils/cycle';

const phaseConfig: Record<string, { name: string; description: string; }> = {
  menstrual: { name: 'Menstrual Phase', description: 'Your body is renewing. Rest and be gentle with yourself.' },
  follicular: { name: 'Follicular Phase', description: 'Estrogen levels are rising. You may feel more energetic!' },
  ovulation: { name: 'Ovulation Phase', description: "Peak confidence & energy. You're glowing!" },
  luteal: { name: 'Luteal Phase', description: 'Wind down and practice self-care. Be extra gentle.' },
};

const CycleTrackerScreen = ({ navigation }: any) => {
  const { maxContentWidth, contentPadding } = useResponsive();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState('follicular');
  const [daysUntil, setDaysUntil] = useState(0);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [regularity, setRegularity] = useState('Regular');
  const [markedDates, setMarkedDates] = useState<any>({});

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const { cycleSettings } = await getProfile(user!.id);
      const logs = await getPeriodLogs(user!.id);
      
      setCycleLength(cycleSettings.avg_cycle_length || 28);
      setPeriodLength(cycleSettings.avg_period_length || 5);
      setRegularity(cycleSettings.pcos_flag ? 'Irregular' : 'Regular');

      if (cycleSettings.next_predicted_date) {
        const nextDate = new Date(cycleSettings.next_predicted_date);
        const diff = Math.ceil((nextDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        setDaysUntil(Math.max(0, diff));
      }

      if (cycleSettings.last_period_start) {
        const currentPhase = getCurrentPhase(
          cycleSettings.last_period_start,
          cycleSettings.avg_cycle_length || 28,
          cycleSettings.avg_period_length || 5
        );
        setPhase(currentPhase);
      }

      const marks: any = {};
      logs.forEach((log: any) => {
        const start = new Date(log.start_date);
        const end = log.end_date ? new Date(log.end_date) : new Date(start.getTime() + (cycleSettings.avg_period_length || 5) * 24 * 60 * 60 * 1000);
        
        let curr = new Date(start);
        while (curr <= end) {
          const dateStr = curr.toISOString().split('T')[0];
          marks[dateStr] = { marked: true, dotColor: '#8B004A' };
          curr.setDate(curr.getDate() + 1);
        }
      });
      
      if (cycleSettings.next_predicted_date) {
        marks[cycleSettings.next_predicted_date] = { selected: true, selectedColor: '#8B004A' };
      }

      setMarkedDates(marks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const currentPhase = phaseConfig[phase] || phaseConfig.follicular;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#FF7096" />
      </SafeAreaView>
    );
  }

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
                <Text className="text-white text-3xl font-bold font-outfit mb-2">{currentPhase.name}</Text>
                <Text className="text-white/80 text-sm font-inter leading-5">{currentPhase.description}</Text>
              </View>
              <View className="bg-white/95 p-6 rounded-4xl items-center shadow-lg">
                <Text className="text-3xl font-bold text-primary font-outfit leading-9">{daysUntil}</Text>
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
              markedDates={markedDates}
            />
            
            <View className="flex-row justify-between mt-8 pt-8 border-t border-gray-50 px-2">
              {[
                { color: '#8B004A', label: 'Period' },
                { color: '#A93226', label: 'Predicted' },
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
        <Animated.View entering={FadeInUp.delay(600).duration(800)} className="flex-row gap-x-5 mb-12 px-6">
          <TouchableOpacity onPress={() => navigation?.navigate('LogPeriod')} activeOpacity={0.8} className="flex-1 bg-white p-7 rounded-4xl flex-row items-center justify-center shadow-soft border border-white">
            <Plus size={24} color="#8B004A" />
            <Text className="text-primary font-bold text-lg ml-3 font-outfit">Log</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation?.navigate('Insights')} activeOpacity={0.8} className="flex-1 bg-secondary p-7 rounded-4xl flex-row items-center justify-center shadow-premium">
            <TrendingUp size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-3 font-outfit">Stats</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Data Cards */}
        <Animated.View entering={FadeInUp.delay(800).duration(800)} className="pb-20 px-6">
          <GlassCard intensity={40} style={{ padding: 30, borderRadius: 50 }}>
            <View className="flex-row items-center mb-8">
              <View className="bg-white p-3 rounded-2xl mr-4 shadow-sm">
                <Info size={24} color="#8B004A" />
              </View>
              <Text className="text-xl font-bold text-gray-900 font-outfit">Cycle Insights</Text>
            </View>
            
            <View className="gap-y-6">
              {[
                { label: 'Cycle Average', value: `${cycleLength} Days` },
                { label: 'Flow Duration', value: `${periodLength} Days` },
                { label: 'Regularity', value: regularity, pill: true }
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
