import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Headphones, Music, Sparkles, ChevronLeft } from 'lucide-react-native';

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
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity onPress={() => navigation?.goBack()} className="p-2 -ml-2">
            <ChevronLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-xl font-bold font-outfit">Wellness Media</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Audio & Video</Text>
          </View>
          <View className="w-10" />
        </View>

        <View className="items-center mb-10">
          <Headphones size={40} color="#FF7096" />
          <Text className="text-gray-500 font-inter text-center mt-3 px-6">
            Curated YouTube music and video for focus, sleep, and mindfulness
          </Text>
        </View>

        {/* Music Section */}
        <View className="mb-12">
          <View className="flex-row items-center mb-6">
            <View className="bg-primary-light p-2 rounded-xl mr-3">
              <Music size={20} color="#FF7096" />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">Soothing Music & Lo-fi</Text>
          </View>
          
          <View className="gap-y-8">
            {musicContent.map((item) => (
              <View key={item.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={item.id}
                />
                <View className="p-5">
                  <View className="bg-primary-light px-3 py-1 rounded-full self-start mb-2">
                    <Text className="text-[10px] font-bold text-primary uppercase">{item.tag}</Text>
                  </View>
                  <Text className="text-base font-bold text-gray-900 font-outfit">{item.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Wellness Videos Section */}
        <View className="mb-12">
          <View className="flex-row items-center mb-6">
            <View className="bg-blue-50 p-2 rounded-xl mr-3">
              <Sparkles size={20} color="#3B82F6" />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">Guided Wellness & Yoga</Text>
          </View>
          
          <View className="gap-y-8">
            {videoContent.map((item) => (
              <View key={item.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={item.id}
                />
                <View className="p-5">
                  <View className="bg-blue-50 px-3 py-1 rounded-full self-start mb-2">
                    <Text className="text-[10px] font-bold text-blue-500 uppercase">{item.tag}</Text>
                  </View>
                  <Text className="text-base font-bold text-gray-900 font-outfit">{item.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AudioLibraryScreen;
