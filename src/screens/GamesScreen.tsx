import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { Gamepad, Star, Medal, Trophy, X, Play, RefreshCw, Heart } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateUserPoints, awardBadge } from '../services/api';

const EMOJIS = ['🌸', '✨', '🌙', '🦋', '💖', '🌿', '🔮', '💧'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const generateCards = (): Card[] => {
  const deck = [...EMOJIS, ...EMOJIS].map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
  return deck.sort(() => Math.random() - 0.5);
};

const GamesScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchScore, setMatchScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const [bubbles, setBubbles] = useState<{id: number, x: number, y: number, color: string, popped: boolean}[]>([]);
  const [bubbleScore, setBubbleScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bubbleActive, setBubbleActive] = useState(false);

  const { isDesktop, isTablet, contentPadding, maxContentWidth } = useResponsive();

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const { user: dbUser } = await getProfile(user!.id);
      setPoints(dbUser.points || 0);
      setBadges(dbUser.badges || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addPoints = async (pts: number) => {
    setPoints(p => p + pts);
    if (user) await updateUserPoints(user.id, pts);
  };

  const checkBadge = async (badgeId: string) => {
    if (!badges.includes(badgeId) && user) {
      setBadges(b => [...b, badgeId]);
      await awardBadge(user.id, badgeId);
    }
  };

  const startMoodMatch = () => {
    setActiveGame('mood_match');
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchScore(0);
    setMoves(0);
  };

  const handleCardPress = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatchScore(s => s + 10);
          addPoints(10);
          
          if (matchedCards.every(c => c.isMatched)) {
            addPoints(50); 
            if (moves + 1 <= 12) checkBadge('mind_reader');
          }
        }, 500);
      } else {
        setTimeout(() => {
          const unflippedCards = [...cards];
          unflippedCards[first].isFlipped = false;
          unflippedCards[second].isFlipped = false;
          setCards(unflippedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const startBubblePop = () => {
    setActiveGame('bubble_pop');
    setBubbleScore(0);
    setTimeLeft(30);
    setBubbleActive(true);
    generateBubbles();
  };

  const generateBubbles = () => {
    const colors = ['#FF7096', '#7CB69E', '#F4A261', '#9B8EC0'];
    const newBubbles = Array.from({ length: 8 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      popped: false
    }));
    setBubbles(newBubbles);
  };

  const popBubble = (index: number) => {
    if (!bubbleActive) return;
    const newBubbles = [...bubbles];
    if (newBubbles[index].popped) return;
    
    newBubbles[index].popped = true;
    setBubbles(newBubbles);
    setBubbleScore(s => s + 5);
    addPoints(5);

    if (newBubbles.every(b => b.popped)) {
      generateBubbles();
    }
  };

  useEffect(() => {
    let timer: any;
    if (activeGame === 'bubble_pop' && bubbleActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && bubbleActive) {
      setBubbleActive(false);
      addPoints(20);
      if (bubbleScore >= 100) checkBadge('zen_master');
    }
    return () => clearInterval(timer);
  }, [activeGame, bubbleActive, timeLeft, bubbleScore]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#FF7096" />
      </SafeAreaView>
    );
  }

  const badgeDefinitions = [
    { id: 'early_bird', title: 'Early Bird', desc: 'Logged mood 7 days in a row' },
    { id: 'zen_master', title: 'Zen Master', desc: 'Popped 100 anxiety bubbles' },
    { id: 'mind_reader', title: 'Mind Reader', desc: 'Perfect score in Mood Match' },
    { id: 'cycle_sync', title: 'Cycle Sync', desc: 'Logged full cycle' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: contentPadding, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ maxWidth: maxContentWidth, width: '100%', alignSelf: 'center' }}>
          
        <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-8">
          <View className="flex-row items-center mb-2">
            <Gamepad size={32} color="#8B004A" />
            <Text className="text-3xl font-bold font-outfit ml-3">Games Hub</Text>
          </View>
          <Text className="text-gray-500 font-inter text-center">Make self-care fun and build healthy habits</Text>
        </Animated.View>

        <View className={isDesktop || isTablet ? "flex-row justify-between" : ""}>
          <Animated.View entering={FadeInDown.delay(100).duration(600)} className={`${isDesktop || isTablet ? 'w-[30%]' : 'w-full'} bg-primary/5 border border-primary/10 p-8 rounded-[40px] mb-10 items-center`}>
            <View className="bg-white p-4 rounded-3xl shadow-sm mb-4">
              <Star size={32} color="#D4AF37" fill="#D4AF37" />
            </View>
            <Text className="text-4xl font-bold text-gray-900 font-outfit">{points}</Text>
            <Text className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Total Points</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(600)} className={`${isDesktop || isTablet ? 'w-[65%]' : 'w-full'} mb-10`}>
            <View className="flex-row items-center justify-center mb-6">
              <Medal size={24} color="#D4AF37" />
              <Text className="text-xl font-bold text-gray-900 font-outfit ml-2">My Collection</Text>
            </View>
            
            <View className="flex-row flex-wrap justify-center gap-4">
              {badgeDefinitions.map((badge, i) => {
                const isActive = badges.includes(badge.id);
                return (
                  <View key={i} className={`${isDesktop ? 'w-[23%]' : 'w-[45%]'} bg-white border border-gray-100 p-5 rounded-[32px] items-center shadow-sm ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                    <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-3">
                      <Medal size={24} color="#8B004A" />
                    </View>
                    <Text className="text-sm font-bold text-gray-900 font-outfit text-center">{badge.title}</Text>
                    <Text className="text-[10px] text-gray-400 font-inter text-center mt-1">{badge.desc}</Text>
                  </View>
                );
              })}
            </View>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInUp.delay(300).duration(800)} className="mb-12">
          <View className="flex-row items-center justify-center mb-6">
            <Trophy size={24} color="#7CB69E" />
            <Text className="text-xl font-bold text-gray-900 font-outfit ml-2">Arcade Mini-Games</Text>
          </View>

          <View className={`flex-row flex-wrap ${isDesktop || isTablet ? 'justify-between' : 'justify-center'} gap-y-6`}>
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={startMoodMatch}
              className={`${isDesktop || isTablet ? 'w-[48%]' : 'w-full'} bg-white border border-gray-100 p-8 rounded-[40px] items-center shadow-soft`}
            >
              <Text className="text-4xl mb-4">🃏</Text>
              <Text className="text-xl font-bold text-gray-900 font-outfit mb-2">Mood Match</Text>
              <Text className="text-xs text-gray-500 text-center font-inter mb-6">Test your memory and match the feminine emojis!</Text>
              <View className="bg-primary px-8 py-3 rounded-2xl flex-row items-center shadow-sm shadow-primary/30">
                <Play size={16} color="white" fill="white" />
                <Text className="text-white font-bold ml-2">Play Now</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={startBubblePop}
              className={`${isDesktop || isTablet ? 'w-[48%]' : 'w-full'} bg-white border border-gray-100 p-8 rounded-[40px] items-center shadow-soft`}
            >
              <Text className="text-4xl mb-4">🫧</Text>
              <Text className="text-xl font-bold text-gray-900 font-outfit mb-2">Pop The Stress</Text>
              <Text className="text-xs text-gray-500 text-center font-inter mb-6">Pop as many anxiety bubbles as you can!</Text>
              <View className="bg-primary px-8 py-3 rounded-2xl flex-row items-center shadow-sm shadow-primary/30">
                <Play size={16} color="white" fill="white" />
                <Text className="text-white font-bold ml-2">Play Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
        </View>
      </ScrollView>

      <Modal visible={activeGame !== null} animationType="slide">
        <SafeAreaView className="flex-1 bg-[#F2EFE7]">
          <View className="flex-row items-center justify-between px-6 py-4 bg-white shadow-sm z-10">
            <View className="w-10" />
            <Text className="text-xl font-bold font-outfit">{activeGame === 'mood_match' ? 'Mood Match' : 'Bubble Pop'}</Text>
            <TouchableOpacity onPress={() => setActiveGame(null)} className="p-2 bg-gray-100 rounded-full">
              <X size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 items-center justify-center p-6">
            {activeGame === 'mood_match' && (
              <View className="w-full max-w-[500px] items-center">
                <View className="flex-row justify-between w-full px-4 mb-6">
                  <View className="items-center">
                    <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">Score</Text>
                    <Text className="text-2xl font-bold text-primary font-outfit">{matchScore}</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">Moves</Text>
                    <Text className="text-2xl font-bold text-gray-900 font-outfit">{moves}</Text>
                  </View>
                </View>
                
                <View className="flex-row flex-wrap justify-center gap-3">
                  {cards.map((card, index) => (
                    <TouchableOpacity
                      key={card.id}
                      onPress={() => handleCardPress(index)}
                      className={`w-[22%] aspect-square items-center justify-center rounded-2xl shadow-sm ${card.isFlipped || card.isMatched ? 'bg-white' : 'bg-primary'}`}
                      disabled={card.isMatched || card.isFlipped}
                    >
                      <Text className="text-4xl">{card.isFlipped || card.isMatched ? card.emoji : '✨'}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {cards.length > 0 && cards.every(c => c.isMatched) && (
                  <Animated.View entering={FadeInUp} className="mt-10 items-center bg-white p-6 rounded-3xl shadow-soft">
                    <Heart size={40} color="#8B004A" fill="#8B004A" className="mb-4" />
                    <Text className="text-2xl font-bold text-gray-900 font-outfit mb-2">You Won!</Text>
                    <Text className="text-gray-500 mb-6">Final Score: {matchScore}</Text>
                    <TouchableOpacity onPress={startMoodMatch} className="bg-primary px-8 py-3 rounded-full flex-row items-center">
                      <RefreshCw size={16} color="white" />
                      <Text className="text-white font-bold ml-2">Play Again</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </View>
            )}

            {activeGame === 'bubble_pop' && (
              <View className="w-full h-full max-w-[600px] p-4 relative">
                <View className="flex-row justify-between mb-4 bg-white p-4 rounded-3xl shadow-sm z-10">
                  <View>
                    <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Time Left</Text>
                    <Text className={`text-2xl font-bold font-outfit ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-900'}`}>{timeLeft}s</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Score</Text>
                    <Text className="text-2xl font-bold text-primary font-outfit">{bubbleScore}</Text>
                  </View>
                </View>

                <View className="flex-1 bg-white/50 rounded-4xl border-2 border-white overflow-hidden relative shadow-inner">
                  {bubbleActive ? bubbles.map((bubble, index) => (
                    !bubble.popped && (
                      <TouchableOpacity
                        key={bubble.id}
                        onPress={() => popBubble(index)}
                        activeOpacity={0.5}
                        className="absolute rounded-full items-center justify-center shadow-lg"
                        style={{
                          left: `${bubble.x}%`,
                          top: `${bubble.y}%`,
                          width: 60,
                          height: 60,
                          backgroundColor: bubble.color,
                          transform: [{ translateX: -30 }, { translateY: -30 }]
                        }}
                      >
                        <Text className="text-white/50 text-xs">🫧</Text>
                      </TouchableOpacity>
                    )
                  )) : (
                    <View className="flex-1 items-center justify-center bg-white">
                      <Trophy size={48} color="#D4AF37" className="mb-4" />
                      <Text className="text-3xl font-bold text-gray-900 font-outfit mb-2">Time's Up!</Text>
                      <Text className="text-gray-500 text-lg mb-8">You popped {bubbleScore / 5} bubbles</Text>
                      <TouchableOpacity onPress={startBubblePop} className="bg-primary px-8 py-4 rounded-full flex-row items-center shadow-sm">
                        <RefreshCw size={20} color="white" />
                        <Text className="text-white font-bold ml-2 text-lg">Play Again</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default GamesScreen;
