import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { Heart, Sparkles, MessageCircle, Mic, BookOpen, Trophy, Shield, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const LandingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View className="px-8 pt-12 pb-20 items-center">
          <View className="bg-primary/10 px-5 py-2 rounded-full mb-8 flex-row items-center">
            <Sparkles size={14} color="#FF7096" />
            <Text className="text-primary font-bold text-[10px] uppercase tracking-widest ml-2">AI-Powered Period Companion</Text>
          </View>
          
          <Text className="text-4xl font-bold text-gray-900 font-outfit text-center leading-[48px] mb-6">
            Your <Text className="text-primary">Intelligent Mate</Text> Through Every Rhythm
          </Text>
          
          <Text className="text-gray-500 font-inter text-center leading-6 mb-10 px-2">
            HIM understands your emotions, predicts your cycle, and provides comfort when you need it most. More than a tracker — your empathetic digital ally.
          </Text>

          <View className="w-full gap-y-4">
            <TouchableOpacity 
              onPress={() => navigation?.navigate('Register')}
              className="bg-primary p-6 rounded-[28px] flex-row items-center justify-center shadow-lg shadow-primary/30"
            >
              <Text className="text-white font-bold text-lg font-outfit">Get Started Free</Text>
              <ChevronRight size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation?.navigate('Login')}
              className="bg-gray-50 p-6 rounded-[28px] flex-row items-center justify-center border border-gray-100"
            >
              <Text className="text-gray-700 font-bold text-lg font-outfit">Login to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Visual Illustration Placeholder */}
        <View className="items-center mb-20">
          <View className="w-64 h-64 bg-primary/5 rounded-full items-center justify-center">
            <Heart size={120} color="#FF7096" fill="#FF7096" opacity={0.1} />
            <View className="absolute">
              <Sparkles size={40} color="#FF7096" />
            </View>
          </View>
        </View>

        {/* Features Grid */}
        <View className="px-8 mb-20">
          <Text className="text-[10px] font-bold text-primary uppercase tracking-[2px] text-center mb-2">Core Capabilities</Text>
          <Text className="text-3xl font-bold text-gray-900 font-outfit text-center mb-10">The Future of Wellness</Text>

          <View className="gap-y-10">
            <View className="flex-row items-start">
              <View className="bg-primary-light p-4 rounded-2xl mr-5">
                <MessageCircle size={24} color="#FF7096" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 font-outfit mb-1">Empathetic AI Chat</Text>
                <Text className="text-gray-500 text-xs leading-5 font-inter">Your companion HIM understands your phase and mood, offering personalized comfort.</Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="bg-blue-50 p-4 rounded-2xl mr-5">
                <Mic size={24} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 font-outfit mb-1">Voice Companion</Text>
                <Text className="text-gray-500 text-xs leading-5 font-inter">Natural, soothing voice interaction powered by ElevenLabs for hands-free support.</Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="bg-purple-50 p-4 rounded-2xl mr-5">
                <Trophy size={24} color="#9B72CF" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 font-outfit mb-1">Gamified Health</Text>
                <Text className="text-gray-500 text-xs leading-5 font-inter">Earn badges, unlock achievements, and build streaks as you prioritize self-care.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Why HIM */}
        <View className="bg-gray-50 px-8 py-20 mb-10">
          <Text className="text-2xl font-bold text-gray-900 font-outfit text-center mb-12">Why Choose HIM?</Text>
          
          <View className="gap-y-8">
            <View className="items-center">
              <Shield size={32} color="#FF7096" />
              <Text className="text-base font-bold text-gray-900 font-outfit mt-4 mb-1">Privacy by Design</Text>
              <Text className="text-xs text-gray-500 text-center font-inter px-10">Your data is encrypted and strictly private. We never sell your health info.</Text>
            </View>

            <View className="items-center">
              <Sparkles size={32} color="#9B8EC0" />
              <Text className="text-base font-bold text-gray-900 font-outfit mt-4 mb-1">Premium Experience</Text>
              <Text className="text-xs text-gray-500 text-center font-inter px-10">A beautiful, calming interface designed to reduce stress.</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="bg-gray-900 px-8 py-16 items-center">
          <View className="flex-row items-center mb-6">
            <Heart size={24} color="white" fill="white" />
            <Text className="text-2xl font-bold text-white font-outfit ml-2">HIM</Text>
          </View>
          <Text className="text-gray-400 text-center text-xs font-inter leading-5 mb-8">
            Her Intelligent Mate — Empowering women through AI-driven wellness and empathetic technology.
          </Text>
          <Text className="text-gray-600 text-[10px] font-inter">© 2026 HIM. All Rights Reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
