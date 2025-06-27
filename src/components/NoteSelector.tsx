import React from 'react';
import { Note } from '../types';

interface NoteSelectorProps {
  allNotes: Note[];
  selectedNotes: Note[];
  onNotesChange: (notes: Note[]) => void;
}

const NoteSelector: React.FC<NoteSelectorProps> = ({ 
  allNotes, 
  selectedNotes, 
  onNotesChange 
}) => {
  const handleNoteToggle = (note: Note) => {
    const isSelected = selectedNotes.some(n => n.id === note.id);
    
    if (isSelected) {
      // Remove note, but keep at least 2 notes selected
      if (selectedNotes.length > 2) {
        onNotesChange(selectedNotes.filter(n => n.id !== note.id));
      }
    } else {
      // Add note
      onNotesChange([...selectedNotes, note]);
    }
  };

  return (
    <div className="note-selector">
      <h4>Select Notes to Practice</h4>
      <p className="note-selector-hint">Choose which notes you want to practice (minimum 2 notes)</p>
      <div className="note-selector-grid">
        {allNotes.map(note => {
          const isSelected = selectedNotes.some(n => n.id === note.id);
          const isDisabled = isSelected && selectedNotes.length <= 2;
          
          return (
            <button
              key={note.id}
              className={`note-selector-button ${isSelected ? 'selected' : ''}`}
              onClick={() => handleNoteToggle(note)}
              disabled={isDisabled}
              title={isDisabled ? 'Must keep at least 2 notes selected' : ''}
            >
              <span className="note-name">{note.name}</span>
              {note.id.includes('s') && <span className="sharp">♯</span>}
              {isSelected && <span className="checkmark">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NoteSelector;