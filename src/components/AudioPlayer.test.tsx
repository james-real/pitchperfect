import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import AudioPlayer from './AudioPlayer';
import { Note } from '../types';

const mockNote: Note = { id: 'A', name: 'A', frequency: 110.00 };

describe('AudioPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note name when showName is true', () => {
    render(<AudioPlayer note={mockNote} showName={true} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('does not render note name when showName is false', () => {
    render(<AudioPlayer note={mockNote} showName={false} />);
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('renders correct name for low E', () => {
    const lowE: Note = { id: 'E1', name: 'E (low)', frequency: 82.41 };
    render(<AudioPlayer note={lowE} showName={true} />);
    expect(screen.getByText('E (low)')).toBeInTheDocument();
  });

  it('renders correct name for high E', () => {
    const highE: Note = { id: 'E2', name: 'E (high)', frequency: 329.63 };
    render(<AudioPlayer note={highE} showName={true} />);
    expect(screen.getByText('E (high)')).toBeInTheDocument();
  });

  it('plays note when button is clicked', () => {
    render(<AudioPlayer note={mockNote} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(window.AudioContext).toHaveBeenCalled();
  });

  it('autoplays when autoPlay prop is true', () => {
    render(<AudioPlayer note={mockNote} autoPlay={true} />);
    
    expect(window.AudioContext).toHaveBeenCalled();
  });
});