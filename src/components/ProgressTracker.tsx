import React from 'react';
import { GamePhase, InstrumentType } from '../types';
import { useAudioSettings } from '../contexts/AudioContext';

interface ProgressTrackerProps {
  totalNotes: number;
  masteredNotes: number;
  currentPhase: GamePhase;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  totalNotes, 
  masteredNotes, 
  currentPhase 
}) => {
  const { instrument } = useAudioSettings();
  const progressPercentage = (masteredNotes / totalNotes) * 100;
  
  const instrumentText = instrument === 'guitar' 
    ? 'guitar tuning notes' 
    : 'piano chromatic notes';
  
  const instrumentDescription = instrument === 'guitar'
    ? 'Standard Guitar Tuning (EADGBE)'
    : 'Piano Chromatic Scale (A-G#)';

  return (
    <div className="progress-tracker">
      <h3>Your Progress</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p>
        {masteredNotes} of {totalNotes} {instrumentText} mastered
      </p>
      <p className="alpha-notice">
        Alpha 2 Release - {instrumentDescription}
      </p>
      <p className="current-phase">
        Current Phase: {currentPhase === 'introduction' ? 'Learning' : 'Quiz'}
      </p>
    </div>
  );
};

export default ProgressTracker;