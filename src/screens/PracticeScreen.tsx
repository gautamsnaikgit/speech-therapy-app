import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { sampleSoundCards } from '../data/soundCards';

export const PracticeScreen: React.FC<{ route?: any }> = ({ route }) => {
  const { mode, colors } = useAppTheme();
  const targetPhoneme = route?.params?.targetPhoneme;

  const filteredCards = targetPhoneme
    ? sampleSoundCards.filter((c) => c.phoneme === targetPhoneme)
    : sampleSoundCards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [repetitionCount, setRepetitionCount] = useState(0);
  const [mascotState, setMascotState] = useState<'listening' | 'cheering'>('listening');

  const currentCard = filteredCards[currentIndex] || sampleSoundCards[0];

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRepetitionCount(0);
      setMascotState('listening');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setRepetitionCount(0);
      setMascotState('listening');
    }
  };

  const handlePracticeRepetition = () => {
    setRepetitionCount((prev) => prev + 1);
    setMascotState('cheering');
    setTimeout(() => setMascotState('listening'), 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Info */}
      <View style={styles.topHeader}>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          Card {currentIndex + 1} of {filteredCards.length}
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>
            Sound /{currentCard.phoneme}/ ({currentCard.position})
          </Text>
        </View>
      </View>

      {/* Main Flashcard */}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        {/* Mode Mascot / Icon */}
        {mode === 'kids' ? (
          <View style={styles.mascotContainer}>
            <Text style={styles.mascotEmoji}>
              {mascotState === 'cheering' ? '🎉 🦁 ⭐' : '🦁 🎧'}
            </Text>
            <Text style={[styles.mascotSpeech, { color: colors.primary }]}>
              {mascotState === 'cheering' ? 'Awesome Job! +10 Stars!' : 'Say the sound clearly!'}
            </Text>
          </View>
        ) : (
          <View style={styles.adultHeader}>
            <Text style={[styles.adultTag, { color: colors.accent }]}>
              ARTICULATION DRILL • LEVEL {currentCard.difficulty}
            </Text>
          </View>
        )}

        {/* Word Prompt */}
        <Text style={[styles.wordTitle, { color: colors.textPrimary }]}>
          {currentCard.word}
        </Text>
        <Text style={[styles.phoneticText, { color: colors.textSecondary }]}>
          {currentCard.phoneticSpelling}
        </Text>

        {/* Repetition Counter Badge */}
        <View style={[styles.repBadge, { backgroundColor: colors.background }]}>
          <Text style={[styles.repText, { color: colors.primary }]}>
            Repetitions Completed: {repetitionCount} / 5
          </Text>
        </View>

        {/* Practice Button */}
        <TouchableOpacity
          style={[styles.practiceBtn, { backgroundColor: colors.primary }]}
          onPress={handlePracticeRepetition}
        >
          <Text style={styles.practiceBtnText}>
            🎙️ {mode === 'kids' ? 'Repeat & Score Sound' : 'Record & Practice Repetition'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Controls */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={[
            styles.navBtn,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
            currentIndex === 0 && styles.disabledBtn,
          ]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Text style={[styles.navBtnText, { color: colors.textPrimary }]}>◀ Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navBtn,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
            currentIndex === filteredCards.length - 1 && styles.disabledBtn,
          ]}
          onPress={handleNext}
          disabled={currentIndex === filteredCards.length - 1}
        >
          <Text style={[styles.navBtnText, { color: colors.textPrimary }]}>Next Card ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  card: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginVertical: 16,
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mascotEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  mascotSpeech: {
    fontSize: 13,
    fontWeight: '800',
  },
  adultHeader: {
    marginBottom: 16,
  },
  adultTag: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  wordTitle: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
  },
  phoneticText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  repBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  repText: {
    fontSize: 12,
    fontWeight: '800',
  },
  practiceBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  practiceBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navBtn: {
    flex: 0.48,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.4,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
