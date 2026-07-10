import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { ChartLine, AlertTriangle, Table as TableIcon, ChevronLeft, Calendar, TrendingUp } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';

const InsightsScreen = ({ navigation }: any) => {
  const { width: screenWidth, isDesktop, contentPadding, maxContentWidth } = useResponsive();
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(139, 0, 74, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(139, 0, 74, ${opacity * 0.6})`,
    fillShadowGradientFrom: '#8B004A',
    fillShadowGradientTo: '#E6D3DB',
    fillShadowGradientFromOpacity: 0.2,
    fillShadowGradientToOpacity: 0.05,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffffff"
    }
  };

  const moodData = {
    labels: ["01", "02", "03", "04"],
    datasets: [{
      data: [3, 4, 2, 5],
    }]
  };

  const symptomData = [
    { name: 'Cramps', population: 40, color: '#8B004A', legendFontColor: '#4B5563', legendFontSize: 11 },
    { name: 'Headache', population: 20, color: '#A93226', legendFontColor: '#4B5563', legendFontSize: 11 },
    { name: 'Bloating', population: 15, color: '#D4AF37', legendFontColor: '#4B5563', legendFontSize: 11 },
    { name: 'Fatigue', population: 25, color: '#E6D3DB', legendFontColor: '#4B5563', legendFontSize: 11 },
  ];

  const cycleData = {
    labels: ["C1", "C2", "C3", "C4"],
    datasets: [{
      data: [28, 32, 27, 29]
    }]
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        {/* Header */}
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

        {/* Summary Overview */}
        <Animated.View entering={FadeInUp.duration(600)} className="px-6 mb-10">
          <View className="flex-row justify-between gap-x-4">
            <View className="flex-1">
              <GlassCard intensity={40} style={{ padding: 24, borderRadius: 40 }}>
                <Text className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3">Total Cycles</Text>
                <View className="flex-row items-end">
                  <Text className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter">12</Text>
                  <Text className="text-gray-400 font-inter text-xs mb-1.5 ml-2">Logged</Text>
                </View>
              </GlassCard>
            </View>
            <View className="flex-1">
              <GlassCard intensity={40} style={{ padding: 24, borderRadius: 40 }}>
                <Text className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest mb-3">Avg Length</Text>
                <View className="flex-row items-end">
                  <Text className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter">28</Text>
                  <Text className="text-gray-400 font-inter text-xs mb-1.5 ml-1">Days</Text>
                </View>
              </GlassCard>
            </View>
          </View>
        </Animated.View>

        {/* Mood Trend */}
        <Animated.View entering={FadeInUp.delay(200)} className="px-6 mb-8">
          <View className="bg-white p-8 rounded-5xl shadow-soft border border-white">
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-xl font-bold text-gray-900 font-outfit tracking-tight">Mood Evolution</Text>
              <TrendingUp size={20} color="#8B004A" />
            </View>
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
          </View>
        </Animated.View>

        {/* Symptom Distribution */}
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

        {/* Cycle History Table */}
        <Animated.View entering={FadeInUp.delay(600).duration(800)} className="px-6 pb-20">
          <View className="bg-white p-10 rounded-5xl shadow-soft border border-white">
            <View className="flex-row items-center mb-10">
              <View className="bg-primary/5 p-3 rounded-2xl mr-4">
                <TableIcon size={24} color="#8B004A" />
              </View>
              <Text className="text-xl font-bold text-gray-900 font-outfit tracking-tight">Cycle History</Text>
            </View>
            
            <View className="gap-y-6">
              {[
                { date: 'May 01 — May 05', days: '5 Days', status: 'Regular' },
                { date: 'Apr 03 — Apr 08', days: '6 Days', status: 'Regular' },
                { date: 'Mar 05 — Mar 10', days: '5 Days', status: 'Late' },
              ].map((row, i) => (
                <View key={i} className={`flex-row justify-between items-center pb-6 ${i !== 2 ? 'border-b border-gray-50' : ''}`}>
                  <View>
                    <Text className="text-base font-bold text-gray-900 font-outfit">{row.date}</Text>
                    <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{row.days} Flow Duration</Text>
                  </View>
                  <View className={`px-4 py-1.5 rounded-full ${row.status === 'Late' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                    <Text className={`text-[10px] font-bold uppercase tracking-widest ${row.status === 'Late' ? 'text-secondary' : 'text-primary'}`}>
                      {row.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
