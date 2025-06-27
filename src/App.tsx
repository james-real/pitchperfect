import React, { useState, useEffect } from 'react';
import './App.css';
import NoteIntroduction from './components/NoteIntroduction';
import Quiz from './components/Quiz';
import ProgressTracker from './components/ProgressTracker';
import AudioSettings from './components/AudioSettings';
import ThemeSelector from './components/ThemeSelector';
import InstrumentSelector from './components/InstrumentSelector';
import NoteSelector from './components/NoteSelector';
import { GamePhase, Note, AudioSettings as AudioSettingsType, InstrumentType } from './types';
import { AudioProvider } from './contexts/AudioContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { INSTRUMENTS } from './data/notes';


function App() {
  // Load saved progress from localStorage
  const loadProgress = () => {
    const saved = localStorage.getItem('pitchPerfectProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      return {
        masteredNotes: progress.masteredNotes || [],
        currentNotesCount: progress.currentNotesCount || 2,
        instrument: progress.instrument || 'guitar'
      };
    }
    return { masteredNotes: [], currentNotesCount: 2, instrument: 'guitar' };
  };

  const savedProgress = loadProgress();
  const [phase, setPhase] = useState<GamePhase>('introduction');
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>(
    savedProgress.instrument as InstrumentType
  );
  const [currentNotes, setCurrentNotes] = useState<Note[]>(() => {
    const instrumentNotes = [...INSTRUMENTS[selectedInstrument].notes];
    // Randomize the order of notes
    for (let i = instrumentNotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [instrumentNotes[i], instrumentNotes[j]] = [instrumentNotes[j], instrumentNotes[i]];
    }
    return instrumentNotes.slice(0, savedProgress.currentNotesCount);
  });
  const [masteredNotes, setMasteredNotes] = useState<string[]>(savedProgress.masteredNotes);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showNoteSelector, setShowNoteSelector] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettingsType>({
    duration: 2.5,
    harmonics: 5,
    volume: 0.6
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progress = {
      masteredNotes,
      currentNotesCount: currentNotes.length,
      instrument: selectedInstrument
    };
    localStorage.setItem('pitchPerfectProgress', JSON.stringify(progress));
  }, [masteredNotes, currentNotes, selectedInstrument]);

  const handleNoteMastered = (noteId: string) => {
    if (!masteredNotes.includes(noteId)) {
      const newMasteredNotes = [...masteredNotes, noteId];
      setMasteredNotes(newMasteredNotes);
      
      // Find the next note not already in currentNotes
      const allNotes = INSTRUMENTS[selectedInstrument].notes;
      const currentNoteIds = currentNotes.map(n => n.id);
      const availableNotes = allNotes.filter(n => !currentNoteIds.includes(n.id));
      
      if (availableNotes.length > 0) {
        // Add a random available note
        const randomIndex = Math.floor(Math.random() * availableNotes.length);
        setCurrentNotes([...currentNotes, availableNotes[randomIndex]]);
      }
    }
  };

  const handleInstrumentChange = (instrument: InstrumentType) => {
    setSelectedInstrument(instrument);
    const instrumentNotes = [...INSTRUMENTS[instrument].notes];
    // Randomize the order of notes
    for (let i = instrumentNotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [instrumentNotes[i], instrumentNotes[j]] = [instrumentNotes[j], instrumentNotes[i]];
    }
    // Reset to first 2 notes of new instrument (randomized)
    setCurrentNotes(instrumentNotes.slice(0, 2));
    setMasteredNotes([]);
    setPhase('introduction');
  };

  const resetProgress = () => {
    setMasteredNotes([]);
    const instrumentNotes = [...INSTRUMENTS[selectedInstrument].notes];
    // Randomize the order of notes
    for (let i = instrumentNotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [instrumentNotes[i], instrumentNotes[j]] = [instrumentNotes[j], instrumentNotes[i]];
    }
    setCurrentNotes(instrumentNotes.slice(0, 2));
    setPhase('introduction');
    localStorage.removeItem('pitchPerfectProgress');
  };

  const handleNotesChange = (newNotes: Note[]) => {
    setCurrentNotes(newNotes);
    // Reset mastered notes when manually selecting notes
    setMasteredNotes([]);
    setPhase('introduction');
  };

  return (
    <ThemeProvider>
      <AudioProvider settings={audioSettings} instrument={selectedInstrument}>
        <div className="App">
          <header className="App-header">
            <h1>Pitch Perfect</h1>
            <p>Learn to identify musical notes by ear</p>
          </header>
          
          <main className="App-main">
            <InstrumentSelector
              selectedInstrument={selectedInstrument}
              onInstrumentChange={handleInstrumentChange}
            />
            
            <ProgressTracker 
              totalNotes={INSTRUMENTS[selectedInstrument].notes.length}
              masteredNotes={masteredNotes.length}
              currentPhase={phase}
            />
            
            <div className="controls">
              <button 
                className="settings-button"
                onClick={() => setShowSettings(!showSettings)}
                title="Audio Settings"
              >
                🎵 Audio
              </button>
              
              <button 
                className="theme-button"
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                title="Choose Theme"
              >
                🎨 Theme
              </button>
              
              <button 
                className="note-selector-toggle"
                onClick={() => setShowNoteSelector(!showNoteSelector)}
                title="Select Notes"
              >
                🎹 Notes
              </button>
              
              <button 
                className="reset-button"
                onClick={resetProgress}
                title="Reset all progress"
              >
                🔄 Reset
              </button>
            </div>
            
            {showThemeSelector && (
              <div onClick={() => setShowThemeSelector(false)} style={{ cursor: 'auto' }}>
                <div onClick={(e) => e.stopPropagation()}>
                  <ThemeSelector />
                </div>
              </div>
            )}
            
            {showNoteSelector && (
              <div onClick={() => setShowNoteSelector(false)} style={{ cursor: 'auto' }}>
                <div onClick={(e) => e.stopPropagation()}>
                  <NoteSelector
                    allNotes={INSTRUMENTS[selectedInstrument].notes}
                    selectedNotes={currentNotes}
                    onNotesChange={handleNotesChange}
                  />
                </div>
              </div>
            )}
            
            {showSettings && (
              <div onClick={() => setShowSettings(false)} style={{ cursor: 'auto' }}>
                <div onClick={(e) => e.stopPropagation()}>
                  <AudioSettings 
                    settings={audioSettings}
                    onSettingsChange={setAudioSettings}
                  />
                </div>
              </div>
            )}
          
          {phase === 'introduction' && (
            <NoteIntroduction
              notes={currentNotes}
              onProceedToQuiz={() => setPhase('quiz')}
            />
          )}
          
          {phase === 'quiz' && (
            <Quiz
              notes={currentNotes}
              onNoteMastered={handleNoteMastered}
              onBackToIntroduction={() => setPhase('introduction')}
            />
          )}
        </main>
      </div>
    </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
