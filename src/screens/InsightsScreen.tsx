import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { ChevronLeft, Calendar, TrendingUp, Table as TableIcon } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../context/AuthContext';
import { getPeriodLogs, getSymptomLogs, getRecentMoodLogs, getProfile } from '../services/api';

const InsightsScreen = ({ navigation }: any) => {
  const { width: screenWidth, isDesktop, contentPadding, maxContentWidth } = useResponsive();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [totalCycles, setTotalCycles] = useState(0);
  const [avgLength, setAvgLength] = useState(28);
  const [moodData, setMoodData] = useState<any>(null);
  const [symptomData, setSymptomData] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) loadInsights();
  }, [user]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      const { cycleSettings } = await getProfile(user!.id);
      setAvgLength(cycleSettings.avg_cycle_length || 28);

      const periodLogs = await getPeriodLogs(user!.id);
      setTotalCycles(periodLogs.length);
      
      const formattedHistory = periodLogs.slice(0, 5).map((log: any, index: number) => {
        let duration = cycleSettings.avg_period_length || 5;
        if (log.end_date) {
          duration = Math.ceil((new Date(log.end_date).getTime() - new Date(log.start_date).getTime()) / (1000 * 3600 * 24)) + 1;
        }
        
        let status = 'Regular';
        if (index < periodLogs.length - 1) {
           const prevLog = periodLogs[index + 1];
           const diff = Math.abs(new Date(log.start_date).getTime() - new Date(prevLog.start_date).getTime()) / (1000 * 3600 * 24);
           if (Math.abs(diff - (cycleSettings.avg_cycle_length || 28)) > 5) {
             status = 'Irregular';
           }
        }
        
        const sd = new Date(log.start_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        const ed = new Date(new Date(log.start_date).getTime() + (duration - 1) * 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        
        return { date: `${sd} — ${ed}`, days: `${duration} Days`, status };
      });
      setHistory(formattedHistory);

      const moods = await getRecentMoodLogs(user!.id, 7);
      if (moods.length > 0) {
        const labels = moods.map((m: any) => new Date(m.log_date).getDate().toString()).reverse();
        const data = moods.map((m: any) => m.intensity || 3).reverse();
        setMoodData({ labels, datasets: [{ data }] });
      } else {
        setMoodData({ labels: ['N/A'], datasets: [{ data: [0] }] });
      }

      const symptoms = await getSymptomLogs(user!.id);
      const counts: Record<string, number> = {};
      symptoms.forEach((s: any) => {
        if (s.symptoms_json) {
          Object.keys(s.symptoms_json).forEach(k => {
            if (s.symptoms_json[k]) counts[k] = (counts[k] || 0) + 1;
          });
        }
      });
      
      const colors = ['#8B004A', '#A93226', '#D4AF37', '#E6D3DB', '#7CB69E'];
      const sympArray = Object.entries(counts).map(([name, count], i) => ({
        name,
        population: count,
        color: colors[i % colors.length],
        legendFontColor: '#4B5563',
        legendFontSize: 11
      }));
      setSymptomData(sympArray.length > 0 ? sympArray : [{ name: 'No Data', population: 1, color: '#E6D3DB', legendFontColor: '#4B5563', legendFontSize: 11 }]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(139, 0, 74, ${opacity})`,
    strokeWidth: 3,
    labelColor: (opacity = 1) => `rgba(139, 0, 74, ${opacity * 0.6})`,
    fillShadowGradientFrom: '#8B004A',
    fillShadowGradientTo: '#E6D3DB',
    decimalPlaces: 0,
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
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        <View className="flex-row items-center justify-between px-8 py-8">
          <TouchableOpacity onPress={() => navigation?.goBack()} className="bg-white p-3 rounded-2xl shadow-soft">
            <ChevronLeft size={24} color="#8B004A" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-xl font-bold font-outfit tracking-tight">Health Analytics</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Data Insights</Text>
          </View>
          <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-soft">
            <Calendar size={20} color="#8B004A" />
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInUp.duration(600)} className="px-6 mb-10">
          <View className="flex-row justify-between gap-x-4">
            <View className="flex-1">
              <GlassCard intensity={40} style={{ padding: 24, borderRadius: 40 }}>
                <Text className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3">Total Cycles</Text>
                <View className="flex-row items-end">
                  <Text className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter">{totalCycles}</Text>
                  <Text className="text-gray-400 font-inter text-xs mb-1.5 ml-2">Logged</Text>
                </View>
              </GlassCard>
            </View>
            <View className="flex-1">
              <GlassCard intensity={40} style={{ padding: 24, borderRadius: 40 }}>
                <Text className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-3">Avg Length</Text>
                <View className="flex-row items-end">
                  <Text className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter">{avgLength}</Text>
                  <Text className="text-gray-400 font-inter text-xs mb-1.5 ml-1">Days</Text>
                </View>
              </GlassCard>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} className="px-6 mb-8">
          <View className="bg-white p-8 rounded-5xl shadow-soft border border-white">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-xl font-bold text-gray-900 font-outfit tracking-tight">Mood Evolution</Text>
              <TrendingUp size={20} color="#8B004A" />
            </View>
            {moodData && (
              <LineChart
                data={moodData}
                width={isDesktop ? 800 : screenWidth - 88}
                height={220}
                chartConfig={chartConfig}
                bezier
                withInnerLines={false}
                withOuterLines={false}
                style={{ borderRadius: 16, marginLeft: -20 }}
              />
            )}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)} className="px-6 mb-8">
          <View className="bg-white p-8 rounded-5xl shadow-soft border border-white">
            <Text className="text-xl font-bold text-gray-900 font-outfit tracking-tight mb-8">Symptom Distribution</Text>
            <PieChart
              data={symptomData}
              width={isDesktop ? 800 : screenWidth - 80}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 0]}
              absolute
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(800)} className="px-6 pb-20">
          <View className="bg-white p-10 rounded-5xl shadow-soft border border-white">
            <View className="flex-row items-center mb-10">
              <View className="bg-primary/5 p-3 rounded-2xl mr-4">
                <TableIcon size={24} color="#8B004A" />
              </View>
              <Text className="text-xl font-bold text-gray-900 font-outfit tracking-tight">Cycle History</Text>
            </View>
            
            <View className="gap-y-6">
              {history.length > 0 ? history.map((row, i) => (
                <View key={i} className={`flex-row justify-between items-center pb-6 ${i !== history.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <View>
                    <Text className="text-base font-bold text-gray-900 font-outfit">{row.date}</Text>
                    <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{row.days} Flow Duration</Text>
                  </View>
                  <View className={`px-4 py-1.5 rounded-full ${row.status === 'Irregular' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                    <Text className={`text-[10px] font-bold uppercase tracking-widest ${row.status === 'Irregular' ? 'text-secondary' : 'text-primary'}`}>
                      {row.status}
                    </Text>
                  </View>
                </View>
              )) : (
                <Text className="text-gray-500 font-inter text-center">No cycles logged yet.</Text>
              )}
            </View>
          </View>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
