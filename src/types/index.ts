export type TargetPhoneme = 'r' | 's' | 'th' | 'l' | 'sh' | 'ch';

export type PhonemePosition = 'initial' | 'medial' | 'final';

export interface SoundCard {
  id: string;
  phoneme: TargetPhoneme;
  position: PhonemePosition;
  word: string;
  phoneticSpelling: string;
  imageUrl?: string;
  sampleAudioUrl?: string;
  difficulty: 1 | 2 | 3;
}

export interface RecordingSession {
  id: string;
  cardId: string;
  word: string;
  phoneme: TargetPhoneme;
  recordedAt: string;
  durationSeconds: number;
  audioUri: string;
  accuracyScore?: number; // 0 - 100
  slpApproved?: boolean;
}

export interface UserStats {
  dailyStreak: number;
  totalStars: number;
  practiceMinutesToday: number;
  completedExercises: number;
  totalRecordings: number;
}
