import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Droplet, Calendar as CalendarIcon, Check, ChevronLeft } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { savePeriodLog } from '../services/api';
import { getProfile } from '../services/api';
import { useResponsive } from '../hooks/useResponsive';

const LogPeriodScreen = ({ navigation }: any) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [flow, setFlow] = useState('medium');
  const [notes, setNotes] = useState('');
  const [severity, setSeverity] = useState('mild');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { maxContentWidth, contentPadding } = useResponsive();

  const [symptoms, setSymptoms] = useState({
    cramps: false,
    headache: false,
    bloating: false,
    fatigue: false,
    mood_swings: false,
    acne: false,
    back_pain: false,
    cravings: false,
  });

  const toggleSymptom = (key: keyof typeof symptoms) => {
    setSymptoms({ ...symptoms, [key]: !symptoms[key] });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (user) {
        const { cycleSettings } = await getProfile(user.id);
        await savePeriodLog(
          user.id,
          startDate.toISOString().split('T')[0],
          endDate ? endDate.toISOString().split('T')[0] : null,
          flow,
          symptoms,
          severity,
          notes,
          cycleSettings
        );
        Alert.alert('Success', 'Period logged successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
        
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity onPress={() => navigation?.goBack()} className="p-2 -ml-2">
            <ChevronLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-xl font-bold font-outfit">Log Your Period</Text>
            <Text className="text-xs text-gray-500 font-inter">Track your cycle rhythm</Text>
          </View>
          <View className="w-10" />
        </View>

        {/* Date Selectors */}
        <Animated.View entering={FadeInUp.delay(100)} className="flex-row gap-x-4 mb-8">
          <TouchableOpacity 
            onPress={() => setShowStartPicker(true)}
            className="flex-1 bg-gray-50 border border-gray-100 p-5 rounded-3xl items-center"
          >
            <CalendarIcon size={20} color="#FF7096" />
            <Text className="text-[10px] font-bold text-gray-400 uppercase mt-2 mb-1">Start Date</Text>
            <Text className="text-sm font-bold text-gray-900">{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setShowEndPicker(true)}
            className="flex-1 bg-gray-50 border border-gray-100 p-5 rounded-3xl items-center"
          >
            <CalendarIcon size={20} color="#9CA3AF" />
            <Text className="text-[10px] font-bold text-gray-400 uppercase mt-2 mb-1">End Date</Text>
            <Text className="text-sm font-bold text-gray-900">{endDate ? endDate.toLocaleDateString() : 'Ongoing'}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Date Pickers (Conditional) */}
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={(e, date) => {
              setShowStartPicker(false);
              if (date) setStartDate(date);
            }}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            onChange={(e, date) => {
              setShowEndPicker(false);
              if (date) setEndDate(date);
            }}
          />
        )}

        {/* Flow Intensity */}
        <Animated.View entering={FadeInUp.delay(200)} className="mb-8">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-4">Flow Intensity</Text>
          <View className="flex-row justify-between">
            {['light', 'medium', 'heavy'].map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFlow(f)}
                className={`px-8 py-4 rounded-full border-2 ${flow === f ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-transparent'}`}
                style={flow === f ? { borderColor: '#FF7096' } : {}}
              >
                <Text className={`font-bold text-sm capitalize ${flow === f ? 'text-primary' : 'text-gray-400'}`}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Symptoms */}
        <Animated.View entering={FadeInUp.delay(300)} className="mb-8">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-4">Symptoms</Text>
          <View className="flex-row flex-wrap gap-3">
            {Object.keys(symptoms).map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => toggleSymptom(s as keyof typeof symptoms)}
                className={`px-5 py-3 rounded-2xl border-2 ${symptoms[s as keyof typeof symptoms] ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-transparent'}`}
                style={symptoms[s as keyof typeof symptoms] ? { borderColor: '#FF7096' } : {}}
              >
                <Text className={`font-bold text-xs capitalize ${symptoms[s as keyof typeof symptoms] ? 'text-primary' : 'text-gray-500'}`}>
                  {s.replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Severity */}
        <Animated.View entering={FadeInUp.delay(400)} className="mb-8">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-4">Overall Severity</Text>
          <View className="gap-y-3">
            {['mild', 'moderate', 'severe'].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSeverity(s)}
                className={`flex-row items-center justify-between p-5 rounded-3xl border-2 ${severity === s ? 'bg-white border-primary' : 'bg-gray-50 border-transparent'}`}
                style={severity === s ? { borderColor: '#FF7096' } : {}}
              >
                <Text className={`font-bold text-sm capitalize ${severity === s ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s} — {s === 'mild' ? 'Manageable' : s === 'moderate' ? 'Uncomfortable' : 'Very painful'}
                </Text>
                {severity === s && <Check size={20} color="#FF7096" />}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Notes */}
        <Animated.View entering={FadeInUp.delay(500)} className="mb-8">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-4">Notes (optional)</Text>
          <TextInput
            className="bg-gray-50 rounded-3xl p-6 text-gray-900 font-inter min-h-[120px] border border-gray-100"
            placeholder="Any additional notes..."
            multiline
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </Animated.View>

        {/* Save Button */}
        <Animated.View entering={FadeInUp.delay(600).springify()}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={loading}
            className="bg-primary p-5 rounded-[32px] flex-row items-center justify-center mb-10 shadow-lg shadow-primary/30"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Check size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2 font-outfit">Save Period Log</Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogPeriodScreen;
