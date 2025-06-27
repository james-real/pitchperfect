import React from 'react';
import { useTheme, ThemeName, themes } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { themeName, setTheme } = useTheme();

  const themeOptions: { name: ThemeName; label: string; icon: string }[] = [
    { name: 'vibrant', label: 'Vibrant', icon: '🌈' },
    { name: 'dark', label: 'Dark', icon: '🌙' },
    { name: 'minimal', label: 'Minimal', icon: '⚪' },
    { name: 'ocean', label: 'Ocean', icon: '🌊' },
    { name: 'sunset', label: 'Sunset', icon: '🌅' }
  ];

  return (
    <div className="theme-selector">
      <h4>Choose Theme</h4>
      <div className="theme-options">
        {themeOptions.map(option => (
          <button
            key={option.name}
            className={`theme-option ${themeName === option.name ? 'active' : ''}`}
            onClick={() => setTheme(option.name)}
            title={option.label}
          >
            <span className="theme-icon">{option.icon}</span>
            <span className="theme-label">{option.label}</span>
            {themeName === option.name && <span className="checkmark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;