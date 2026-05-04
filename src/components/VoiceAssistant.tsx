import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Mic, StopCircle, Heart, Wind, MessageSquare, BookOpen } from 'lucide-react-native';
import { Conversation } from '@elevenlabs/client';

// Use the same Agent ID as the working PHP version
const AGENT_ID = 'agent_9101kp14nztefgw986jp2kkyg07f';

interface VoiceAssistantProps {
  phaseColor: string;
  phaseIcon: string;
  phaseName: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ phaseColor, phaseName }) => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Tap to speak');
  const [conversation, setConversation] = useState<any>(null);
  const [pulseAnim] = useState(new Animated.Value(1));

  // Breathing ring animation
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

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
            setStatus('Failed to connect. Try again.');
            setIsListening(false);
          },
          onModeChange: (mode: any) => {
            if (mode.mode === 'speaking') {
              setStatus('HIM is speaking...');
            } else {
              setStatus('Listening...');
            }
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
    <View className="flex-1 items-center py-10 bg-white">
      <View className="mb-10 items-center">
        <Text className="text-3xl font-bold text-gray-900 mb-2 font-outfit">Voice Assistant</Text>
        <Text className="text-lg text-gray-500 mb-4 font-inter text-center px-6">
          I'm here for you. Just speak, and I'll listen.
        </Text>
        <View 
          className="px-4 py-2 rounded-full flex-row items-center" 
          style={{ backgroundColor: `${phaseColor}20` }}
        >
          <Text style={{ color: phaseColor }} className="font-bold font-inter uppercase tracking-widest text-xs">
            {phaseName}
          </Text>
        </View>
      </View>

      <View className="relative justify-center items-center h-40 w-40">
        {isListening && (
          <Animated.View 
            style={{ 
              transform: [{ scale: pulseAnim }],
              borderColor: phaseColor,
              opacity: 0.3
            }}
            className="absolute w-40 h-40 rounded-full border-4"
          />
        )}
        <TouchableOpacity 
          onPress={toggleConversation}
          className={`w-24 h-24 rounded-full items-center justify-center shadow-lg ${isListening ? 'bg-red-500' : 'bg-primary'}`}
          style={!isListening ? { backgroundColor: '#FF7096' } : {}}
        >
          {isListening ? (
            <StopCircle size={40} color="white" />
          ) : (
            <Mic size={40} color="white" />
          )}
        </TouchableOpacity>
      </View>
      
      <Text className="mt-8 text-gray-400 font-medium font-inter">{status}</Text>

      <View className="flex-row flex-wrap justify-center gap-4 mt-12 px-6">
        <TouchableOpacity className="bg-white border border-gray-100 p-6 rounded-2xl items-center w-32 shadow-sm">
          <Wind size={24} color="#FF7096" />
          <Text className="mt-2 text-xs font-semibold text-gray-600 font-inter">Breathing</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border border-gray-100 p-6 rounded-2xl items-center w-32 shadow-sm">
          <MessageSquare size={24} color="#FF7096" />
          <Text className="mt-2 text-xs font-semibold text-gray-600 font-inter">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border border-gray-100 p-6 rounded-2xl items-center w-32 shadow-sm">
          <BookOpen size={24} color="#FF7096" />
          <Text className="mt-2 text-xs font-semibold text-gray-600 font-inter">Wellness</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoiceAssistant;
