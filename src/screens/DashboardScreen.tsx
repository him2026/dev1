import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
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
  ChevronRight,
  TrendingUp,
  LayoutGrid
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { getProfile } from '../services/profile';
import { getRecentMoodLogs } from '../services/moodLog';
import { getCurrentPhase } from '../utils/cycle';
import { useResponsive } from '../hooks/useResponsive';

const { width } = Dimensions.get('window');

const phaseConfig: Record<string, { name: string; description: string; energy: string }> = {
  menstrual: { 
    name: 'Menstrual Phase', 
    description: 'Your body is renewing. Rest and be gentle with yourself.',
    energy: 'Low Energy — Rest Mode'
  },
  follicular: { 
    name: 'Follicular Phase', 
    description: 'Estrogen levels are rising. You may feel more energetic!',
    energy: 'Peak Energy Levels'
  },
  ovulation: { 
    name: 'Ovulation Phase', 
    description: 'Peak confidence & energy. You\'re glowing!',
    energy: 'Maximum Energy'
  },
  luteal: { 
    name: 'Luteal Phase', 
    description: 'Wind down and practice self-care. Be extra gentle.',
    energy: 'Declining Energy'
  },
};

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [daysUntil, setDaysUntil] = useState(0);
  const [streak, setStreak] = useState(0);
  const [phase, setPhase] = useState('follicular');
  const { isDesktop, isTablet, contentPadding, maxContentWidth } = useResponsive();

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const { cycleSettings } = await getProfile(user!.id);
      
      // Calculate days until next period
      if (cycleSettings.next_predicted_date) {
        const nextDate = new Date(cycleSettings.next_predicted_date);
        const today = new Date();
        const diff = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        setDaysUntil(Math.max(0, diff));
      }

      // Determine current phase
      if (cycleSettings.last_period_start) {
        const currentPhase = getCurrentPhase(
          cycleSettings.last_period_start,
          cycleSettings.avg_cycle_length,
          cycleSettings.avg_period_length
        );
        setPhase(currentPhase);
      }

      // Calculate mood streak
      const moodLogs = await getRecentMoodLogs(user!.id, 30);
      if (moodLogs.length > 0) {
        let currentStreak = 0;
        const today = new Date();
        for (let i = 0; i < moodLogs.length; i++) {
          const logDate = new Date(moodLogs[i].log_date);
          const expectedDate = new Date(today);
          expectedDate.setDate(expectedDate.getDate() - i);
          if (logDate.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
            currentStreak++;
          } else {
            break;
          }
        }
        setStreak(currentStreak);
      }
    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentPhase = phaseConfig[phase] || phaseConfig.follicular;
  const firstName = user?.full_name?.split(' ')[0] || 'Friend';

  const handleAction = (label: string) => {
    switch (label) {
      case 'Log': navigation.navigate('LogPeriod'); break;
      case 'Chat': navigation.navigate('Chat'); break;
      case 'Mood': navigation.navigate('Journal'); break;
      default: break;
    }
  };

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
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center', paddingHorizontal: contentPadding }}>
          
        {/* Profile Header */}
        <View className="px-6 pt-10 pb-8 flex-row justify-between items-end">
          <View>
            <Animated.Text entering={FadeInDown.duration(600)} className="text-gray-500 font-inter text-sm mb-1 uppercase tracking-widest">Welcome Back</Animated.Text>
            <Animated.Text entering={FadeInDown.delay(100).duration(600)} className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter">{firstName} ✨</Animated.Text>
          </View>
          <Animated.View entering={FadeInDown.delay(200).duration(600)} className="bg-white p-3 rounded-3xl shadow-soft border border-white">
            <LayoutGrid size={24} color="#8B004A" />
          </Animated.View>
        </View>

        {/* Phase Highlight Banner */}
        <Animated.View entering={FadeInUp.delay(300).duration(800)} className="px-6 mb-10">
          <TouchableOpacity activeOpacity={0.9} className="bg-primary p-8 rounded-4xl shadow-premium relative overflow-hidden">
            {/* Background Decorative Circles */}
            <View className="absolute top-[-20] right-[-20] w-32 h-32 bg-white/10 rounded-full" />
            <View className="absolute bottom-[-40] left-[-20] w-48 h-48 bg-white/5 rounded-full" />
            
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <View className="bg-white/20 self-start px-4 py-1.5 rounded-full mb-4 border border-white/30">
                  <Text className="text-white text-[10px] font-bold uppercase tracking-widest">Current Status</Text>
                </View>
                <Text className="text-white text-3xl font-bold font-outfit mb-2">{currentPhase.name}</Text>
                <Text className="text-white/80 text-sm font-inter leading-5 mr-10">{currentPhase.description}</Text>
              </View>
              <View className="bg-white/95 p-5 rounded-4xl items-center shadow-lg">
                <Droplet size={32} color="#8B004A" fill="#8B004A" />
              </View>
            </View>
            
            <View className="mt-8 pt-8 border-t border-white/10 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <TrendingUp size={16} color="white" />
                <Text className="text-white/90 text-xs font-bold ml-2 font-inter">{currentPhase.energy}</Text>
              </View>
              <ChevronRight size={20} color="white" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)} className="px-6 mb-12">
          <View className="flex-row justify-between mb-6">
            <Text className="text-xl font-bold text-gray-900 font-outfit">Your Insights</Text>
            <TouchableOpacity><Text className="text-primary font-bold text-sm">View All</Text></TouchableOpacity>
          </View>
          
          <View className={`flex-row flex-wrap justify-between gap-y-4`}>
            <View className={isDesktop ? 'w-[23%]' : 'w-[48%]'}>
              <GlassCard intensity={40} style={{ padding: 20 }}>
                <View className="w-12 h-12 rounded-3xl items-center justify-center mb-4 bg-white shadow-soft">
                  <Calendar size={24} color="#8B004A" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 font-outfit">{daysUntil} Days</Text>
                <Text className="text-[11px] text-gray-500 font-inter uppercase tracking-widest mt-1">Next Cycle</Text>
              </GlassCard>
            </View>

            <View className={isDesktop ? 'w-[23%]' : 'w-[48%]'}>
              <GlassCard intensity={40} style={{ padding: 20 }}>
                <View className="w-12 h-12 rounded-3xl items-center justify-center mb-4 bg-white shadow-soft">
                  <Flame size={24} color="#A93226" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 font-outfit">{streak} Days</Text>
                <Text className="text-[11px] text-gray-500 font-inter uppercase tracking-widest mt-1">Streak</Text>
              </GlassCard>
            </View>

            <View className={isDesktop ? 'w-[23%]' : 'w-[48%]'}>
              <GlassCard intensity={40} style={{ padding: 20 }}>
                <View className="w-12 h-12 rounded-3xl items-center justify-center mb-4 bg-white shadow-soft">
                  <HeartPulse size={24} color="#D4AF37" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 font-outfit">--</Text>
                <Text className="text-[11px] text-gray-500 font-inter uppercase tracking-widest mt-1">Health Score</Text>
              </GlassCard>
            </View>

            <View className={isDesktop ? 'w-[23%]' : 'w-[48%]'}>
              <GlassCard intensity={40} style={{ padding: 20 }}>
                <View className="w-12 h-12 rounded-3xl items-center justify-center mb-4 bg-white shadow-soft">
                  <Star size={24} color="#8B004A" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 font-outfit">--</Text>
                <Text className="text-[11px] text-gray-500 font-inter uppercase tracking-widest mt-1">HIM Points</Text>
              </GlassCard>
            </View>
          </View>
        </Animated.View>

        {/* Action Center */}
        <Animated.View entering={FadeInUp.delay(500).duration(800)} className="px-6 mb-12">
          <Text className="text-xl font-bold text-gray-900 font-outfit mb-6">Action Center</Text>
          <View className="flex-row justify-between">
            {[
              { icon: Droplet, color: '#8B004A', label: 'Log', bg: '#F8E8E8' },
              { icon: MessageCircle, color: '#A93226', label: 'Chat', bg: '#F2EFE7' },
              { icon: Mic, color: '#8B004A', label: 'Voice', bg: '#E6D3DB' },
              { icon: Smile, color: '#D4AF37', label: 'Mood', bg: '#FFF9E6' }
            ].map((action, i) => (
              <TouchableOpacity key={i} className="items-center" onPress={() => handleAction(action.label)}>
                <View 
                  className="w-16 h-16 rounded-4xl items-center justify-center mb-3 shadow-sm"
                  style={{ backgroundColor: action.bg }}
                >
                  <action.icon size={28} color={action.color} />
                </View>
                <Text className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Daily Insight Card */}
        <Animated.View entering={FadeInUp.delay(600).duration(800)} className="px-6 pb-20">
          <View className="bg-white/90 p-8 rounded-5xl border border-white shadow-soft relative overflow-hidden">
            <View className="flex-row items-center mb-6">
              <View className="bg-secondary/20 p-3 rounded-2xl mr-4">
                <Lightbulb size={24} color="#A93226" />
              </View>
              <Text className="text-sm font-bold text-secondary uppercase tracking-[3px] font-outfit">Empowerment Tip</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 font-outfit mb-3">Embrace the Flow</Text>
            <Text className="text-gray-600 leading-7 font-inter mb-6">
              Your energy levels are peaking. This is the best time to start new projects or engage in intensive workouts. Listen to your body's rhythm.
            </Text>
            <TouchableOpacity className="bg-gray-900 py-4 rounded-3xl items-center shadow-lg">
              <Text className="text-white font-bold font-inter text-sm">Read Full Guide</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
