import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Heart, Sparkles, MessageCircle, Mic, Trophy, Shield, ChevronRight } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay,
  withRepeat,
  withSequence,
  FadeInDown,
  FadeInUp,
  FadeInRight,
  FadeInLeft
} from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useResponsive } from '../hooks/useResponsive';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }: any) => {
  const { maxContentWidth, isDesktop, isTablet } = useResponsive();
  const floatAnim = useSharedValue(0);

  useEffect(() => {
    floatAnim.value = withRepeat(
      withSequence(
        withSpring(10, { damping: 2, stiffness: 80 }),
        withSpring(0, { damping: 2, stiffness: 80 })
      ),
      -1,
      true
    );
  }, []);

  const animatedHeroStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      {/* Dynamic Background Glows */}
      <View className="absolute top-[-100] right-[-100] w-[400] h-[400] bg-primary/5 rounded-full blur-[100px]" />
      <View className="absolute bottom-[-50] left-[-50] w-[300] h-[300] bg-secondary/5 rounded-full blur-[80px]" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        {/* Hero Section */}
        <View className="px-8 pt-16 pb-12 items-center">
          <Animated.View 
            entering={FadeInDown.duration(800)}
            className="bg-primary/10 px-6 py-2.5 rounded-full mb-8 flex-row items-center border border-primary/20"
          >
            <Sparkles size={16} color="#8B004A" />
            <Text className="text-primary font-bold text-[11px] uppercase tracking-[3px] ml-2">AI-Powered Wellness</Text>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <Text className="text-[44px] font-bold text-gray-900 font-outfit text-center leading-[52px] mb-6 tracking-[-2px]">
              Your <Text className="text-primary">Intelligent</Text> Mate
            </Text>
          </Animated.View>
          
          <Animated.Text 
            entering={FadeInDown.delay(400).duration(800)}
            className="text-gray-600 font-inter text-center leading-7 mb-12 px-2 text-base"
          >
            HIM understands your rhythms, predicts your phase, and provides empathetic comfort when you need it most.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(600).duration(800)} className="w-full gap-y-5">
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => navigation?.navigate('Register')}
              className="bg-primary p-7 rounded-4xl flex-row items-center justify-center shadow-premium"
            >
              <Text className="text-white font-bold text-xl font-outfit mr-2">Begin Your Journey</Text>
              <ChevronRight size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => navigation?.navigate('Login')}
              className="bg-white/60 p-7 rounded-4xl flex-row items-center justify-center border border-white/80"
            >
              <Text className="text-primary font-bold text-lg font-outfit">Dashboard Access</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Visual Illustration */}
        <Animated.View style={animatedHeroStyle} className="items-center mb-24">
          <View className="w-72 h-72 bg-white rounded-5xl items-center justify-center shadow-soft border border-white/50">
            <View className="w-56 h-56 bg-primary/5 rounded-full items-center justify-center">
              <Heart size={140} color="#8B004A" fill="#8B004A" opacity={0.15} />
              <View className="absolute">
                <Sparkles size={48} color="#D4AF37" />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Features Grid */}
        <View className="px-6 mb-24">
          <Text className="text-[11px] font-bold text-primary uppercase tracking-[4px] text-center mb-3">Core Capabilities</Text>
          <Text className="text-3xl font-bold text-gray-900 font-outfit text-center mb-12 tracking-tight">The Future of Care</Text>

          <View className={`gap-y-6 ${isDesktop || isTablet ? 'flex-row flex-wrap justify-between gap-x-4' : ''}`}>
            <Animated.View entering={FadeInRight.delay(200)} className={isDesktop || isTablet ? 'w-[31%]' : 'w-full'}>
              <GlassCard intensity={30} style={{ borderRadius: 40 }}>
                <View className="flex-row items-center">
                  <View className="bg-primary-light p-4 rounded-3xl mr-5">
                    <MessageCircle size={28} color="#8B004A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 font-outfit mb-1">Empathetic Chat</Text>
                    <Text className="text-gray-500 text-sm leading-5 font-inter">Deeply personal AI support that grows with you.</Text>
                  </View>
                </View>
              </GlassCard>
            </Animated.View>

            <Animated.View entering={FadeInLeft.delay(400)} className={isDesktop || isTablet ? 'w-[31%]' : 'w-full'}>
              <GlassCard intensity={30} style={{ borderRadius: 40 }}>
                <View className="flex-row items-center">
                  <View className="bg-white p-4 rounded-3xl mr-5 shadow-sm">
                    <Mic size={28} color="#A93226" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 font-outfit mb-1">Voice Ally</Text>
                    <Text className="text-gray-500 text-sm leading-5 font-inter">Hands-free comfort powered by human-like voice AI.</Text>
                  </View>
                </View>
              </GlassCard>
            </Animated.View>

            <Animated.View entering={FadeInRight.delay(600)} className={isDesktop || isTablet ? 'w-[31%]' : 'w-full'}>
              <GlassCard intensity={30} style={{ borderRadius: 40 }}>
                <View className="flex-row items-center">
                  <View className="bg-primary/5 p-4 rounded-3xl mr-5">
                    <Trophy size={28} color="#D4AF37" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 font-outfit mb-1">Health Rituals</Text>
                    <Text className="text-gray-500 text-sm leading-5 font-inter">Turn self-care into a rewarding daily practice.</Text>
                  </View>
                </View>
              </GlassCard>
            </Animated.View>
          </View>
        </View>

        {/* Security Section */}
        <View className="px-8 pb-24 items-center">
          <View className="bg-white/80 p-10 rounded-5xl border border-white items-center w-full shadow-soft">
            <Shield size={40} color="#8B004A" />
            <Text className="text-2xl font-bold text-gray-900 font-outfit mt-6 mb-3">Privacy First</Text>
            <Text className="text-sm text-gray-500 text-center font-inter leading-6">
              Your data is end-to-end encrypted. We believe your health information is your sacred space.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="bg-gray-900 px-8 py-20 items-center rounded-t-[60px]">
          <View className="flex-row items-center mb-8">
            <View className="bg-primary/20 p-2 rounded-xl">
              <Heart size={28} color="#E6D3DB" fill="#E6D3DB" />
            </View>
            <Text className="text-3xl font-bold text-white font-outfit ml-3">HIM</Text>
          </View>
          <Text className="text-gray-400 text-center text-sm font-inter leading-7 mb-12 px-4">
            Her Intelligent Mate — Reimagining women's wellness through the lens of empathy and AI.
          </Text>
          <View className="w-full h-[1px] bg-gray-800 mb-8" />
          <Text className="text-gray-500 text-xs font-inter uppercase tracking-widest">© 2026 HIM LABS</Text>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
