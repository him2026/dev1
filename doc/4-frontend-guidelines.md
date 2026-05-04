# Frontend Design Guidelines

## 1. Aesthetic Vision: "Invisible & Empathetic UI"
The interface should feel like a calming breath of air. Minimalist, premium, and focused on accessibility. No cluttered menus or harsh colors.

## 2. Color Palette (Hex Codes)
- **Primary (Blossom)**: `#FF7096`
- **Primary Light**: `#FFF0F5`
- **Secondary (Lavender)**: `#B19CD9`
- **Secondary Dark**: `#9B8EC0`
- **Success (Sage)**: `#7CB69E`
- **Warning (Peach)**: `#FFAD8A`
- **Neutral (Slate)**: `#2B1E38`
- **Background**: `#FDF9FB`

## 3. Typography
- **Headings**: `Outfit` (Bold/ExtraBold) - For titles and status labels.
- **Body**: `Inter` (Regular/Medium) - For descriptions and chat messages.

## 4. Spacing & Layout
- **Container Padding**: `24px` (Standard horizontal padding).
- **Corner Radius**: 
  - Buttons: `24px`
  - Cards: `32px` to `40px` (Highly rounded for a soft feel)
- **Elevation**: Subtle shadows (`shadow-lg` with 10% opacity color).

## 5. UI Components
- **Glassmorphism**: Use semi-transparent white backgrounds with `backdrop-filter: blur` where applicable.
- **Micro-interactions**: Subtle scale-up on button press (`0.98x`).
- **Icons**: Thin-stroke Lucide icons for a modern, premium look.

## 6. Responsive Principles
- Fluid layouts using `Dimensions` and flexbox.
- Dynamic font scaling based on device size.
- Support for both Light and Dark modes with curated palettes.
