import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Mic, StopCircle, Heart, Wind, MessageSquare, BookOpen, Sparkles } from 'lucide-react-native';
import { Conversation } from '@elevenlabs/client';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import GlassCard from './GlassCard';

const AGENT_ID = 'agent_9101kp14nztefgw986jp2kkyg07f';

interface VoiceAssistantProps {
  phaseColor: string;
  phaseName: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ phaseColor, phaseName }) => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Tap to speak');
  const [conversation, setConversation] = useState<any>(null);
  
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isListening) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      pulse.value = 1;
    }
  }, [isListening]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: withTiming(isListening ? 0.4 : 0),
  }));

  const toggleConversation = useCallback(async () => {
    if (isListening) {
      if (conversation) {
        await conversation.endSession();
      }
      setIsListening(false);
      setStatus('Tap to speak');
    } else {
      try {
        setStatus('Connecting...');
        const conv = await Conversation.startSession({
          agentId: AGENT_ID,
          onConnect: () => {
            setIsListening(true);
            setStatus('Connected. Speak now...');
          },
          onDisconnect: () => {
            setIsListening(false);
            setStatus('Tap to speak');
          },
          onError: (error: any) => {
            console.error('ConvAI Error:', error);
            setStatus('Connection Error');
            setIsListening(false);
          },
          onModeChange: (mode: any) => {
            setStatus(mode.mode === 'speaking' ? 'HIM is speaking...' : 'Listening...');
          },
        });
        setConversation(conv);
      } catch (err) {
        console.error('Failed to connect:', err);
        setStatus('Connection failed');
      }
    }
  }, [isListening, conversation]);

  return (
    <View className="flex-1 items-center px-8 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <Animated.View entering={FadeInDown.duration(800)} className="items-center mt-12 mb-16">
        <View className="bg-white p-5 rounded-4xl shadow-soft mb-8">
          <Sparkles size={32} color="#8B004A" />
        </View>
        <Text className="text-4xl font-bold text-gray-900 font-outfit tracking-tighter text-center">Voice Companion</Text>
        <Text className="text-base text-gray-500 mt-3 font-inter text-center leading-6">
          I'm here for you Sarah. Just speak, and I'll listen with empathy.
        </Text>
      </Animated.View>

      <View className="relative justify-center items-center h-56 w-56 mb-12">
        <Animated.View 
          style={[
            animatedPulseStyle,
            { 
              width: 180, 
              height: 180, 
              borderRadius: 90, 
              borderWidth: 4, 
              borderColor: '#8B004A',
              position: 'absolute'
            }
          ]}
        />
        <TouchableOpacity 
          onPress={toggleConversation}
          activeOpacity={0.9}
          className={`w-32 h-32 rounded-full items-center justify-center shadow-premium ${isListening ? 'bg-secondary' : 'bg-primary'}`}
        >
          {isListening ? (
            <StopCircle size={48} color="white" fill="white" />
          ) : (
            <Mic size={48} color="white" />
          )}
        </TouchableOpacity>
      </View>
      
      <View className="bg-white px-8 py-3 rounded-full border border-white shadow-soft">
        <Text className="text-primary font-bold font-inter text-xs uppercase tracking-widest">{status}</Text>
      </View>

      <View className="flex-row justify-between w-full mt-20 gap-x-4">
        {[
          { icon: Wind, label: 'Breathing', color: '#8B004A' },
          { icon: MessageSquare, label: 'Chat', color: '#A93226' },
          { icon: BookOpen, label: 'Wellness', color: '#D4AF37' }
        ].map((item, i) => (
          <TouchableOpacity key={i} className="flex-1">
            <GlassCard intensity={30} style={{ padding: 20, alignItems: 'center', borderRadius: 32 }}>
              <item.icon size={24} color={item.color} />
              <Text className="mt-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.label}</Text>
            </GlassCard>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default VoiceAssistant;
