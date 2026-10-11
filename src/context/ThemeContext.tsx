import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppThemeMode, ColorPalette, kidsThemeColors, adultThemeColors } from '../theme/colors';

interface ThemeContextType {
  mode: AppThemeMode;
  colors: ColorPalette;
  toggleTheme: () => void;
  setThemeMode: (mode: AppThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AppThemeMode>('kids');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'kids' ? 'adult' : 'kids'));
  };

  const setThemeMode = (newMode: AppThemeMode) => {
    setMode(newMode);
  };

  const colors = mode === 'kids' ? kidsThemeColors : adultThemeColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
