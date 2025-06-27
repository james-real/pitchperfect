import React, { useState, useEffect } from 'react';
import { guitarFacts, pianoFacts, generalMusicFacts } from '../data/musicFacts';
import { useAudioSettings } from '../contexts/AudioContext';

const MusicFact: React.FC = () => {
  const { instrument } = useAudioSettings();
  const [currentFact, setCurrentFact] = useState('');
  const [factIndex, setFactIndex] = useState(0);
  
  // Select facts based on current instrument
  const relevantFacts = instrument === 'guitar' 
    ? [...guitarFacts, ...generalMusicFacts]
    : [...pianoFacts, ...generalMusicFacts];

  useEffect(() => {
    // Select a random fact on component mount or instrument change
    const randomIndex = Math.floor(Math.random() * relevantFacts.length);
    setFactIndex(randomIndex);
    setCurrentFact(relevantFacts[randomIndex]);
  }, [instrument]); // Re-run when instrument changes

  const getNewFact = () => {
    let newIndex = Math.floor(Math.random() * relevantFacts.length);
    // Ensure we don't show the same fact twice in a row
    while (newIndex === factIndex && relevantFacts.length > 1) {
      newIndex = Math.floor(Math.random() * relevantFacts.length);
    }
    setFactIndex(newIndex);
    setCurrentFact(relevantFacts[newIndex]);
  };

  return (
    <div className="music-fact">
      <div className="fact-header">
        <span className="fact-icon">💡</span>
        <h4>Did You Know?</h4>
      </div>
      <p className="fact-text">{currentFact}</p>
      <button className="new-fact-button" onClick={getNewFact}>
        Another Fact
      </button>
    </div>
  );
};

export default MusicFact;