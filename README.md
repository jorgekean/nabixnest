# 🦉 NabiX Nest — Calm Sleep Stories for Kids

> **Screen-free, low-stimulation bedtime audio stories, gentle ambient soundscapes, and soothing sleep routines for children.**

[![Deploy to GitHub Pages](https://github.com/jorgekean/nabixnest/actions/workflows/deploy.yml/badge.svg)](https://github.com/jorgekean/nabixnest/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://jorgekean.github.io/nabixnest/)

---

## ✨ Features

- **🌙 100% Screen-Free Philosophy**: Designed to settle young minds into sleep without blue light or stimulating visuals.
- **🎙️ Studio Narration & Custom Story Engine**:
  - Pre-recorded calming bedtime stories featuring lovable animal friends (Barnaby Bear, Luna Owl, Oliver Otter, Zuno Fox).
  - Custom personalized bedtime story generator with soothing, slowed speech synthesis.
- **🌧️ Real-Time Procedural Soundscapes**:
  - Web Audio API ambient sound generator: Warm Rain, Ocean Waves, Night Forest Crickets, Soft Campfire, Gentle White Noise, or Quiet Lullaby.
- **🎛️ Dual-Track Audio Mixer**:
  - Adjust narration and ambient background sound independently to find each child's perfect sleep environment.
- **⏱️ Auto-Dimming Sleep Timer**:
  - Select 5, 15, 30, 45, or 60 minutes with gradual volume fade-out.
- **🌑 Nightstand Mode**:
  - Deep black OLED-friendly screen mode with subtle amber glow for zero bedside disturbance.
- **📱 Offline PWA Support**:
  - Full Progressive Web App with offline service worker precaching. Works seamlessly in airplane mode or bedside without Wi-Fi.

---

## 🚀 Live Demo

- **PWA URL**: [https://jorgekean.github.io/nabixnest/](https://jorgekean.github.io/nabixnest/)

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **PWA**: `vite-plugin-pwa` with Workbox precaching
- **Audio**: Web Audio API Procedural Synthesizers + HTML5 Audio + Web Speech Synthesis
- **Icons**: Lucide Icons
- **Deployment**: GitHub Pages via GitHub Actions CI/CD (`gh-pages` branch + GitHub Pages deployment)

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/jorgekean/nabixnest.git
cd nabixnest

# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT © [jorgekean](https://github.com/jorgekean)
