import React, { useRef } from 'react';
import { Note } from '../types';
import { useAudioSettings } from '../contexts/AudioContext';

interface AudioPlayerProps {
  note: Note;
  autoPlay?: boolean;
  showName?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ note, autoPlay = false, showName = true }) => {
  const audioContext = useRef<AudioContext | null>(null);
  const { settings, instrument } = useAudioSettings();

  const playNote = () => {
    try {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const now = audioContext.current.currentTime;
      const duration = settings.duration;
      
      // Create oscillators based on instrument type
      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];
      
      if (instrument === 'guitar') {
        // Guitar sound - richer harmonics
        const fundamental = audioContext.current.createOscillator();
        const fundamentalGain = audioContext.current.createGain();
        fundamental.frequency.value = note.frequency;
        fundamental.type = 'triangle'; // Warmer than sine
        fundamentalGain.gain.value = 0.4;
        fundamental.connect(fundamentalGain);
        oscillators.push(fundamental);
        gains.push(fundamentalGain);
        
        // Add harmonics for guitar-like timbre
        const harmonics = [2, 3, 4, 5, 6]; // Overtone series
        const harmonicGains = [0.2, 0.15, 0.1, 0.05, 0.03]; // Decreasing amplitude
        
        harmonics.slice(0, settings.harmonics).forEach((harmonic, index) => {
          const osc = audioContext.current!.createOscillator();
          const gain = audioContext.current!.createGain();
          osc.frequency.value = note.frequency * harmonic;
          osc.type = 'sine';
          gain.gain.value = harmonicGains[index];
          osc.connect(gain);
          oscillators.push(osc);
          gains.push(gain);
        });
      } else {
        // Piano sound - cleaner with fewer harmonics
        const fundamental = audioContext.current.createOscillator();
        const fundamentalGain = audioContext.current.createGain();
        fundamental.frequency.value = note.frequency;
        fundamental.type = 'sine'; // Pure tone for piano
        fundamentalGain.gain.value = 0.6;
        fundamental.connect(fundamentalGain);
        oscillators.push(fundamental);
        gains.push(fundamentalGain);
        
        // Add subtle harmonics for piano
        const pianoHarmonics = [2, 3, 4]; // Fewer overtones
        const pianoHarmonicGains = [0.3, 0.15, 0.05]; // Different decay
        
        pianoHarmonics.slice(0, Math.min(settings.harmonics, 3)).forEach((harmonic, index) => {
          const osc = audioContext.current!.createOscillator();
          const gain = audioContext.current!.createGain();
          osc.frequency.value = note.frequency * harmonic;
          osc.type = 'sine';
          gain.gain.value = pianoHarmonicGains[index];
          osc.connect(gain);
          oscillators.push(osc);
          gains.push(gain);
        });
      }
      
      // Create master gain for envelope
      const masterGain = audioContext.current.createGain();
      gains.forEach(gain => gain.connect(masterGain));
      masterGain.connect(audioContext.current.destination);
      
      // Apply instrument-specific envelope
      masterGain.gain.setValueAtTime(0, now);
      
      if (instrument === 'guitar') {
        // Guitar-like envelope: quick attack, gradual decay
        masterGain.gain.linearRampToValueAtTime(settings.volume, now + 0.01); // Quick attack
        masterGain.gain.exponentialRampToValueAtTime(settings.volume * 0.5, now + 0.1); // Initial decay
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Sustain and release
      } else {
        // Piano-like envelope: very quick attack, faster decay
        masterGain.gain.linearRampToValueAtTime(settings.volume, now + 0.005); // Very quick attack
        masterGain.gain.exponentialRampToValueAtTime(settings.volume * 0.3, now + 0.2); // Faster decay
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration * 0.8); // Shorter sustain
      }
      
      // Start and stop all oscillators
      oscillators.forEach(osc => {
        osc.start(now);
        osc.stop(now + duration);
      });
    } catch (error) {
      console.warn('Audio playback not available:', error);
    }
  };

  React.useEffect(() => {
    if (autoPlay) {
      playNote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const musicSymbols = ['♪', '♫', '♬', '♩', '♭', '♮'];
  const randomSymbol = musicSymbols[Math.floor(Math.random() * musicSymbols.length)];

  return (
    <button 
      className="note-button"
      onClick={playNote}
    >
      {showName ? (
        <>
          <span className="note-name">{note.name}</span>
          {note.id.includes('1') && <span className="note-position">(Low E)</span>}
          {note.id.includes('2') && <span className="note-position">(High E)</span>}
        </>
      ) : (
        <span className="note-symbol">{randomSymbol}</span>
      )}
    </button>
  );
};

export default AudioPlayer;