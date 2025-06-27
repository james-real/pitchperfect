import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders the app title and subtitle', () => {
    render(<App />);
    expect(screen.getByText('Pitch Perfect')).toBeInTheDocument();
    expect(screen.getByText('Learn to identify musical notes by ear')).toBeInTheDocument();
  });

  it('renders progress tracker', () => {
    render(<App />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
    expect(screen.getByText('0 of 6 guitar tuning notes mastered')).toBeInTheDocument();
  });

  it('starts in introduction phase', () => {
    render(<App />);
    expect(screen.getByText('Current Phase: Learning')).toBeInTheDocument();
    expect(screen.getByText('Learn These Notes')).toBeInTheDocument();
  });

  it('shows first two notes initially', () => {
    render(<App />);
    // Find note buttons within the notes grid
    const notesGrid = screen.getByText('Learn These Notes').parentElement;
    const noteButtons = notesGrid?.querySelectorAll('.note-button') || [];
    expect(noteButtons).toHaveLength(2);
    // Notes are now randomized, so we can't predict exact order
    // Just check that we have 2 note buttons
  });

  it('transitions to quiz phase when proceed button is clicked', () => {
    render(<App />);
    
    const proceedButton = screen.getByText("I'm ready for the quiz!");
    fireEvent.click(proceedButton);
    
    expect(screen.getByText('Quiz Time!')).toBeInTheDocument();
    expect(screen.getByText('Current Phase: Quiz')).toBeInTheDocument();
  });

  it('can navigate back to introduction from quiz', () => {
    render(<App />);
    
    // Go to quiz
    const proceedButton = screen.getByText("I'm ready for the quiz!");
    fireEvent.click(proceedButton);
    
    // Go back to introduction
    const backButton = screen.getByText('Back to Learning');
    fireEvent.click(backButton);
    
    expect(screen.getByText('Learn These Notes')).toBeInTheDocument();
    expect(screen.getByText('Current Phase: Learning')).toBeInTheDocument();
  });
});