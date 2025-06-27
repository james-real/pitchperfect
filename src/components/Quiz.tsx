import React, { useState, useEffect } from 'react';
import { Note, QuizType, QuizQuestion } from '../types';
import AudioPlayer from './AudioPlayer';
import MusicFact from './MusicFact';

interface QuizProps {
  notes: Note[];
  onNoteMastered: (noteId: string) => void;
  onBackToIntroduction: () => void;
}

const Quiz: React.FC<QuizProps> = ({ notes, onNoteMastered, onBackToIntroduction }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [noteScores, setNoteScores] = useState<Record<string, { correct: number; total: number }>>({});

  const generateQuestion = (): QuizQuestion => {
    const type: QuizType = Math.random() > 0.5 ? 'audioToName' : 'nameToAudio';
    const correctNote = notes[Math.floor(Math.random() * notes.length)];
    
    const options = [correctNote];
    const availableNotes = notes.filter(n => n.id !== correctNote.id);
    
    while (options.length < Math.min(4, notes.length) && availableNotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableNotes.length);
      options.push(availableNotes[randomIndex]);
      availableNotes.splice(randomIndex, 1);
    }
    
    return {
      type,
      correctNote,
      options: options.sort(() => Math.random() - 0.5)
    };
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  useEffect(() => {
    notes.forEach(note => {
      const noteScore = noteScores[note.id];
      if (noteScore && noteScore.total >= 10 && noteScore.correct / noteScore.total >= 0.8) {
        onNoteMastered(note.id);
      }
    });
  }, [noteScores, notes, onNoteMastered]);

  const handleAnswer = (noteId: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(noteId);
    const correct = noteId === currentQuestion?.correctNote.id;
    setIsCorrect(correct);
    
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));

    if (currentQuestion) {
      setNoteScores(prev => ({
        ...prev,
        [currentQuestion.correctNote.id]: {
          correct: (prev[currentQuestion.correctNote.id]?.correct || 0) + (correct ? 1 : 0),
          total: (prev[currentQuestion.correctNote.id]?.total || 0) + 1
        }
      }));
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (!currentQuestion) return null;

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h2>Quiz Time!</h2>
        <p>Score: {score.correct} / {score.total}</p>
        <button onClick={onBackToIntroduction}>Back to Learning</button>
      </div>

      <div className="question">
        {currentQuestion.type === 'audioToName' ? (
          <>
            <p>Listen to this note and identify it:</p>
            <AudioPlayer note={currentQuestion.correctNote} autoPlay={true} showName={false} />
            <div className="options">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  className={`option-button ${
                    selectedAnswer === option.id
                      ? isCorrect && option.id === currentQuestion.correctNote.id
                        ? 'correct'
                        : !isCorrect && option.id === selectedAnswer
                        ? 'incorrect'
                        : ''
                      : ''
                  } ${
                    selectedAnswer && option.id === currentQuestion.correctNote.id
                      ? 'show-correct'
                      : ''
                  }`}
                  onClick={() => handleAnswer(option.id)}
                  disabled={!!selectedAnswer}
                >
                  {option.name}
                  {option.id.includes('1') && ' (Low)'}
                  {option.id.includes('2') && ' (High)'}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p>Which note sounds like: <strong>{currentQuestion.correctNote.name}</strong>?</p>
            <div className="audio-with-options">
              {currentQuestion.options.map((option, index) => (
                <div key={option.id} className="option-group">
                  <AudioPlayer
                    note={option}
                    showName={false}
                  />
                  <button
                    className={`option-button ${
                      selectedAnswer === option.id
                        ? isCorrect && option.id === currentQuestion.correctNote.id
                          ? 'correct'
                          : !isCorrect && option.id === selectedAnswer
                          ? 'incorrect'
                          : ''
                        : ''
                    } ${
                      selectedAnswer && option.id === currentQuestion.correctNote.id
                        ? 'show-correct'
                        : ''
                    }`}
                    onClick={() => handleAnswer(option.id)}
                    disabled={!!selectedAnswer}
                  >
                    Option {index + 1}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedAnswer && (
        <div className="feedback">
          <p>{isCorrect ? '✓ Correct!' : '✗ Wrong answer'}</p>
          <button onClick={nextQuestion}>Next Question</button>
        </div>
      )}
      
      <MusicFact />
    </div>
  );
};

export default Quiz;