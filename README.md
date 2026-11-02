# 🦉 NabiX Nest — Calm Sleep Stories for Kids

> **Screen-free, low-stimulation bedtime audio stories, gentle ambient soundscapes, and soothing sleep routines for children.**

[![Deploy to GitHub Pages](https://github.com/jorgekean/nabixnest/actions/workflows/deploy.yml/badge.svg)](https://github.com/jorgekean/nabixnest/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://jorgekean.github.io/nabixnest/)

---

## ✨ Features

- **🌙 100% Screen-Free Philosophy**: Designed to settle young minds into sleep without blue light or stimulating visuals.
- **🎙️ 19 Studio Neural Audio Stories**:
  - Full library of 19 high-definition bedtime stories read with Microsoft Azure Neural AI (`JennyNeural`, `GuyNeural`, `AriaNeural`).
  - Warm, comforting bedtime prosody tuned specifically for toddlers and young children.
  - Lovable animal companions: *Barnaby Bear, Luna Owl, Oliver Otter, Zuno Fox, Daisy Dinosaur, Sammy Turtle, Benny Bunny, Pip Cloud Train, Clara Koala, Milo Monkey, Hazel Hedgehog, Toby Tugboat, Ella Elephant, Finn Firefly, Penny Penguin, Rory Red Panda, Rosie Deer, Leo Lion, and Kiki Kitten*.
- **⏱️ Adjustable Voice Pacing**:
  - Fine-tune narration speed: **`0.75x Slower`**, **`0.85x Gentle`**, **`1.0x Bedtime`**, **`1.15x Clear`**, or **`1.25x Brisk`** to match each child's listening preference.
- **🌧️ Real-Time Procedural Soundscapes**:
  - Web Audio API ambient sound generator: Warm Rain, Ocean Waves, Night Forest Crickets, Soft Campfire, Gentle White Noise, or Quiet Lullaby.
- **🎛️ Dual-Track Audio Mixer**:
  - Adjust narration and ambient background sound independently to find each child's perfect sleep environment.
- **⏱️ Auto-Dimming Sleep Timer**:
  - Select 5, 15, 30, 45, or 60 minutes with gradual volume fade-out.
- **🌑 Nightstand Mode**:
  - Deep black OLED-friendly screen mode with subtle amber glow for zero bedside disturbance.
- **📱 100% Offline PWA**:
  - Complete library precached by service worker. Works in airplane mode or bedside with zero internet/Wi-Fi needed.

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
