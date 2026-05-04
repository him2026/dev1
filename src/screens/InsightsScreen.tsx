import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { ChartLine, AlertTriangle, Table as TableIcon } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

const InsightsScreen = () => {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(255, 112, 150, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#FF7096"
    }
  };

  const moodData = {
    labels: ["May 01", "May 02", "May 03", "May 04"],
    datasets: [{
      data: [3, 4, 2, 5],
      color: (opacity = 1) => `rgba(255, 112, 150, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const symptomData = [
    { name: 'Cramps', population: 40, color: '#FF85A1', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Headache', population: 20, color: '#FFB3C6', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Bloating', population: 15, color: '#FFC8DD', legendFontColor: '#7F7F7F', legendFontSize: 10 },
    { name: 'Fatigue', population: 25, color: '#C9A8E8', legendFontColor: '#7F7F7F', legendFontSize: 10 },
  ];

  const cycleData = {
    labels: ["C1", "C2", "C3", "C4"],
    datasets: [{
      data: [28, 32, 27, 29]
    }]
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="items-center mb-10">
          <View className="flex-row items-center mb-2">
            <ChartLine size={28} color="#9B8EC0" />
            <Text className="text-3xl font-bold font-outfit ml-3">Health Insights</Text>
          </View>
          <Text className="text-gray-500 font-inter text-center">Visual analytics of your wellness patterns</Text>
        </View>

        {/* Summary Cards */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-10">
          <View className="w-[48%] bg-white border border-gray-100 p-6 rounded-[32px] items-center shadow-sm">
            <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2">Total Cycles</Text>
            <Text className="text-3xl font-bold text-primary font-outfit">12</Text>
          </View>
          <View className="w-[48%] bg-white border border-gray-100 p-6 rounded-[32px] items-center shadow-sm">
            <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2">Avg Length</Text>
            <Text className="text-3xl font-bold text-secondary font-outfit">28d</Text>
          </View>
        </View>

        {/* Mood Trend */}
        <View className="bg-white border border-gray-100 p-8 rounded-[40px] mb-8 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6 text-center">Mood Trend (30 Days)</Text>
          <LineChart
            data={moodData}
            width={screenWidth - 80}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16, paddingRight: 40 }}
          />
        </View>

        {/* Symptom Distribution */}
        <View className="bg-white border border-gray-100 p-8 rounded-[40px] mb-8 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6 text-center">Symptom Distribution</Text>
          <PieChart
            data={symptomData}
            width={screenWidth - 80}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute
          />
        </View>

        {/* Cycle History */}
        <View className="bg-white border border-gray-100 p-8 rounded-[40px] mb-8 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6 text-center">Cycle Length History</Text>
          <BarChart
            data={cycleData}
            width={screenWidth - 80}
            height={220}
            yAxisLabel=""
            yAxisSuffix="d"
            chartConfig={chartConfig}
            style={{ borderRadius: 16, paddingRight: 40 }}
          />
        </View>

        {/* Period History Table */}
        <View className="bg-white border border-gray-100 p-8 rounded-[40px] mb-12 shadow-sm">
          <View className="flex-row items-center justify-center mb-6">
            <TableIcon size={20} color="#FF7096" />
            <Text className="text-lg font-bold text-gray-900 font-outfit ml-2">Period History</Text>
          </View>
          
          <View className="gap-y-4">
            <View className="flex-row justify-between border-b border-gray-50 pb-3">
              <Text className="text-xs font-bold text-gray-400 uppercase">Dates</Text>
              <Text className="text-xs font-bold text-gray-400 uppercase">Days</Text>
            </View>
            {[1, 2, 3].map((i) => (
              <View key={i} className="flex-row justify-between items-center py-2">
                <Text className="text-sm font-bold text-gray-900">May 01 — May 05</Text>
                <Text className="text-sm text-gray-500 font-inter">5 days</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsScreen;
