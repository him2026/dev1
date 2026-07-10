import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Book, Fire, Check } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { saveMoodLog } from '../services/moodLog';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../hooks/useResponsive';

const moods = [
  { key: 'happy', emoji: '😊', label: 'Happy', color: '#FFD93D' },
  { key: 'sad', emoji: '😢', label: 'Sad', color: '#74B9FF' },
  { key: 'anxious', emoji: '😰', label: 'Anxious', color: '#A29BFE' },
  { key: 'angry', emoji: '😤', label: 'Angry', color: '#FF7675' },
  { key: 'tired', emoji: '😴', label: 'Tired', color: '#B2BEC3' },
  { key: 'neutral', emoji: '😐', label: 'Neutral', color: '#FDCB6E' },
  { key: 'calm', emoji: '😌', label: 'Calm', color: '#55EFC4' },
  { key: 'irritated', emoji: '😠', label: 'Irritated', color: '#FF6B81' },
];

const MoodJournalScreen = () => {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(3);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { maxContentWidth, contentPadding, isDesktop, isTablet } = useResponsive();

  const toggleMood = (moodId: string) => {
    if (selectedMoods.includes(moodId)) {
      setSelectedMoods(selectedMoods.filter(id => id !== moodId));
    } else {
      setSelectedMoods([...selectedMoods, moodId]);
    }
  };

  const handleSave = async () => {
    if (selectedMoods.length === 0) {
      Alert.alert('Error', 'Please select at least one mood');
      return;
    }
    
    setLoading(true);
    try {
      if (user) {
        await saveMoodLog(
          user.id, 
          new Date().toISOString().split('T')[0], 
          selectedMoods, 
          intensity, 
          notes
        );
        Alert.alert('Success', 'Mood log saved successfully', [
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
        <Animated.View entering={FadeInUp.duration(600)} className="flex-row justify-between items-center mb-8">
          <View>
            <View className="flex-row items-center">
              <Book size={24} color="#9B8EC0" />
              <Text className="text-2xl font-bold font-outfit ml-2">Mood Journal</Text>
            </View>
            <Text className="text-gray-500 font-inter mt-1">Track how you feel each day</Text>
          </View>
          <View className="bg-gray-50 p-3 rounded-2xl flex-row items-center border border-gray-100">
            <Fire size={20} color="#F4A261" />
            <Text className="ml-2 font-bold text-gray-900">5</Text>
          </View>
        </Animated.View>

        {/* Mood Grid */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)} className="mb-8">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-lg font-bold text-gray-900 font-outfit">How are you feeling?</Text>
            <Text className="text-xs font-bold text-primary font-inter px-3 py-1 bg-primary-light rounded-full">
              {selectedMoods.length} selected
            </Text>
          </View>
          
          <View className="flex-row flex-wrap gap-3">
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.key}
                onPress={() => toggleMood(mood.key)}
                className={`items-center justify-center p-4 rounded-3xl border-2 w-[22%] ${selectedMoods.includes(mood.key) ? 'bg-white border-primary shadow-sm' : 'bg-gray-50 border-transparent'}`}
                style={selectedMoods.includes(mood.key) ? { borderColor: '#FF7096' } : {}}
              >
                <Text className="text-3xl mb-1">{mood.emoji}</Text>
                <Text className="text-[10px] font-bold text-gray-600">{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Intensity */}
        <Animated.View entering={FadeInUp.delay(300).duration(800)} className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900 font-outfit">Intensity</Text>
            <Text className="text-primary font-bold text-lg">{intensity}</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={intensity}
            onValueChange={setIntensity}
            minimumTrackTintColor="#FF7096"
            maximumTrackTintColor="#F3F4F6"
            thumbTintColor="#FF7096"
          />
          <View className="flex-row justify-between mt-1">
            <Text className="text-xs text-gray-400 font-inter">Mild</Text>
            <Text className="text-xs text-gray-400 font-inter">Intense</Text>
          </View>
        </Animated.View>

        {/* Notes */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)} className="mb-8">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-4">Journal Entry</Text>
          <TextInput
            className="bg-gray-50 rounded-3xl p-6 text-gray-900 font-inter min-h-[120px] border border-gray-100"
            placeholder="Write about your day..."
            multiline
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </Animated.View>

        {/* Save Button */}
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={loading}
            className="bg-primary p-5 rounded-[32px] items-center mb-10 shadow-lg shadow-primary/30"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-xl font-outfit">Save Journal Entry</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodJournalScreen;
