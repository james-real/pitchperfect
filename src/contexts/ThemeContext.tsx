import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'vibrant' | 'dark' | 'minimal' | 'ocean' | 'sunset';

export interface Theme {
  name: ThemeName;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    danger: string;
    warning: string;
    background: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    buttonBg: string;
    buttonText: string;
    buttonBorder: string;
  };
  gradients: {
    background: string;
    primary: string;
    accent: string;
    success: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  vibrant: {
    name: 'vibrant',
    colors: {
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      accent: '#fd79a8',
      success: '#00b894',
      danger: '#ff6b6b',
      warning: '#fdcb6e',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      textPrimary: '#2d3436',
      textSecondary: '#636e72',
      buttonBg: 'rgba(245, 246, 250, 0.9)',
      buttonText: '#2d3436',
      buttonBorder: 'rgba(0, 0, 0, 0.1)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      primary: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
      accent: 'linear-gradient(135deg, #fd79a8 0%, #fab1a0 100%)',
      success: 'linear-gradient(135deg, #00b894 0%, #55efc4 100%)'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#bb86fc',
      secondary: '#03dac6',
      accent: '#cf6679',
      success: '#03dac6',
      danger: '#cf6679',
      warning: '#ffb74d',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      cardBg: 'rgba(30, 30, 30, 0.95)',
      textPrimary: '#ffffff',
      textSecondary: '#c7c7c7',
      buttonBg: 'rgba(50, 50, 50, 0.9)',
      buttonText: '#ffffff',
      buttonBorder: 'rgba(255, 255, 255, 0.1)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      primary: 'linear-gradient(135deg, #bb86fc 0%, #9c64ff 100%)',
      accent: 'linear-gradient(135deg, #cf6679 0%, #ff8a95 100%)',
      success: 'linear-gradient(135deg, #03dac6 0%, #00e5cc 100%)'
    }
  },
  minimal: {
    name: 'minimal',
    colors: {
      primary: '#4a4a4a',
      secondary: '#7a7a7a',
      accent: '#2196f3',
      success: '#4caf50',
      danger: '#f44336',
      warning: '#ff9800',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      cardBg: 'rgba(255, 255, 255, 0.98)',
      textPrimary: '#212121',
      textSecondary: '#757575',
      buttonBg: 'rgba(250, 250, 250, 0.95)',
      buttonText: '#212121',
      buttonBorder: 'rgba(0, 0, 0, 0.08)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      primary: 'linear-gradient(135deg, #4a4a4a 0%, #7a7a7a 100%)',
      accent: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
      success: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)'
    }
  },
  ocean: {
    name: 'ocean',
    colors: {
      primary: '#006994',
      secondary: '#0099cc',
      accent: '#00d4aa',
      success: '#00d4aa',
      danger: '#ff6b6b',
      warning: '#ffd93d',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      cardBg: 'rgba(255, 255, 255, 0.92)',
      textPrimary: '#1a1a1a',
      textSecondary: '#4a4a4a',
      buttonBg: 'rgba(240, 248, 255, 0.9)',
      buttonText: '#1a1a1a',
      buttonBorder: 'rgba(0, 105, 148, 0.2)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      primary: 'linear-gradient(135deg, #006994 0%, #0099cc 100%)',
      accent: 'linear-gradient(135deg, #00d4aa 0%, #00f5cc 100%)',
      success: 'linear-gradient(135deg, #00d4aa 0%, #00f5cc 100%)'
    }
  },
  sunset: {
    name: 'sunset',
    colors: {
      primary: '#f4511e',
      secondary: '#ff7043',
      accent: '#ffc107',
      success: '#8bc34a',
      danger: '#e91e63',
      warning: '#ffc107',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      cardBg: 'rgba(255, 255, 255, 0.93)',
      textPrimary: '#1a1a1a',
      textSecondary: '#4a4a4a',
      buttonBg: 'rgba(255, 248, 240, 0.9)',
      buttonText: '#1a1a1a',
      buttonBorder: 'rgba(244, 81, 30, 0.2)'
    },
    gradients: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      primary: 'linear-gradient(135deg, #f4511e 0%, #ff7043 100%)',
      accent: 'linear-gradient(135deg, #ffc107 0%, #ffd54f 100%)',
      success: 'linear-gradient(135deg, #8bc34a 0%, #aed581 100%)'
    }
  }
};

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('pitchPerfectTheme');
    return (saved as ThemeName) || 'vibrant';
  });

  const theme = themes[themeName];

  useEffect(() => {
    localStorage.setItem('pitchPerfectTheme', themeName);
    
    // Apply theme CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (key === 'background') return; // Skip background as it's a gradient
      root.style.setProperty(`--${key}-color`, value);
    });
    
    // Apply background gradient
    root.style.setProperty('--background-gradient', theme.colors.background);
    
    // Apply card background
    root.style.setProperty('--card-bg', theme.colors.cardBg);
    
    // Apply button styles
    root.style.setProperty('--button-bg', theme.colors.buttonBg);
    root.style.setProperty('--button-text', theme.colors.buttonText);
    root.style.setProperty('--button-border', theme.colors.buttonBorder);
    
    // Apply gradients
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--${key}-gradient`, value);
    });
  }, [theme]);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};