import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Headphones, Music, Sparkles, ChevronLeft, Play, Heart } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';

const { width } = Dimensions.get('window');

const musicContent = [
  { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio', tag: 'Study/Focus' },
  { id: '5qap5aO4i9A', title: 'Lofi Girl - Sleep Beats', tag: 'Relaxation' },
  { id: 'DWcUYEY6Wp4', title: 'Calm Piano Music', tag: 'Meditation' }
];

const videoContent = [
  { id: 'v7AYKMP6rOE', title: '10 Min Morning Yoga', tag: 'Yoga' },
  { id: 'inpok4MKVLM', title: '5 Min Guided Meditation', tag: 'Mindfulness' },
  { id: 's98U9O69D0I', title: 'Cycle Syncing 101', tag: 'Education' }
];

const AudioLibraryScreen = ({ navigation }: any) => {
  const { maxContentWidth, contentPadding, isDesktop, isTablet } = useResponsive();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        {/* Premium Header */}
        <View className="flex-row items-center justify-between px-8 py-8">
          <TouchableOpacity onPress={() => navigation?.goBack()} className="bg-white p-3 rounded-2xl shadow-soft">
            <ChevronLeft size={24} color="#8B004A" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-xl font-bold font-outfit tracking-tight">Wellness Media</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Audio & Video</Text>
          </View>
          <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-soft">
            <Heart size={20} color="#8B004A" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(800)} className="items-center mb-12 px-10">
          <View className="bg-primary/5 p-6 rounded-5xl mb-6">
            <Headphones size={48} color="#8B004A" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 font-outfit text-center tracking-tighter mb-4">Your Inner Harmony</Text>
          <Text className="text-gray-500 font-inter text-center leading-6 text-sm">
            A curated selection of soothing sounds and guided rituals to align with your cycle.
          </Text>
        </Animated.View>

        {/* Music Section */}
        <View className="mb-14">
          <View className="px-8 flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
              <View className="bg-primary/10 p-2.5 rounded-2xl mr-4">
                <Music size={22} color="#8B004A" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 font-outfit tracking-tight">Sonic Comfort</Text>
            </View>
            <View className="bg-white px-4 py-2 rounded-full border border-white shadow-soft">
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lo-Fi Beats</Text>
            </View>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            {musicContent.map((item, i) => (
              <Animated.View key={item.id} entering={FadeInUp.delay(i * 100)} className="mr-6">
                <View className="bg-white rounded-5xl overflow-hidden shadow-soft border border-white w-[300px]">
                  <YoutubePlayer
                    height={180}
                    play={false}
                    videoId={item.id}
                  />
                  <View className="p-7">
                    <View className="bg-primary-light px-4 py-1.5 rounded-full self-start mb-4">
                      <Text className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.tag}</Text>
                    </View>
                    <Text className="text-xl font-bold text-gray-900 font-outfit mb-4">{item.title}</Text>
                    <TouchableOpacity className="bg-gray-900 flex-row items-center justify-center py-4 rounded-3xl">
                      <Play size={16} color="white" fill="white" />
                      <Text className="text-white font-bold text-xs uppercase tracking-widest ml-2">Listen Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            ))}
            <View className="w-6" />
          </ScrollView>
        </View>

        {/* Wellness Videos Section */}
        <View className="px-6 mb-20">
          <View className="px-2 flex-row items-center mb-8">
            <View className="bg-secondary/10 p-2.5 rounded-2xl mr-4">
              <Sparkles size={22} color="#A93226" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 font-outfit tracking-tight">Guided Rituals</Text>
          </View>
          
          <View className={`gap-y-10 ${isDesktop || isTablet ? 'flex-row flex-wrap justify-between gap-x-4' : ''}`}>
            {videoContent.map((item, i) => (
              <Animated.View key={item.id} entering={FadeInDown.delay(i * 100)} className={isDesktop || isTablet ? 'w-[48%]' : 'w-full'}>
                <GlassCard intensity={40} style={{ borderRadius: 50, padding: 0, overflow: 'hidden' }}>
                  <YoutubePlayer
                    height={200}
                    play={false}
                    videoId={item.id}
                  />
                  <View className="p-8">
                    <View className="flex-row justify-between items-center mb-4">
                      <View className="bg-secondary/10 px-4 py-1.5 rounded-full">
                        <Text className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.tag}</Text>
                      </View>
                      <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ritual Video</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 font-outfit mb-4">{item.title}</Text>
                    <Text className="text-sm text-gray-500 font-inter leading-6 mb-8">
                      Experience this mindful ritual designed to bring balance to your day.
                    </Text>
                    <TouchableOpacity className="bg-white py-4 rounded-3xl items-center shadow-soft border border-gray-50">
                      <Text className="text-gray-900 font-bold text-xs uppercase tracking-widest">Start Session</Text>
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              </Animated.View>
            ))}
          </View>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AudioLibraryScreen;
