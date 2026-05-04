# HIM - Her Intelligent Mate 🌸

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)

**HIM (Her Intelligent Mate)** is a sophisticated, offline-first wellness companion designed specifically for women. Migrated from a legacy PHP architecture, this modern React Native application leverages cutting-edge AI and high-performance local storage to provide a seamless, private, and empathetic user experience.

---

## ✨ Key Features

### 🧠 Empathetic AI Assistant
- **Voice & Text Interaction**: Integrated with **ElevenLabs** for life-like voice synthesis and **Google Gemini** for intelligent, context-aware conversations.
- **Mood Tracking**: Analyzes user input to provide tailored emotional support.

### 📅 Advanced Cycle Engine
- **Predictive Analytics**: High-accuracy phase prediction based on historical data.
- **Symptom Logging**: Granular tracking of physical and emotional symptoms.
- **Phase-Specific Advice**: Dynamic content recommendations tailored to the current cycle phase.

### 🏠 Wellness Hub
- **Curated Content**: Access to articles, videos, and exercises specifically chosen for women's health.
- **Video Integration**: Seamless playback of wellness content via YouTube iFrame integration.

### 🔒 Privacy & Offline-First
- **WatermelonDB**: High-performance local persistence using SQLite for a fast, offline-capable experience.
- **Secure Data**: Local-first approach ensures user data remains private.

### 🎨 Premium Design System
- **NativeWind (Tailwind CSS)**: Utility-first styling for a beautiful, responsive UI.
- **Dynamic Themes**: Support for 16+ themes with fluid animations powered by **React Native Reanimated**.

---

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: WatermelonDB (Offline-First)
- **Styling**: NativeWind (Tailwind CSS v4)
- **AI/ML**: Google Generative AI (Gemini), ElevenLabs (TTS)
- **Navigation**: React Navigation (Stack & Tabs)
- **UI Components**: Lucide React Native, React Native SVG, React Native Chart Kit

---

## 📂 Project Structure

```text
him_app/
├── assets/             # Images, fonts, and static assets
├── doc/                # Detailed technical documentation (PRD, Schema, Guidelines)
├── src/
│   ├── components/     # Reusable UI components (VoiceAssistant, Charts, etc.)
│   ├── database/       # WatermelonDB schema, models, and migrations
│   ├── navigation/     # Navigation configuration (Root, Tabs, Auth)
│   ├── screens/        # Application screens (Wellness, Cycle, Home)
│   ├── services/       # Business logic (AI handlers, Cycle engine, API)
│   └── utils/          # Helper functions and constants
├── App.tsx             # Main entry point
└── package.json        # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lucifer1642/him_new.git
   cd him_new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_key
   ELEVEN_LABS_API_KEY=your_elevenlabs_key
   ```
   *Refer to `.env.example` for all required variables.*

4. **Start the application**
   ```bash
   npx expo start
   ```

---

## 📖 Documentation

For a deeper dive into the system architecture and design decisions, please refer to the `/doc` directory:
- [Product Requirements (PRD)](doc/1-prd.md)
- [Website & App Flow](doc/2-website-flow.md)
- [Tech Stack Details](doc/3-tech-stack.md)
- [Frontend Guidelines](doc/4-frontend-guidelines.md)
- [Backend & Schema](doc/5-backend-schema.md)

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues or pull requests to help improve HIM.

## 📄 License

This project is private and confidential.

---
*Built with ❤️ for better women's wellness.*
