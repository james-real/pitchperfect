import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import NoteIntroduction from './NoteIntroduction';
import { Note } from '../types';

const mockNotes: Note[] = [
  { id: 'E1', name: 'E', frequency: 82.41 },
  { id: 'A', name: 'A', frequency: 110.00 }
];

describe('NoteIntroduction', () => {
  const mockOnProceedToQuiz = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with title and instructions', () => {
    render(
      <NoteIntroduction 
        notes={mockNotes} 
        onProceedToQuiz={mockOnProceedToQuiz} 
      />
    );

    expect(screen.getByText('Learn These Notes')).toBeInTheDocument();
    expect(screen.getByText('Click on each note to hear how it sounds')).toBeInTheDocument();
  });

  it('renders all notes', () => {
    render(
      <NoteIntroduction 
        notes={mockNotes} 
        onProceedToQuiz={mockOnProceedToQuiz} 
      />
    );

    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('calls onProceedToQuiz when button is clicked', () => {
    render(
      <NoteIntroduction 
        notes={mockNotes} 
        onProceedToQuiz={mockOnProceedToQuiz} 
      />
    );

    const proceedButton = screen.getByText("I'm ready for the quiz!");
    fireEvent.click(proceedButton);

    expect(mockOnProceedToQuiz).toHaveBeenCalledTimes(1);
  });
});