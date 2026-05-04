import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Spa, Heart, BookOpen, Bell, Droplet, Couch, Bed, Apple, Info, Headphones } from 'lucide-react-native';

const categories = ['All', 'Cycle', 'Nutrition', 'Mental Health', 'Fitness', 'Sleep'];

const articles = [
  { cat: 'Cycle', tag: 'Cycle Health', title: 'Understanding Your Menstrual Cycle', desc: 'Learn the 4 phases and how each affects your mood, energy, and body.', read: '8 min' },
  { cat: 'Nutrition', tag: 'Nutrition', title: 'Best Foods to Eat During Your Period', desc: 'From dark chocolate to leafy greens, discover the foods that reduce cramps.', read: '6 min' },
  { cat: 'Mental Health', tag: 'Mental Health', title: 'How Hormones Affect Your Mood', desc: 'Estrogen, progesterone, serotonin — understand the connection.', read: '7 min' },
];

const WellnessScreen = () => {
  const [selectedCat, setSelectedCat] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="items-center mb-8">
          <View className="flex-row items-center mb-2">
            <Spa size={32} color="#7CB69E" />
            <Text className="text-3xl font-bold font-outfit ml-3">Wellness Hub</Text>
          </View>
          <Text className="text-gray-500 font-inter text-center mb-6">
            Embrace your <Text className="text-primary font-bold">Menstrual Phase</Text>. Cozy vibes only.
          </Text>
          <TouchableOpacity 
            onPress={() => navigation?.navigate('AudioLibrary')}
            className="bg-primary-light px-6 py-3 rounded-2xl flex-row items-center"
          >
            <Headphones size={18} color="#FF7096" />
            <Text className="text-primary font-bold text-xs ml-2">Open Media Library</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Affirmation */}
        <View className="bg-primary/5 border border-primary/10 p-10 rounded-[40px] mb-8 items-center">
          <Text className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Daily Affirmation</Text>
          <Text className="text-2xl font-bold text-gray-900 font-outfit text-center mb-4">I am at peace with my body's natural rhythm.</Text>
          <Text className="text-gray-500 text-center font-inter leading-6">Today, I choose to listen to what my body needs and provide it with the rest it deserves.</Text>
        </View>

        {/* Tips Section */}
        <Text className="text-xl font-bold text-gray-900 font-outfit mb-6 text-center">Nurturing Tips</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 overflow-visible">
          {[1, 2, 3].map((i) => (
            <View key={i} className="bg-white border border-gray-100 p-6 rounded-[32px] w-64 mr-4 shadow-sm">
              <View className="bg-primary-light w-10 h-10 rounded-xl items-center justify-center mb-4">
                <Heart size={20} color="#FF7096" />
              </View>
              <Text className="text-xs text-gray-400 font-bold uppercase mb-2">Self-Care</Text>
              <Text className="text-base font-bold text-gray-900 font-outfit mb-2">Warm Herbal Tea</Text>
              <Text className="text-xs text-gray-500 font-inter leading-5">Sipping on chamomile or ginger tea can significantly help reduce menstrual cramps and bloating.</Text>
            </View>
          ))}
        </ScrollView>

        {/* Library Section */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 font-outfit mb-2 text-center">Wellness Library</Text>
          <Text className="text-gray-500 text-center font-inter mb-6">Curated reads for every phase of your cycle</Text>
          
          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setSelectedCat(cat)}
                className={`px-6 py-2 rounded-full mr-3 border-2 ${selectedCat === cat ? 'bg-primary border-primary' : 'bg-white border-primary-light'}`}
              >
                <Text className={`font-bold text-xs ${selectedCat === cat ? 'text-white' : 'text-primary'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Article List */}
          <View className="gap-y-6">
            {articles.map((art, i) => (
              <TouchableOpacity key={i} className="bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="bg-primary-light px-3 py-1 rounded-full">
                    <Text className="text-[10px] font-bold text-primary uppercase">{art.tag}</Text>
                  </View>
                  <Text className="text-[10px] text-gray-400 font-inter">{art.read}</Text>
                </View>
                <Text className="text-lg font-bold text-gray-900 font-outfit mb-2">{art.title}</Text>
                <Text className="text-xs text-gray-500 font-inter leading-5 mb-4">{art.desc}</Text>
                <TouchableOpacity className="bg-primary px-6 py-3 rounded-2xl self-start">
                  <Text className="text-white font-bold text-xs">Read Article</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reminders */}
        <View className="bg-white border border-gray-100 p-10 rounded-[40px] mb-12 items-center shadow-sm">
          <Text className="text-xl font-bold text-gray-900 font-outfit mb-8">Gentle Reminders</Text>
          <View className="flex-row flex-wrap justify-center gap-10">
            <View className="items-center w-[35%]">
              <Droplet size={32} color="#FF7096" />
              <Text className="text-[11px] font-bold text-gray-700 mt-2">Stay Hydrated</Text>
            </View>
            <View className="items-center w-[35%]">
              <Couch size={32} color="#7CB69E" />
              <Text className="text-[11px] font-bold text-gray-700 mt-2">Move Gently</Text>
            </View>
            <View className="items-center w-[35%]">
              <Bed size={32} color="#9B8EC0" />
              <Text className="text-[11px] font-bold text-gray-700 mt-2">Rest Well</Text>
            </View>
            <View className="items-center w-[35%]">
              <Apple size={32} color="#F4A261" />
              <Text className="text-[11px] font-bold text-gray-700 mt-2">Nourish</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default WellnessScreen;
