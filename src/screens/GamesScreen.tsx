import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Animated, Modal } from 'react-native';
import { Gamepad, Star, Medal, Trophy, X, Play } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const GamesScreen = () => {
  const [points, setPoints] = useState(1250);
  const [gameVisible, setGameVisible] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mini-Games Implementation
  const startMoodMatch = () => {
    setActiveGame('mood_match');
    setGameVisible(true);
    setScore(0);
  };

  const startBubblePop = () => {
    setActiveGame('bubble_pop');
    setGameVisible(true);
    setScore(0);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="items-center mb-8">
          <View className="flex-row items-center mb-2">
            <Gamepad size={32} color="#FF7096" />
            <Text className="text-3xl font-bold font-outfit ml-3">Games Hub</Text>
          </View>
          <Text className="text-gray-500 font-inter text-center">Make self-care fun and build healthy habits</Text>
        </View>

        {/* Points Card */}
        <View className="bg-primary/5 border border-primary/10 p-8 rounded-[40px] mb-10 items-center">
          <View className="bg-white p-4 rounded-3xl shadow-sm mb-4">
            <Star size={32} color="#FBBF24" fill="#FBBF24" />
          </View>
          <Text className="text-4xl font-bold text-gray-900 font-outfit">{points}</Text>
          <Text className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Total Points</Text>
        </View>

        {/* Badges Section */}
        <View className="mb-10">
          <View className="flex-row items-center justify-center mb-6">
            <Medal size={24} color="#FBBF24" />
            <Text className="text-xl font-bold text-gray-900 font-outfit ml-2">My Collection</Text>
          </View>
          
          <View className="flex-row flex-wrap justify-between gap-y-6">
            {[1, 2, 3, 4].map((i) => (
              <View key={i} className={`w-[47%] bg-white border border-gray-100 p-5 rounded-[32px] items-center shadow-sm ${i <= 2 ? 'opacity-100' : 'opacity-40'}`}>
                <View className="w-12 h-12 bg-primary-light rounded-full items-center justify-center mb-3">
                  <Medal size={24} color="#FF7096" />
                </View>
                <Text className="text-sm font-bold text-gray-900 font-outfit text-center">Early Bird</Text>
                <Text className="text-[10px] text-gray-400 font-inter text-center mt-1">Logged mood 7 days in a row</Text>
                <Text className="text-[10px] font-bold text-primary mt-2">+100 pts</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Arcade Games */}
        <View className="mb-12">
          <View className="flex-row items-center justify-center mb-6">
            <Trophy size={24} color="#7CB69E" />
            <Text className="text-xl font-bold text-gray-900 font-outfit ml-2">Arcade Mini-Games</Text>
          </View>

          <View className="gap-y-6">
            {/* Mood Match */}
            <TouchableOpacity 
              onPress={startMoodMatch}
              className="bg-white border border-gray-100 p-8 rounded-[40px] items-center shadow-sm"
            >
              <Text className="text-4xl mb-4">🃏</Text>
              <Text className="text-xl font-bold text-gray-900 font-outfit mb-2">Mood Match</Text>
              <Text className="text-xs text-gray-500 text-center font-inter mb-6">Test your memory and match the feminine emojis!</Text>
              <View className="bg-primary px-8 py-3 rounded-2xl flex-row items-center">
                <Play size={16} color="white" fill="white" />
                <Text className="text-white font-bold ml-2">Play Now</Text>
              </View>
            </TouchableOpacity>

            {/* Bubble Pop */}
            <TouchableOpacity 
              onPress={startBubblePop}
              className="bg-white border border-gray-100 p-8 rounded-[40px] items-center shadow-sm"
            >
              <Text className="text-4xl mb-4">🫧</Text>
              <Text className="text-xl font-bold text-gray-900 font-outfit mb-2">Pop The Stress</Text>
              <Text className="text-xs text-gray-500 text-center font-inter mb-6">Pop as many anxiety bubbles as you can!</Text>
              <View className="bg-primary px-8 py-3 rounded-2xl flex-row items-center">
                <Play size={16} color="white" fill="white" />
                <Text className="text-white font-bold ml-2">Play Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Game Modal */}
      <Modal visible={gameVisible} animationType="slide">
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-6 py-4">
            <View />
            <Text className="text-xl font-bold font-outfit">{activeGame === 'mood_match' ? 'Mood Match' : 'Bubble Pop'}</Text>
            <TouchableOpacity onPress={() => setGameVisible(false)} className="p-2">
              <X size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 items-center justify-center px-10">
            <Text className="text-4xl font-bold text-primary font-outfit mb-2">{score}</Text>
            <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">Current Score</Text>
            
            <View className="w-full h-80 bg-primary/5 rounded-[40px] border-2 border-dashed border-primary/20 items-center justify-center">
              {isPlaying ? (
                <Text className="text-gray-400 font-inter">Game logic running...</Text>
              ) : (
                <TouchableOpacity 
                  onPress={() => setIsPlaying(true)}
                  className="bg-primary px-10 py-5 rounded-3xl shadow-lg shadow-primary/30"
                >
                  <Text className="text-white font-bold text-lg font-outfit">Start Game ✨</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
};

export default GamesScreen;
