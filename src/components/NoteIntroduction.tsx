import React from 'react';
import { Note } from '../types';
import AudioPlayer from './AudioPlayer';

interface NoteIntroductionProps {
  notes: Note[];
  onProceedToQuiz: () => void;
}

const NoteIntroduction: React.FC<NoteIntroductionProps> = ({ notes, onProceedToQuiz }) => {
  return (
    <div className="note-introduction">
      <h2>Learn These Notes</h2>
      <p>Click on each note to hear how it sounds</p>
      
      <div className="notes-grid">
        {notes.map(note => (
          <AudioPlayer key={note.id} note={note} />
        ))}
      </div>
      
      <button 
        className="proceed-button"
        onClick={onProceedToQuiz}
      >
        I'm ready for the quiz!
      </button>
    </div>
  );
};

export default NoteIntroduction;