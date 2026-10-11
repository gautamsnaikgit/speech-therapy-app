import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { sampleSoundCards } from '../data/soundCards';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { mode, colors, toggleTheme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar with Mode Toggle */}
      <View style={[styles.header, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            {mode === 'kids' ? 'Welcome Back, Champion! 🌟' : 'Speech Practice Dashboard'}
          </Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {mode === 'kids' ? 'Daily Speech Quest' : 'Clinical Practice Companion'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.toggleBtn, { backgroundColor: colors.badgeBg, borderColor: colors.primary }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.toggleText, { color: colors.badgeText }]}>
            {mode === 'kids' ? '👑 Kids Mode' : '💼 Adult Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Streak & Stats Card */}
      <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>🔥 5 Days</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Practice Streak</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.starGold }]}>⭐ 120 Stars</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rewards Earned</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.cardBorder }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.success }]}>⏱️ 12 Mins</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today's Target</Text>
        </View>
      </View>

      {/* Quick Action Button */}
      <TouchableOpacity
        style={[styles.startBtn, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Practice')}
      >
        <Text style={styles.startBtnText}>
          {mode === 'kids' ? '🚀 Start Today\'s Quest' : '▶️ Launch Sound Drills'}
        </Text>
      </TouchableOpacity>

      {/* Recommended Target Sound Decks */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Target Sound Decks
        </Text>
        <View style={styles.grid}>
          {['r', 's', 'th', 'l'].map((phoneme) => (
            <TouchableOpacity
              key={phoneme}
              style={[styles.deckCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
              onPress={() => navigation.navigate('Practice', { targetPhoneme: phoneme })}
            >
              <View style={[styles.phonemeBadge, { backgroundColor: colors.badgeBg }]}>
                <Text style={[styles.phonemeText, { color: colors.primary }]}>/{phoneme}/</Text>
              </View>
              <Text style={[styles.deckTitle, { color: colors.textPrimary }]}>
                Sound /{phoneme}/ Practice
              </Text>
              <Text style={[styles.deckSub, { color: colors.textSecondary }]}>
                {sampleSoundCards.filter((c) => c.phoneme === phoneme).length} Exercise Cards
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 8,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  startBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deckCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  phonemeBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  phonemeText: {
    fontSize: 16,
    fontWeight: '800',
  },
  deckTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  deckSub: {
    fontSize: 11,
  },
});
