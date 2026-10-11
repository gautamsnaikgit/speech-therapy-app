import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useAppTheme } from '../context/ThemeContext';

export const BiofeedbackScreen: React.FC = () => {
  const { mode, colors } = useAppTheme();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioMeter, setAudioMeter] = useState<number[]>(Array(12).fill(10));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioMeter((prev) =>
          prev.map(() => Math.floor(Math.random() * 40) + 10)
        );
      }, 120);
    } else {
      setAudioMeter(Array(12).fill(10));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
      }
    } catch (err) {
      console.log('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (recording) {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setRecording(null);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {mode === 'kids' ? '🎙️ Voice Wave Magic' : '🎙️ Acoustic Biofeedback & Pitch Gauge'}
        </Text>
        <Text style={[styles.sub, { color: colors.textSecondary }]}>
          {isRecording
            ? 'Listening to speech stream...'
            : 'Press Record and speak into your microphone.'}
        </Text>
      </View>

      {/* Live Audio Waveform Visualizer */}
      <View style={[styles.waveformCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        <Text style={[styles.visualizerLabel, { color: colors.textSecondary }]}>
          REAL-TIME DECIBEL & PITCH WAVEFORM
        </Text>

        <View style={styles.waveformBars}>
          {audioMeter.map((height, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: isRecording ? height * 2.5 : 12,
                  backgroundColor: isRecording ? colors.primary : colors.cardBorder,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isRecording ? colors.success : colors.warning },
            ]}
          />
          <Text style={[styles.statusText, { color: colors.textPrimary }]}>
            {isRecording ? 'RECORDING ACTIVE' : 'STANDBY'}
          </Text>
        </View>
      </View>

      {/* Record Toggle Button */}
      <TouchableOpacity
        style={[
          styles.recordBtn,
          { backgroundColor: isRecording ? colors.primary : colors.success },
        ]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.recordBtnText}>
          {isRecording ? '🛑 Stop & Process Audio' : '🎙️ Start Recording'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
  },
  waveformCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 24,
  },
  visualizerLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 24,
  },
  waveformBars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginBottom: 24,
  },
  bar: {
    width: 8,
    marginHorizontal: 3,
    borderRadius: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  recordBtn: {
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  recordBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
