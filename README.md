# ✨ Astro Journal - Astrology Journal App

A beautiful and intuitive mobile journal application that combines daily horoscopes with personal journaling, helping users connect with cosmic energies while documenting their daily experiences.

## 🌟 Features

### Current Features (v1.0.0)
- **Daily Horoscopes**: Get personalized daily horoscopes for all 12 zodiac signs
- **Zodiac Sign Selection**: Beautiful picker with detailed zodiac information
- **Journal Entries**: Write, edit, and manage daily journal entries
- **Auto-save**: Intelligent auto-save functionality for seamless journaling
- **Mood Tracking**: Track your daily mood alongside journal entries
- **Offline Support**: Works completely offline with local storage
- **Beautiful UI**: Modern, intuitive design with smooth animations
- **Responsive Design**: Optimized for all screen sizes
- **Local Storage**: AsyncStorage for offline data persistence
- **TypeScript**: Full type safety and better development experience

### Technical Features
- **Clean Architecture**: Modular, scalable folder structure
- **State Management**: Context API with useReducer for efficient state management
- **React Navigation**: Smooth navigation between screens
- **Expo**: Cross-platform development with easy deployment
- **Feature Flags**: Configurable feature system for easy development

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Emulator
- **Expo Go app** on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd astro-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   - **Expo Go (Recommended for testing)**: Scan QR code with Expo Go app on your phone
   - **iOS Simulator**: Press `i` in terminal or run `npm run ios`
   - **Android Emulator**: Press `a` in terminal or run `npm run android`
   - **Web Browser**: Press `w` in terminal or run `npm run web`

### Running with Expo Go

1. **Install Expo Go** from App Store (iOS) or Google Play Store (Android)
2. **Start the development server**: `npm start`
3. **Scan the QR code** with your device's camera (iOS) or Expo Go app (Android)
4. **The app will load** directly on your device
5. **Changes are reflected in real-time** - no need to rebuild

### Available Scripts

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser
```

## 📁 Project Structure

```
astro-journal/
├── android/                    # Android-specific build files
├── assets/                     # App assets (icons, images)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src/                        # Source code
│   ├── components/             # Reusable UI components
│   │   ├── HoroscopeCard.tsx  # Horoscope display component
│   │   └── ZodiacSignPicker.tsx # Zodiac sign selection
│   ├── config/                 # Configuration files
│   │   └── features.ts        # Feature flags and settings
│   ├── constants/              # App constants
│   │   └── zodiacSigns.ts     # Zodiac sign definitions
│   ├── context/                # Global state management
│   │   └── AppContext.tsx     # Main app context
│   ├── hooks/                  # Custom React hooks
│   │   └── useAutoSave.ts     # Auto-save functionality
│   ├── navigation/             # Navigation configuration
│   │   └── AppNavigator.tsx   # Main navigation setup
│   ├── screens/                # App screens
│   │   ├── HomeScreen.tsx     # Main home screen
│   │   └── JournalScreen.tsx  # Journal entry screen
│   ├── services/               # API and data services
│   │   ├── chatService.ts     # Chat functionality (future)
│   │   ├── horoscopeService.ts # Horoscope API integration
│   │   ├── journalService.ts  # Journal data management
│   │   └── notificationService.ts # Push notifications
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts           # Main type definitions
│   └── utils/                  # Utility functions
│       └── dateUtils.ts       # Date manipulation utilities
├── app.json                    # Expo configuration
├── App.tsx                     # Main app component
├── eas.json                    # EAS Build configuration
├── index.ts                    # App entry point
├── package.json                # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 🔮 How It Works

### Horoscope System
- **API Integration**: Connects to astrology API for real-time horoscopes
- **Fallback Data**: Comprehensive mock data for offline functionality
- **Daily Updates**: Fresh horoscopes for each zodiac sign every day
- **Zodiac Information**: Detailed information about each zodiac sign

