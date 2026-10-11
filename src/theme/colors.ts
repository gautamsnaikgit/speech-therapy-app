export type AppThemeMode = 'kids' | 'adult';

export interface ColorPalette {
  background: string;
  card: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  starGold: string;
  success: string;
  warning: string;
  badgeBg: string;
  badgeText: string;
}

export const kidsThemeColors: ColorPalette = {
  background: '#FFF8F0',
  card: '#FFFFFF',
  cardBorder: '#FFE2C6',
  textPrimary: '#2D2013',
  textSecondary: '#7C6853',
  primary: '#FF6B6B',
  primaryForeground: '#FFFFFF',
  accent: '#4ECDC4',
  starGold: '#FFD166',
  success: '#06D6A0',
  warning: '#FF9F1C',
  badgeBg: 'rgba(255, 107, 107, 0.15)',
  badgeText: '#FF6B6B',
};

export const adultThemeColors: ColorPalette = {
  background: '#0F172A',
  card: '#1E293B',
  cardBorder: '#334155',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  primary: '#2563EB',
  primaryForeground: '#FFFFFF',
  accent: '#38BDF8',
  starGold: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  badgeBg: 'rgba(37, 99, 235, 0.2)',
  badgeText: '#60A5FA',
};
