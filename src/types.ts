export type GamePhase = 'introduction' | 'quiz';

export interface Note {
  id: string;
  name: string;
  frequency: number;
}

export type QuizType = 'audioToName' | 'nameToAudio';

export interface QuizQuestion {
  type: QuizType;
  correctNote: Note;
  options: Note[];
}

export interface AudioSettings {
  duration: number;
  harmonics: number;
  volume: number;
}

export type InstrumentType = 'guitar' | 'piano';