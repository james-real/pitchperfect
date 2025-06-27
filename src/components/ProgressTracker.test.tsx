import React from 'react';
import { render, screen } from '../test-utils';
import ProgressTracker from './ProgressTracker';

describe('ProgressTracker', () => {
  it('renders progress information', () => {
    render(
      <ProgressTracker 
        totalNotes={6} 
        masteredNotes={2} 
        currentPhase="introduction" 
      />
    );

    expect(screen.getByText('Your Progress')).toBeInTheDocument();
    expect(screen.getByText('2 of 6 guitar tuning notes mastered')).toBeInTheDocument();
  });

  it('displays correct phase for introduction', () => {
    render(
      <ProgressTracker 
        totalNotes={6} 
        masteredNotes={0} 
        currentPhase="introduction" 
      />
    );

    expect(screen.getByText('Current Phase: Learning')).toBeInTheDocument();
  });

  it('displays correct phase for quiz', () => {
    render(
      <ProgressTracker 
        totalNotes={6} 
        masteredNotes={3} 
        currentPhase="quiz" 
      />
    );

    expect(screen.getByText('Current Phase: Quiz')).toBeInTheDocument();
  });

  it('calculates progress percentage correctly', () => {
    const { container } = render(
      <ProgressTracker 
        totalNotes={6} 
        masteredNotes={3} 
        currentPhase="quiz" 
      />
    );

    const progressFill = container.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '50%' });
  });

  it('shows 100% progress when all notes mastered', () => {
    const { container } = render(
      <ProgressTracker 
        totalNotes={6} 
        masteredNotes={6} 
        currentPhase="quiz" 
      />
    );

    const progressFill = container.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle({ width: '100%' });
  });
});