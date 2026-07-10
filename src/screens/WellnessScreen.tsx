import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Flower2, Heart, BookOpen, Bell, Droplet, Sofa as Couch, Bed, Apple, Info, Headphones, Sparkles, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';

const categories = ['All', 'Cycle', 'Nutrition', 'Mental Health', 'Fitness', 'Sleep'];

const articles = [
  { cat: 'Cycle', tag: 'Cycle Health', title: 'Understanding Your Menstrual Cycle', desc: 'Learn the 4 phases and how each affects your mood, energy, and body.', read: '8 min' },
  { cat: 'Nutrition', tag: 'Nutrition', title: 'Best Foods to Eat During Your Period', desc: 'From dark chocolate to leafy greens, discover the foods that reduce cramps.', read: '6 min' },
  { cat: 'Mental Health', tag: 'Mental Health', title: 'How Hormones Affect Your Mood', desc: 'Estrogen, progesterone, serotonin — understand the connection.', read: '7 min' },
];

const WellnessScreen = ({ navigation }: any) => {
  const [selectedCat, setSelectedCat] = useState('All');
  const { isDesktop, isTablet, contentPadding, maxContentWidth } = useResponsive();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        {/* Header */}
        <View className="px-8 pt-12 pb-10 items-center">
          <Animated.View entering={FadeInDown.duration(600)} className="bg-primary/5 p-4 rounded-4xl mb-6">
            <Flower2 size={40} color="#8B004A" />
          </Animated.View>
          <Animated.Text entering={FadeInDown.delay(100).duration(600)} className="text-[42px] font-bold text-gray-900 font-outfit tracking-tighter text-center">Wellness Hub</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(200).duration(600)} className="text-gray-500 font-inter text-center mt-3 leading-6 px-4">
            Embrace your <Text className="text-primary font-bold">Cycle Rhythm</Text>.{'\n'}Cozy vibes, always.
          </Animated.Text>
        </View>

        {/* Daily Affirmation */}
        <Animated.View entering={FadeInDown.delay(300).duration(800)} className="px-6 mb-12">
          <GlassCard intensity={50} style={{ padding: 40, borderRadius: 50 }}>
            <View className="items-center">
              <Sparkles size={24} color="#D4AF37" />
              <Text className="text-primary font-bold text-[10px] uppercase tracking-[4px] mt-4 mb-4">Daily Ritual</Text>
              <Text className="text-2xl font-bold text-gray-900 font-outfit text-center mb-4 leading-8">I am at peace with my body's natural rhythm.</Text>
              <Text className="text-gray-500 text-center font-inter leading-6 text-sm">Today, I choose to listen to what my body needs and provide it with the rest it deserves.</Text>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Quick Media Access */}
        <Animated.View entering={FadeInDown.delay(400).duration(800)} className="px-6 mb-12">
          <TouchableOpacity 
            onPress={() => navigation?.navigate('AudioLibrary')}
            activeOpacity={0.9}
            className="bg-white border border-white p-7 rounded-4xl flex-row items-center justify-between shadow-soft"
          >
            <View className="flex-row items-center">
              <View className="bg-primary-light p-3 rounded-2xl mr-4">
                <Headphones size={24} color="#8B004A" />
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900 font-outfit">Soothing Sounds</Text>
                <Text className="text-xs text-gray-500 font-inter">Open your media library</Text>
              </View>
            </View>
            <View className="bg-primary/10 p-2 rounded-xl">
              <ChevronRight size={20} color="#8B004A" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Library Filters */}
        <Animated.View entering={FadeInDown.delay(500).duration(800)} className="mb-10">
          <Text className="px-8 text-xl font-bold text-gray-900 font-outfit mb-6">Wellness Library</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            {categories.map((cat, i) => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setSelectedCat(cat)}
                activeOpacity={0.7}
                className={`px-8 py-3.5 rounded-4xl mr-4 ${selectedCat === cat ? 'bg-primary shadow-premium' : 'bg-white border border-white'}`}
              >
                <Text className={`font-bold text-[11px] uppercase tracking-widest ${selectedCat === cat ? 'text-white' : 'text-gray-400'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
            <View className="w-10" />
          </ScrollView>
        </Animated.View>

        {/* Article Cards */}
        <View className={`px-6 gap-y-6 gap-x-4 mb-12 ${isDesktop || isTablet ? 'flex-row flex-wrap justify-between' : ''}`}>
          {articles.map((art, i) => (
            <Animated.View key={i} entering={FadeInRight.delay(i * 100).duration(600)} className={isDesktop ? 'w-[31%]' : isTablet ? 'w-[48%]' : 'w-full'}>
              <TouchableOpacity activeOpacity={0.9} className="bg-white p-8 rounded-5xl shadow-soft border border-white">
                <View className="flex-row justify-between items-center mb-5">
                  <View className="bg-primary/5 px-4 py-1.5 rounded-full">
                    <Text className="text-[10px] font-bold text-primary uppercase tracking-widest">{art.tag}</Text>
                  </View>
                  <Text className="text-[10px] text-gray-400 font-inter uppercase tracking-widest">{art.read} read</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-900 font-outfit mb-3 tracking-tight">{art.title}</Text>
                <Text className="text-sm text-gray-500 font-inter leading-6 mb-8">{art.desc}</Text>
                <TouchableOpacity className="bg-gray-900 py-4 px-8 rounded-3xl self-start shadow-md">
                  <Text className="text-white font-bold text-xs uppercase tracking-widest">Read Article</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Reminders Grid */}
        <Animated.View entering={FadeInDown.delay(600).duration(800)} className="px-6 pb-20">
          <View className="bg-white/80 p-10 rounded-5xl border border-white shadow-soft items-center">
            <Text className="text-xl font-bold text-gray-900 font-outfit mb-10">Gentle Reminders</Text>
            <View className="flex-row flex-wrap justify-between w-full">
              {[
                { icon: Droplet, color: '#8B004A', label: 'Hydrate' },
                { icon: Couch, color: '#A93226', label: 'Rest' },
                { icon: Bed, color: '#8B004A', label: 'Sleep' },
                { icon: Apple, color: '#D4AF37', label: 'Nourish' }
              ].map((item, i) => (
                <View key={i} className={`items-center mb-8 ${isDesktop ? 'w-[22%]' : 'w-[45%]'}`}>
                  <View className="bg-background w-16 h-16 rounded-3xl items-center justify-center mb-3">
                    <item.icon size={28} color={item.color} />
                  </View>
                  <Text className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</Text>
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

export default WellnessScreen;
