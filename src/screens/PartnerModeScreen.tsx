import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Link, Shield, Users, CheckCircle, ChevronLeft, Mail, Info } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useResponsive } from '../hooks/useResponsive';

const PartnerModeScreen = ({ navigation }: any) => {
  const [partnerEmail, setPartnerEmail] = useState('');
  const { maxContentWidth, contentPadding } = useResponsive();

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
            <View className="bg-blue-50 px-3 py-1 rounded-full mb-1">
              <Text className="text-[10px] font-bold text-blue-500 uppercase">Beta Feature</Text>
            </View>
            <Text className="text-xl font-bold font-outfit">Partner Sharing</Text>
          </View>
          <View className="w-10" />
        </View>

        <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-10">
          <Text className="text-gray-500 font-inter text-center px-4">
            Sync your cycle with a partner to foster understanding and ensure you have support exactly when you need it.
          </Text>
        </Animated.View>

        {/* Connect Card */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} className="bg-blue-50/50 border border-blue-100 p-8 rounded-[40px] mb-8">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-3 rounded-2xl mr-4">
              <Link size={24} color="white" />
            </View>
            <Text className="text-lg font-bold text-gray-900 font-outfit">Connect a Partner</Text>
          </View>
          <Text className="text-xs text-gray-500 font-inter leading-5 mb-8">
            Invite your partner to view your cycle status and receive phase-specific tips on how to support you.
          </Text>

          <View className="mb-6">
            <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Partner's Email</Text>
            <View className="flex-row items-center bg-white border border-blue-100 rounded-2xl px-6 py-4">
              <Mail size={18} color="#9CA3AF" />
              <TextInput 
                className="flex-1 ml-3 text-gray-900 font-inter" 
                placeholder="partner@example.com" 
                value={partnerEmail}
                onChangeText={setPartnerEmail}
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity className="bg-blue-500 p-5 rounded-2xl flex-row items-center justify-center">
            <Text className="text-white font-bold font-outfit">Send Invite</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Privacy Note */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} className="flex-row bg-blue-50 p-6 rounded-3xl mb-10 items-center">
          <Shield size={20} color="#3B82F6" />
          <Text className="flex-1 ml-3 text-[11px] text-blue-700 font-inter leading-5">
            Your partner will <Text className="font-bold">only</Text> see your current phase name and wellness tips. Detailed logs remain private.
          </Text>
        </Animated.View>

        {/* Benefits */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} className="mb-12">
          <Text className="text-lg font-bold text-gray-900 font-outfit mb-6">Why use Partner Mode?</Text>
          
          <View className="gap-y-6">
            <View className="flex-row">
              <View className="mt-1">
                <CheckCircle size={20} color="#3B82F6" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-bold text-gray-900 font-inter mb-1">Phase Transparency</Text>
                <Text className="text-xs text-gray-500 font-inter leading-5">Helps partners understand mood shifts and energy levels.</Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="mt-1">
                <CheckCircle size={20} color="#3B82F6" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-bold text-gray-900 font-inter mb-1">Support Tips</Text>
                <Text className="text-xs text-gray-500 font-inter leading-5">Gives partners actionable advice on how to help (e.g., "bring her favorite snacks today").</Text>
              </View>
            </View>

            <View className="flex-row">
              <View className="mt-1">
                <CheckCircle size={20} color="#3B82F6" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-bold text-gray-900 font-inter mb-1">Shared Calendar</Text>
                <Text className="text-xs text-gray-500 font-inter leading-5">Plan activities, trips, or events around your cycle more easily.</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PartnerModeScreen;
