import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export const DashboardScreen: React.FC = () => {
  const { mode, colors } = useAppTheme();

  const recentSessions = [
    { id: 's1', word: 'Rabbit', phoneme: 'r', accuracy: '92%', time: 'Today, 2:15 PM' },
    { id: 's2', word: 'Sun', phoneme: 's', accuracy: '88%', time: 'Today, 2:12 PM' },
    { id: 's3', word: 'Thumb', phoneme: 'th', accuracy: '85%', time: 'Yesterday' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {mode === 'kids' ? '🏆 Champion Star Vault' : '📊 Caregiver & SLP Analytics'}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>
          Progress tracking, practice duration & recorded clips.
        </Text>
      </View>

      {/* Overview Cards */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.metricNumber, { color: colors.primary }]}>92%</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Avg Accuracy</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.metricNumber, { color: colors.success }]}>48</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Cards Done</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.metricNumber, { color: colors.starGold }]}>14</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Audio Clips</Text>
        </View>
      </View>

      {/* Async Audio Review Queue */}
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          🎙️ Async Audio Review Queue
        </Text>
        <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
          Recorded student exercises ready for SLP / Parent validation.
        </Text>

        <View style={styles.list}>
          {recentSessions.map((item) => (
            <View
              key={item.id}
              style={[styles.sessionRow, { borderColor: colors.cardBorder }]}
            >
              <View style={[styles.phonemeCircle, { backgroundColor: colors.badgeBg }]}>
                <Text style={[styles.phonemeCircleText, { color: colors.primary }]}>
                  /{item.phoneme}/
                </Text>
              </View>

              <View style={styles.sessionInfo}>
                <Text style={[styles.wordName, { color: colors.textPrimary }]}>
                  {item.word}
                </Text>
                <Text style={[styles.sessionTime, { color: colors.textSecondary }]}>
                  {item.time}
                </Text>
              </View>

              <View style={styles.scoreContainer}>
                <Text style={[styles.scoreText, { color: colors.success }]}>
                  {item.accuracy}
                </Text>
                <TouchableOpacity style={[styles.playBtn, { backgroundColor: colors.primary }]}>
                  <Text style={styles.playBtnText}>▶ Play</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    marginTop: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: '31%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  sectionCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  sectionSub: {
    fontSize: 12,
    marginBottom: 16,
  },
  list: {
    marginTop: 8,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  phonemeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  phonemeCircleText: {
    fontSize: 14,
    fontWeight: '800',
  },
  sessionInfo: {
    flex: 1,
  },
  wordName: {
    fontSize: 14,
    fontWeight: '700',
  },
  sessionTime: {
    fontSize: 11,
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  playBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  playBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
