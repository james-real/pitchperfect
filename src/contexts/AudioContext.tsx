import React, { createContext, useContext } from 'react';
import { AudioSettings, InstrumentType } from '../types';

interface AudioContextType {
  settings: AudioSettings;
  instrument: InstrumentType;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudioSettings = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioSettings must be used within AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
  settings: AudioSettings;
  instrument: InstrumentType;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children, settings, instrument }) => {
  return (
    <AudioContext.Provider value={{ settings, instrument }}>
      {children}
    </AudioContext.Provider>
  );
};