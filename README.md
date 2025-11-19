# Kermus Festival App

A React Native mobile application built with Expo for the Kermus Festival. This app provides festival attendees with event information, activity schedules, and FAQs.

## Features

- **Home Screen**: View the currently active festival and upcoming events
- **Program Screen**: Browse festival activities with filtering options
- **Info Screen**: Access FAQs organized by category with accordion-style display
- **Mock Data**: Simulated data loading with festivals, activities, and FAQs

## Tech Stack

- **React Native** with **Expo SDK 54**
- **React Navigation** (Bottom Tabs)
- **React Native Safe Area Context**
- **React Native Screens**
- **React Native Gesture Handler**
- **React Native Reanimated**
- **Expo Vector Icons**

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/UICT-IT/Buyuk-Chamlija.git
cd buyuk-chamlija
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Project Structure

```
buyuk-chamlija/
├── App.js                      # Main app component
├── index.js                    # App entry point
├── src/
│   ├── data/
│   │   └── mockData.js        # Mock festival data
│   ├── navigation/
│   │   └── AppNavigator.js    # Bottom tab navigation
│   └── screens/
│       ├── HomeScreen.js      # Home/Events screen
│       ├── ProgramScreen.js   # Activities screen
│       └── InfoScreen.js      # FAQ screen
├── assets/                     # Images and icons
└── package.json
```

## Available Scripts

- `npx expo start` - Start the Expo development server
- `npx expo run android` - Run on Android device/emulator
- `npx expo run ios` - Run on iOS device/simulator (macOS only)
- `npx expo run web` - Run in web browser

## Features Overview

### Home Screen
- Displays the active festival with a "LIVE NOW" badge
- Lists upcoming festivals
- Tap any festival to view details (operating hours, entrance fees)

### Program Screen
- Shows all activities for the active festival
- Filter activities by category (e.g., "Kids Activities")
- Displays activity time, name, location, and category

### Info Screen
- Categorized FAQs (General Information & Festival Specifics)
- Accordion-style expand/collapse interaction
- Easy-to-read Q&A format

## Known Issues

- App requires Expo Go to run (not a standalone build)
- New Architecture is enabled in Expo Go by default

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Project Link: [https://github.com/UICT-IT/Buyuk-Chamlija](https://github.com/UICT-IT/Buyuk-Chamlija)
