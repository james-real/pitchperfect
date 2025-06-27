import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AudioProvider } from './contexts/AudioContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AudioSettings } from './types';

const defaultAudioSettings: AudioSettings = {
  duration: 2.5,
  harmonics: 5,
  volume: 0.6
};

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AudioProvider settings={defaultAudioSettings} instrument="guitar">
        {children}
      </AudioProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };