# Pitch Perfect - Development Context

## Project Overview
- Application Name: Pitch Perfect
- Purpose: Ear training for musical note identification
- Current Version: Alpha 2
- Supported Instruments: 
  - Guitar standard tuning (EADGBE) - 6 notes
  - Piano chromatic scale (A-G#) - 12 notes
- Technology: React SPA (Create React App with TypeScript)

## Technical Decisions
- Framework: React with TypeScript
- Styling: Plain CSS with component-specific classes, CSS variables for theming
- Audio: Web Audio API with instrument-specific synthesis
- State Management: React hooks (useState, useEffect) + Context API
- Testing: Jest + React Testing Library
- Storage: localStorage for progress and preferences

## Architecture
- Single Page Application
- Component-based structure:
  - App (main container)
  - AudioPlayer (reusable sound component)
  - NoteIntroduction (Phase 1)
  - Quiz (Phase 2 with progressive difficulty)
  - ProgressTracker (visual progress)
- Progressive difficulty system
- Session-based progress tracking

## Work Completed
- ✅ Initial project setup with Create React App
- ✅ Created PRD.md defining MVP requirements
- ✅ Created CONTEXT.md for tracking decisions
- ✅ Created TODO.md for task management
- ✅ Implemented all core components
- ✅ Added Web Audio API functionality
- ✅ Created three-phase learning system
- ✅ Styled with minimal, clean design
- ✅ Added comprehensive test suite

## Audio Implementation Details

### Guitar Sound Synthesis
- Triangle wave fundamental with 5 harmonics
- Frequencies for standard tuning:
  - E (low): 82.41 Hz
  - A: 110.00 Hz
  - D: 146.83 Hz
  - G: 196.00 Hz
  - B: 246.94 Hz
  - E (high): 329.63 Hz
- Guitar envelope: quick attack (0.01s), gradual decay

### Piano Sound Synthesis
- Sine wave fundamental with 3 harmonics
- Chromatic scale from A3 (220 Hz) to G#4 (415.30 Hz)
- Piano envelope: very quick attack (0.005s), faster decay
- More percussive character than guitar

## Quiz Logic
- Two question types: audio→name and name→audio
- Mastery threshold: 80% correct over 10 questions per note
- Progressive difficulty: adds one note at a time
- Random question generation with shuffled options

## Recent Updates (2025-06-27)

### Alpha 2 Release Features
- **Multi-instrument Support**: Added Piano chromatic scale
- **Randomized Learning**: Notes presented in random order
- **Context-aware Facts**: Different facts for each instrument
- **Enhanced UI**: Instrument dropdown, note selector, reordered buttons
- **Improved Quiz Layout**: Audio buttons directly above options
### UI/UX Overhaul
- Transformed from minimalistic to vibrant, musical-themed design
- Added gradient backgrounds and glassmorphism effects
- Implemented consistent button styling across all controls
- Added animations (bounce, shimmer, pulse, glow effects)

### New Features
- **Music Facts**: Educational component showing 90+ music facts
- **Audio Settings Panel**: User control over sound parameters
- **Progress Persistence**: localStorage implementation
- **Enhanced Audio**: Instrument-specific synthesis with harmonics
- **Theme System**: 5 themes with CSS variables (Minimal default)
- **Instrument Selector**: Switch between Guitar and Piano
- **Note Selection**: Manual note selection for focused practice

### Visual Improvements
- Purple/pink gradient theme with CSS variables
- Animated guitar emoji in header
- Progress bar with shimmer animation
- Glowing correct answer indicators
- Hover effects with smooth transitions

### Technical Enhancements
- AudioContext wrapper for settings propagation
- Improved test coverage with custom render utilities
- Better component organization
- Responsive design improvements

## Design Philosophy
- Moved from purely minimalistic to "vibrant minimalism"
- Maintains clean structure while adding visual interest
- Educational focus with music facts integration
- Smooth, modern animations without overwhelming users

## Next Steps
- Test on actual mobile devices
- Add more instrument options (piano, bass, etc.)
- Implement chord recognition
- Add multiplayer/competitive modes
- Create practice schedules
- Add visual waveform display