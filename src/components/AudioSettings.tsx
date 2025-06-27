import React from 'react';
import { AudioSettings as AudioSettingsType } from '../types';

interface AudioSettingsProps {
  settings: AudioSettingsType;
  onSettingsChange: (settings: AudioSettingsType) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleChange = (field: keyof AudioSettingsType, value: number) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  };

  return (
    <div className="audio-settings">
      <h3>Audio Settings</h3>
      
      <div className="setting-group">
        <label htmlFor="duration">
          Note Duration: {settings.duration}s
        </label>
        <input
          id="duration"
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={settings.duration}
          onChange={(e) => handleChange('duration', parseFloat(e.target.value))}
        />
      </div>
      
      <div className="setting-group">
        <label htmlFor="harmonics">
          Richness (Harmonics): {settings.harmonics}
        </label>
        <input
          id="harmonics"
          type="range"
          min="0"
          max="6"
          step="1"
          value={settings.harmonics}
          onChange={(e) => handleChange('harmonics', parseInt(e.target.value))}
        />
      </div>
      
      <div className="setting-group">
        <label htmlFor="volume">
          Volume: {Math.round(settings.volume * 100)}%
        </label>
        <input
          id="volume"
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={settings.volume}
          onChange={(e) => handleChange('volume', parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default AudioSettings;