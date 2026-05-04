import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Send, Smile, Info, ChevronLeft, Mic, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I\'m here for you. How are you feeling today?', time: '10:00 AM' },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const speak = (text: string) => {
    Speech.speak(text, {
      rate: 0.9,
      pitch: 1.1,
    });
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMsg = { id: Date.now(), sender: 'user', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory([...chatHistory, newUserMsg]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { id: Date.now() + 1, sender: 'ai', text: "I hear you. It's completely normal to feel that way during your follicular phase. What's on your mind? 💕", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-50">
          <TouchableOpacity className="p-2 -ml-2">
            <ChevronLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-lg font-bold font-outfit">Chat with HIM</Text>
            <View className="flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Always Online</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2 -mr-2">
            <Info size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Chat Area */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-6 pt-6"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.map((msg) => (
            <View key={msg.id} className={`mb-6 flex-row ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <View className={`max-w-[85%] p-5 rounded-[28px] ${msg.sender === 'user' ? 'bg-primary rounded-tr-none' : 'bg-gray-50 rounded-tl-none'}`}>
                <Text className={`text-sm leading-6 font-inter ${msg.sender === 'user' ? 'text-white' : 'text-gray-900'}`}>
                  {msg.text}
                </Text>
                <Text className={`text-[9px] mt-2 font-bold ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View className="px-6 py-6 border-t border-gray-50 bg-white">
          <View className="flex-row items-center gap-x-3">
            <TouchableOpacity className="bg-gray-50 p-4 rounded-2xl">
              <Smile size={24} color="#9CA3AF" />
            </TouchableOpacity>
            
            <View className="flex-1 bg-gray-50 rounded-[28px] px-6 py-1 flex-row items-center border border-gray-100">
              <TextInput
                className="flex-1 h-12 text-gray-900 font-inter"
                placeholder="Type your message..."
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity onPress={sendMessage} className="ml-2">
                <Send size={20} color={message.trim() ? '#FF7096' : '#9CA3AF'} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="bg-primary p-4 rounded-2xl shadow-sm shadow-primary/30">
              <Mic size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
