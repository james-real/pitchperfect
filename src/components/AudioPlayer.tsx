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
        // Acoustic guitar sound with complex harmonics
        // Fundamental - use sawtooth for richer harmonics, then filter
        const fundamental = audioContext.current.createOscillator();
        const fundamentalGain = audioContext.current.createGain();
        const fundamentalFilter = audioContext.current.createBiquadFilter();
        
        fundamental.frequency.value = note.frequency;
        fundamental.type = 'sawtooth'; // Rich in harmonics
        
        // Low-pass filter to soften the harsh sawtooth
        fundamentalFilter.type = 'lowpass';
        fundamentalFilter.frequency.value = note.frequency * 4; // Cut high frequencies
        fundamentalFilter.Q.value = 1;
        
        fundamentalGain.gain.value = 0.3;
        
        fundamental.connect(fundamentalFilter);
        fundamentalFilter.connect(fundamentalGain);
        oscillators.push(fundamental);
        gains.push(fundamentalGain);
        
        // Add octave for body resonance
        const octave = audioContext.current.createOscillator();
        const octaveGain = audioContext.current.createGain();
        octave.frequency.value = note.frequency * 2;
        octave.type = 'triangle';
        octaveGain.gain.value = 0.15;
        octave.connect(octaveGain);
        oscillators.push(octave);
        gains.push(octaveGain);
        
        // Add harmonics for acoustic guitar timbre
        const harmonics = [3, 4, 5, 6, 7, 8]; // Extended harmonic series
        const harmonicGains = [0.12, 0.08, 0.05, 0.03, 0.02, 0.01]; // Natural decay
        
        harmonics.slice(0, Math.min(settings.harmonics, 6)).forEach((harmonic, index) => {
          const osc = audioContext.current!.createOscillator();
          const gain = audioContext.current!.createGain();
          osc.frequency.value = note.frequency * harmonic;
          osc.type = index % 2 === 0 ? 'sine' : 'triangle'; // Mix waveforms
          gain.gain.value = harmonicGains[index] * (1 - index * 0.1); // Progressive decay
          osc.connect(gain);
          oscillators.push(osc);
          gains.push(gain);
        });
        
        // Add slight detuning for natural sound
        const detune = audioContext.current.createOscillator();
        const detuneGain = audioContext.current.createGain();
        detune.frequency.value = note.frequency * 1.003; // Slight detune
        detune.type = 'triangle';
        detuneGain.gain.value = 0.05;
        detune.connect(detuneGain);
        oscillators.push(detune);
        gains.push(detuneGain);
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
        // Acoustic guitar envelope: very quick pluck, natural decay
        masterGain.gain.linearRampToValueAtTime(settings.volume, now + 0.003); // Very quick attack (pluck)
        masterGain.gain.exponentialRampToValueAtTime(settings.volume * 0.7, now + 0.02); // Quick initial decay
        masterGain.gain.exponentialRampToValueAtTime(settings.volume * 0.3, now + 0.5); // Body resonance
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Natural fade out
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
        <span className="note-name">{note.name}</span>
      ) : (
        <span className="note-symbol">{randomSymbol}</span>
      )}
    </button>
  );
};

export default AudioPlayer;