### Journal System
- **Local Storage**: All journal entries stored locally using AsyncStorage
- **Auto-save**: Automatically saves entries after 2 seconds of inactivity
- **Mood Tracking**: Optional mood selection for each entry
- **Entry Management**: Edit, delete, and organize previous entries
- **Date-based Organization**: Entries organized by date for easy navigation

### State Management
- **Context API**: Centralized state management for app-wide data
- **Feature Flags**: Configurable feature system for easy development
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚧 Future Enhancements

### Communication Features
- **Chat System**: Real-time messaging with other astrology enthusiasts
  - Connect with users worldwide
  - Group chats by zodiac signs
  - Astrology-themed discussion rooms
  - Message encryption for privacy

- **Audio Call**: Voice communication for personal consultations
  - One-on-one astrology consultations
  - Group meditation sessions
  - Live horoscope readings
  - High-quality audio streaming

- **Video Call**: Face-to-face astrology sessions
  - Professional astrologer consultations
  - Visual birth chart sharing
  - Interactive learning sessions
  - Screen sharing capabilities

### Advanced Astrology Features
- **Kundli Generation**: Comprehensive birth chart analysis
  - Detailed natal chart creation
  - Planetary position calculations
  - House system interpretations
  - Transit tracking and predictions
  - Compatibility analysis between charts
  - Personalized astrological insights

## 🎨 Design Philosophy

### User Experience
- **Intuitive Navigation**: Simple, logical flow between features
- **Accessibility**: Designed for users of all abilities
- **Performance**: Smooth animations and fast response times
- **Offline First**: Seamless experience without internet connection

### Visual Design
- **Cosmic Aesthetic**: Space and astrology-inspired color scheme
- **Modern UI**: Clean, minimalist design with subtle animations
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Dark/Light Mode**: Future support for theme switching

## 🔧 Technical Architecture

### Current Tech Stack
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **TypeScript**: Type safety and better development experience
- **React Navigation**: Navigation between screens
- **AsyncStorage**: Local data persistence
- **Context API**: State management

### Scalability
- **Modular Components**: Reusable, maintainable component architecture
- **Service Layer**: Clean separation of business logic
- **Type Safety**: Full TypeScript implementation
- **Performance Optimization**: Efficient rendering and state updates

### Future-Proofing
- **Plugin Architecture**: Easy integration of new features
- **API Abstraction**: Flexible backend service integration
- **State Management**: Scalable context-based state handling
- **Navigation**: Extensible navigation structure

## 📱 Platform Support

### Current
- ✅ iOS (iPhone & iPad) - via Expo Go and native builds
- ✅ Android (Phone & Tablet) - via Expo Go and native builds
- ✅ Web (Progressive Web App) - via Expo web support

### Future
- 📋 Desktop applications (Windows, macOS, Linux)
- 📋 Smartwatch integration (Apple Watch, Wear OS)
- 📋 Smart TV apps
- 📋 Voice assistant integration

## 🚀 Deployment

### Development
```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser
```

### Production Build
```bash
# Using EAS Build (recommended)
eas build --platform ios
eas build --platform android
eas build --platform web

# Using Expo Classic Build
expo build:ios     # Build for iOS
expo build:android # Build for Android
expo build:web     # Build for web
```

### App Store Deployment
```bash
# Publish to Expo
expo publish

# Build production releases
eas build --platform ios --profile production
eas build --platform android --profile production
```

## 🧪 Testing

### Testing with Expo Go
1. **Install Expo Go** on your device
2. **Start development server**: `npm start`
3. **Scan QR code** with Expo Go
4. **Test all features** on real device
5. **Check performance** and user experience

### Testing on Simulators
- **iOS**: `npm run ios` (requires Xcode on macOS)
- **Android**: `npm run android` (requires Android Studio)
- **Web**: `npm run web` (opens in browser)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use the existing folder structure
- Add proper type definitions
- Test on both iOS and Android
- Ensure offline functionality works
