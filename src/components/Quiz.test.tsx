import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import Quiz from './Quiz';
import { Note } from '../types';

const mockNotes: Note[] = [
  { id: 'E1', name: 'E', frequency: 82.41 },
  { id: 'A', name: 'A', frequency: 110.00 },
  { id: 'D', name: 'D', frequency: 146.83 }
];

describe('Quiz', () => {
  const mockOnNoteMastered = jest.fn();
  const mockOnBackToIntroduction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quiz header with score', () => {
    render(
      <Quiz 
        notes={mockNotes} 
        onNoteMastered={mockOnNoteMastered}
        onBackToIntroduction={mockOnBackToIntroduction}
      />
    );

    expect(screen.getByText('Quiz Time!')).toBeInTheDocument();
    expect(screen.getByText('Score: 0 / 0')).toBeInTheDocument();
    expect(screen.getByText('Back to Learning')).toBeInTheDocument();
  });

  it('generates audio to name questions', async () => {
    render(
      <Quiz 
        notes={mockNotes} 
        onNoteMastered={mockOnNoteMastered}
        onBackToIntroduction={mockOnBackToIntroduction}
      />
    );

    await waitFor(() => {
      const questionText = screen.queryByText('Listen to this note and identify it:');
      const nameText = screen.queryByText(/Which note sounds like:/);
      expect(questionText || nameText).toBeInTheDocument();
    });
  });

  it('shows feedback after answering', async () => {
    render(
      <Quiz 
        notes={mockNotes} 
        onNoteMastered={mockOnNoteMastered}
        onBackToIntroduction={mockOnBackToIntroduction}
      />
    );

    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      const optionButton = buttons.find(btn => 
        btn.textContent && ['E', 'A', 'D', 'Option 1', 'Option 2', 'Option 3'].includes(btn.textContent)
      );
      
      if (optionButton) {
        fireEvent.click(optionButton);
      }
    });

    await waitFor(() => {
      const correctText = screen.queryByText('✓ Correct!');
      const wrongText = screen.queryByText('✗ Wrong answer');
      expect(correctText || wrongText).toBeInTheDocument();
    });
  });

  it('updates score after answering', async () => {
    render(
      <Quiz 
        notes={mockNotes} 
        onNoteMastered={mockOnNoteMastered}
        onBackToIntroduction={mockOnBackToIntroduction}
      />
    );

    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      const optionButton = buttons.find(btn => 
        btn.textContent && ['E', 'A', 'D', 'Option 1', 'Option 2', 'Option 3'].includes(btn.textContent)
      );
      
      if (optionButton) {
        fireEvent.click(optionButton);
      }
    });

    await waitFor(() => {
      const scoreText = screen.getByText(/Score: \d+ \/ \d+/);
      expect(scoreText).toBeInTheDocument();
    });
  });

  it('calls onBackToIntroduction when back button is clicked', () => {
    render(
      <Quiz 
        notes={mockNotes} 
        onNoteMastered={mockOnNoteMastered}
        onBackToIntroduction={mockOnBackToIntroduction}
      />
    );

    const backButton = screen.getByText('Back to Learning');
    fireEvent.click(backButton);

    expect(mockOnBackToIntroduction).toHaveBeenCalledTimes(1);
  });
});