import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Send, Smile, Info, ChevronLeft, Mic, Volume2, Sparkles, Heart } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import Animated, { FadeInDown, FadeInRight, FadeInLeft } from 'react-native-reanimated';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { createChatSession, saveMessage, getChatHistory, getAiResponse } from '../services/chatService';
import { getProfile } from '../services/profile';
import { getCurrentPhase } from '../utils/cycle';
import { useResponsive } from '../hooks/useResponsive';

interface ChatMessage {
  id: string | number;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

const ChatScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState('follicular');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { maxContentWidth } = useResponsive();

  useEffect(() => {
    if (user) initChat();
  }, [user]);

  const initChat = async () => {
    try {
      // Get cycle phase
      const { cycleSettings } = await getProfile(user!.id);
      let phase = 'follicular';
      if (cycleSettings.last_period_start) {
        phase = getCurrentPhase(
          cycleSettings.last_period_start,
          cycleSettings.avg_cycle_length,
          cycleSettings.avg_period_length
        );
      }
      setCurrentPhase(phase);

      // Create chat session
      const session = await createChatSession(user!.id, phase);
      setSessionId(session.id);

      // Add initial greeting
      const firstName = user!.full_name.split(' ')[0];
      const greeting: ChatMessage = {
        id: Date.now(),
        sender: 'ai',
        text: `Hi ${firstName}! I'm here for you. How are you feeling in your ${phase} phase today? ✨`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory([greeting]);
      
      // Save greeting to DB
      await saveMessage(session.id, 'ai', greeting.text);
    } catch (error) {
      console.error('Chat init error:', error);
      // Still show a greeting even if DB fails
      const firstName = user?.full_name?.split(' ')[0] || 'Friend';
      setChatHistory([{
        id: Date.now(),
        sender: 'ai',
        text: `Hi ${firstName}! I'm here for you. How are you feeling today? ✨`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  };

  const speak = (text: string) => {
    Speech.speak(text, {
      rate: 0.9,
      pitch: 1.1,
    });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userText = message.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newUserMsg: ChatMessage = { 
      id: Date.now(), 
      sender: 'user', 
      text: userText, 
      time: now 
    };
    setChatHistory(prev => [...prev, newUserMsg]);
    setMessage('');
    setIsTyping(true);

    try {
      // Save user message
      if (sessionId) {
        await saveMessage(sessionId, 'user', userText);
      }

      // Get AI response
      const firstName = user?.full_name?.split(' ')[0] || 'Friend';
      const aiText = await getAiResponse(userText, currentPhase, firstName);
      
      const aiResponse: ChatMessage = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setChatHistory(prev => [...prev, aiResponse]);

      // Save AI message
      if (sessionId) {
        await saveMessage(sessionId, 'ai', aiText);
      }
    } catch (error) {
      console.error('Send message error:', error);
      const aiResponse: ChatMessage = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: "I'm having a little trouble right now, but I'm still here for you. Please try again. 🌸",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center', flex: 1 }}>
        {/* Premium Header */}
        <View className="flex-row items-center justify-between px-8 py-6 bg-white/80 border-b border-white shadow-soft">
          <TouchableOpacity onPress={() => navigation?.goBack()} className="p-2 -ml-2 bg-background rounded-2xl">
            <ChevronLeft size={24} color="#8B004A" />
          </TouchableOpacity>
          <View className="items-center">
            <View className="flex-row items-center mb-0.5">
              <Sparkles size={14} color="#D4AF37" className="mr-1.5" />
              <Text className="text-xl font-bold font-outfit tracking-tight">HIM Companion</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-sm shadow-green-200" />
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">Empathetic Presence</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2 -mr-2 bg-background rounded-2xl">
            <Heart size={20} color="#8B004A" />
          </TouchableOpacity>
        </View>

        {/* Chat Content */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-6 pt-8"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.map((msg, i) => (
            <Animated.View 
              key={msg.id} 
              entering={msg.sender === 'user' ? FadeInRight.duration(500) : FadeInLeft.duration(500)}
              className={`mb-8 flex-row ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3 mt-1 shadow-sm">
                  <Sparkles size={20} color="#8B004A" />
                </View>
              )}
              
              <View className={`max-w-[78%] p-6 rounded-4xl shadow-soft ${
                msg.sender === 'user' 
                  ? 'bg-primary rounded-tr-none' 
                  : 'bg-white border border-white rounded-tl-none'
              }`}>
                <Text className={`text-base leading-7 font-inter ${
                  msg.sender === 'user' ? 'text-white' : 'text-gray-800 font-medium'
                }`}>
                  {msg.text}
                </Text>
                <View className="flex-row items-center justify-between mt-3">
                  <Text className={`text-[10px] font-bold uppercase tracking-widest ${
                    msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                  }`}>
                    {msg.time}
                  </Text>
                  {msg.sender === 'ai' && (
                    <TouchableOpacity onPress={() => speak(msg.text)} className="bg-primary/5 p-1.5 rounded-lg">
                      <Volume2 size={14} color="#8B004A" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Animated.View>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <Animated.View entering={FadeInLeft.duration(300)} className="mb-8 flex-row justify-start">
              <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3 mt-1 shadow-sm">
                <Sparkles size={20} color="#8B004A" />
              </View>
              <View className="bg-white border border-white rounded-4xl rounded-tl-none p-6 shadow-soft">
                <Text className="text-gray-400 font-inter">Thinking... 💭</Text>
              </View>
            </Animated.View>
          )}

          <View className="h-10" />
        </ScrollView>

        {/* Modern Floating Input Area */}
        <Animated.View entering={FadeInUp.duration(600)} className="px-6 py-8">
          <GlassCard intensity={60} style={{ borderRadius: 50, padding: 8, shadowColor: '#8B004A', shadowOpacity: 0.1, shadowRadius: 20 }}>
            <View className="flex-row items-center">
              <TouchableOpacity className="p-4 rounded-full bg-background ml-1">
                <Smile size={24} color="#8B004A" opacity={0.7} />
              </TouchableOpacity>
              
              <TextInput
                className="flex-1 px-4 py-3 text-gray-900 font-inter text-base max-h-32"
                placeholder="Share your thoughts..."
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline
              />
              
              <TouchableOpacity 
                onPress={sendMessage} 
                activeOpacity={0.8}
                disabled={isTyping}
                className={`p-4 rounded-full mr-1 ${message.trim() && !isTyping ? 'bg-primary' : 'bg-gray-100'}`}
              >
                <Send size={24} color={message.trim() && !isTyping ? 'white' : '#9CA3AF'} />
              </TouchableOpacity>
            </View>
          </GlassCard>
          
          <View className="flex-row justify-center mt-6 gap-x-8">
            <TouchableOpacity className="items-center">
              <View className="bg-white p-4 rounded-3xl shadow-soft">
                <Mic size={24} color="#8B004A" />
              </View>
              <Text className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Voice Mode</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
