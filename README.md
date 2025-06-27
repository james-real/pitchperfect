# 🎵 Pitch Perfect - Musical Ear Training

A web-based ear training application to help you master musical note recognition by ear. Currently supports guitar standard tuning (EADGBE) and piano chromatic scale (A-G#).

![Pitch Perfect Logo](public/logo.svg)

## 🎯 Features

### Core Functionality
- **Progressive Learning System**: Start with 2 notes and gradually add more as you master them
- **Multiple Instruments**: 
  - 🎸 Guitar Standard Tuning (E, A, D, G, B, E)
  - 🎹 Piano Chromatic Scale (A, A#, B, C, C#, D, D#, E, F, F#, G, G#)
- **Interactive Quiz Modes**:
  - Audio → Name: Hear a note and identify it
  - Name → Audio: See a note name and pick the correct sound
- **Mastery Tracking**: 80% accuracy over 10 questions to master each note

### User Experience
- **5 Beautiful Themes**: Minimal (default), Vibrant, Dark, Ocean, and Sunset
- **Customizable Audio Settings**: Duration, harmonics, and volume control
- **Note Selection**: Focus practice on specific notes
- **Progress Persistence**: Your progress is saved locally
- **Educational Music Facts**: Learn interesting facts while you practice
- **Responsive Design**: Works great on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pitchperfect.git
cd pitchperfect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🐳 Docker Support

### Using Docker

Build the Docker image:
```bash
docker build -t pitch-perfect .
```

Run the container:
```bash
docker run -p 3000:80 pitch-perfect
```

### Using Docker Compose

```bash
docker-compose up
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🎮 How to Use

1. **Choose Your Instrument**: Select between Guitar or Piano from the dropdown
2. **Learn the Notes**: In the introduction phase, click on notes to hear them
3. **Take the Quiz**: Test your knowledge with randomized questions
4. **Track Progress**: Watch your mastery grow as you identify notes correctly
5. **Customize**: Adjust audio settings, select specific notes, or change themes

## 🎨 Themes

- **Minimal**: Clean, light theme with subtle grays (default)
- **Vibrant**: Purple/pink gradient theme
- **Dark**: Material dark theme with purple accents
- **Ocean**: Blue/teal gradient theme
- **Sunset**: Warm orange/yellow gradient theme

## 🔧 Configuration

### Audio Settings
- **Duration**: 1-5 seconds
- **Harmonics**: 0-6 overtones (affects instrument richness)
- **Volume**: 10-100%

### Local Storage
The app stores the following in your browser's local storage:
- Progress and mastered notes
- Selected instrument
- Theme preference
- Audio settings

## 📁 Project Structure

```
pitchperfect/
├── public/             # Static files and assets
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts (Audio, Theme)
│   ├── data/          # Note definitions and music facts
│   ├── types.ts       # TypeScript type definitions
│   └── App.tsx        # Main application component
├── docker/            # Docker configuration files
└── README.md          # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Uses the Web Audio API for sound synthesis
- Inspired by music education and ear training methods

---

**Alpha 2 Release** - More instruments and features coming soon! 🎼