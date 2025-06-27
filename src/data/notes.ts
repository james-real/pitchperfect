import { Note } from '../types';

export const GUITAR_NOTES: Note[] = [
  { id: 'E1', name: 'E (low)', frequency: 82.41 },
  { id: 'A', name: 'A', frequency: 110.00 },
  { id: 'D', name: 'D', frequency: 146.83 },
  { id: 'G', name: 'G', frequency: 196.00 },
  { id: 'B', name: 'B', frequency: 246.94 },
  { id: 'E2', name: 'E (high)', frequency: 329.63 },
];

export const PIANO_NOTES: Note[] = [
  { id: 'A3', name: 'A', frequency: 220.00 },
  { id: 'As3', name: 'A#', frequency: 233.08 },
  { id: 'B3', name: 'B', frequency: 246.94 },
  { id: 'C4', name: 'C', frequency: 261.63 },
  { id: 'Cs4', name: 'C#', frequency: 277.18 },
  { id: 'D4', name: 'D', frequency: 293.66 },
  { id: 'Ds4', name: 'D#', frequency: 311.13 },
  { id: 'E4', name: 'E', frequency: 329.63 },
  { id: 'F4', name: 'F', frequency: 349.23 },
  { id: 'Fs4', name: 'F#', frequency: 369.99 },
  { id: 'G4', name: 'G', frequency: 392.00 },
  { id: 'Gs4', name: 'G#', frequency: 415.30 },
];

export type InstrumentType = 'guitar' | 'piano';

export interface Instrument {
  id: InstrumentType;
  name: string;
  notes: Note[];
  description: string;
}

export const INSTRUMENTS: Record<InstrumentType, Instrument> = {
  guitar: {
    id: 'guitar',
    name: 'Guitar Standard Tuning',
    notes: GUITAR_NOTES,
    description: 'Standard guitar tuning (EADGBE)'
  },
  piano: {
    id: 'piano',
    name: 'Piano Chromatic Scale',
    notes: PIANO_NOTES,
    description: 'Chromatic scale starting from A3'
  }
};