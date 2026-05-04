import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Book, Fire, Check, Star } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

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
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');

  const toggleMood = (key: string) => {
    if (selectedMoods.includes(key)) {
      setSelectedMoods(selectedMoods.filter(m => m !== key));
    } else if (selectedMoods.length < 3) {
      setSelectedMoods([...selectedMoods, key]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
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
        </View>

        {/* Mood Grid */}
        <View className="mb-8">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-lg font-bold text-gray-900 font-outfit">How are you feeling?</Text>
            <Text className="text-xs font-bold text-primary font-inter px-3 py-1 bg-primary-light rounded-full">
              {selectedMoods.length} / 3 selected
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
        </View>

        {/* Intensity */}
        <View className="mb-8">
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
        </View>

        {/* Notes */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-4">Journal Entry</Text>
          <TextInput
            className="bg-gray-50 rounded-3xl p-6 text-gray-900 font-inter min-h-[120px] border border-gray-100"
            placeholder="Write about your day..."
            multiline
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity className="bg-primary p-6 rounded-[24px] flex-row items-center justify-center mb-10 shadow-lg shadow-primary/30">
          <Check size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2 font-outfit">Save Mood</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodJournalScreen;
