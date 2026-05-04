# Technology Stack & Dependencies

## 1. Core Frameworks
- **React Native**: `0.74.x` (Expo SDK 51)
- **TypeScript**: `~5.3.3`
- **Navigation**: `@react-navigation/native` `^6.1.17`
- **Styling**: `NativeWind` `^2.0.11` (Tailwind CSS for React Native)

## 2. Database & Persistence (Offline-First)
- **WatermelonDB**: `^0.27.1` (Local SQLite persistence)
- **SQLite**: `expo-sqlite` `^14.0.3`
- **Secure Storage**: `expo-secure-store` `^13.0.1`

## 3. AI & Communication
- **AI Engine**: Google Gemini API / Nvidia Llama 3.1
- **Voice Synthesis**: ElevenLabs SDK / `@11labs/client`
- **On-Device TTS**: `expo-speech` `^12.0.1`
- **Media**: `react-native-youtube-iframe` `^2.3.0`

## 4. UI & Aesthetics
- **Icons**: `lucide-react-native` `^0.378.0`
- **Typography**: Google Fonts (Outfit, Inter)
- **Charts**: `react-native-chart-kit` `^6.12.0`
- **Animations**: `react-native-reanimated` `^3.10.1`

## 5. Backend (Sync & Auth)
- **BaaS**: Supabase (PostgreSQL, Auth, Storage)
- **Edge Functions**: TypeScript-based handlers for AI context injection.

## 6. Development Tools
- **Build Tool**: Expo CLI
- **Testing**: Jest, React Native Testing Library
- **Linting**: ESLint, Prettier
