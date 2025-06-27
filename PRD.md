# Pitch Perfect - Product Requirements Document

## Overview
Pitch Perfect is a web-based ear training application designed to help users develop their ability to identify musical notes by ear. Alpha 2 supports both guitar standard tuning (EADGBE) and piano chromatic scale (A-G#).

## Alpha 2 Release
The Alpha 2 release includes support for multiple instruments:
- **Guitar Standard Tuning**: E, A, D, G, B, E (6 notes)
- **Piano Chromatic Scale**: A, A#, B, C, C#, D, D#, E, F, F#, G, G# (12 notes)

### Learning System
The application uses a progressive three-phase approach:

#### Phase 1: Introduction
- Display a single note to the user
- Play the corresponding audio when clicked
- Show the note name clearly
- Allow repeated listening to familiarize with the sound

#### Phase 2: Quiz Mode
Two types of questions to reinforce learning:

1. **Audio to Name**: 
   - Play a note sound
   - User selects the correct note name from multiple choices

2. **Name to Audio**: 
   - Show a note name
   - User listens to multiple audio options and selects the matching sound

#### Phase 3: Progressive Difficulty
- Start with one note in the context
- Once user demonstrates mastery (e.g., 80% accuracy over 10 questions)
- Add another note to the learning context
- Continue until all 6 notes are mastered

### Technical Requirements
- Single Page Application (SPA)
- Minimalistic, clean interface
- Mobile-responsive design
- Audio playback capability
- Progress tracking within session

### User Interface
- Simple, distraction-free design
- Clear visual feedback for correct/incorrect answers
- Progress indicator showing mastered notes
- Easy-to-click buttons for mobile and desktop

### Success Metrics
- User can identify all 6 guitar notes with 90%+ accuracy
- Average time to complete full progression
- User engagement (session length, return rate)

## Current Features (Post-MVP)
### Enhanced Audio System
- Guitar-like sound synthesis with harmonics
- Adjustable audio settings:
  - Duration (1-5 seconds)
  - Harmonics/richness (0-6 overtones)
  - Volume control (10-100%)

### Visual Enhancements
- Vibrant gradient-based UI with musical theme
- Animated elements and smooth transitions
- Musical note symbols (♪, ♫, ♬, etc.) for anonymous notes
- Progress bar with shimmer effect
- Glassmorphism design elements

### Educational Features
- Music facts displayed during quiz
- 90+ interesting facts (40+ guitar, 40+ piano, 12 general)
- Context-aware facts based on selected instrument
- "Another Fact" button for continuous learning

### Persistence
- Local storage for progress saving
- Reset progress functionality
- Remembers mastered notes between sessions
- Saves selected instrument preference
- Theme preference persistence

### User Experience
- Minimum 2 notes to start (better learning curve)
- Clear alpha release labeling (Alpha 2)
- Responsive design for mobile devices
- Consistent button styling throughout
- Instrument selector dropdown
- Manual note selection for focused practice
- Randomized note learning order

### Alpha 2 Features
- **Multi-instrument Support**: Guitar and Piano
- **Instrument-specific Sound Synthesis**:
  - Guitar: Triangle wave with 5 harmonics
  - Piano: Sine wave with 3 harmonics, faster decay
- **Note Selection Interface**: Choose specific notes to practice
- **Theme System**: 5 themes (Minimal default, Vibrant, Dark, Ocean, Sunset)
- **Enhanced Progress Tracking**: Per-instrument progress