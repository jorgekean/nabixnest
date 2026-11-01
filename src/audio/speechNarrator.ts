// Bedtime Speech Narrator for custom user-generated bedtime stories
// Uses Web Speech API with bedtime prosody (slow, warm, soft) layered with WebAudio ambient soundscapes

export interface SpeechProgressCallback {
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onEnd: () => void;
  onStart: () => void;
}

export class BedtimeSpeechNarrator {
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private progressTimer: number | null = null;
  private estimatedDuration: number = 0;
  private elapsedSeconds: number = 0;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.cachedVoices = window.speechSynthesis.getVoices();
  }

  private getBestBedtimeVoice(): SpeechSynthesisVoice | null {
    if (this.cachedVoices.length === 0) {
      this.loadVoices();
    }

    const enVoices = this.cachedVoices.filter(v => v.lang.startsWith('en'));
    if (enVoices.length === 0) return null;

    // Prefer high-quality neural / natural / gentle bedtime voices
    const preferred = enVoices.find(v => 
      v.name.includes('Natural') || 
      v.name.includes('Jenny') || 
      v.name.includes('Ava') || 
      v.name.includes('Google US English') ||
      v.name.includes('Samantha') ||
      v.name.includes('Serena')
    );

    return preferred || enVoices[0] || null;
  }

  public speak(
    text: string, 
    volume: number, 
    callbacks: SpeechProgressCallback
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis not supported on this device.");
      callbacks.onEnd();
      return;
    }

    this.stop();

    // Clean up text: replace multiple ellipses with single gentle pause
    const cleanText = text
      .replace(/\.\.\./g, ', ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleanText.split(/\s+/).filter(Boolean);
    // At bedtime speed (~110 words per minute), calculate estimated duration
    this.estimatedDuration = Math.max(30, Math.round((words.length / 110) * 60));
    this.elapsedSeconds = 0;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = this.getBestBedtimeVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Bedtime prosody: slow, gentle, warm pitch
    utterance.rate = 0.78; // Slow bedtime pacing (~110 wpm)
    utterance.pitch = 0.94; // Calm, chest-resonant pitch
    utterance.volume = Math.max(0, Math.min(1, volume));

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      callbacks.onStart();
      this.startProgressTracking(callbacks);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.stopProgressTracking();
      callbacks.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error or canceled:", e);
      this.isSpeaking = false;
      this.isPaused = false;
      this.stopProgressTracking();
      callbacks.onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  private startProgressTracking(callbacks: SpeechProgressCallback) {
    this.stopProgressTracking();
    this.progressTimer = window.setInterval(() => {
      if (!this.isPaused && this.isSpeaking) {
        this.elapsedSeconds += 0.5;
        callbacks.onTimeUpdate(
          Math.min(this.elapsedSeconds, this.estimatedDuration),
          this.estimatedDuration
        );

        if (this.elapsedSeconds >= this.estimatedDuration) {
          this.stopProgressTracking();
        }
      }
    }, 500);
  }

  private stopProgressTracking() {
    if (this.progressTimer) {
      window.clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  public pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isSpeaking) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  public stop() {
    this.stopProgressTracking();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
  }

  public setVolume(vol: number) {
    // SpeechSynthesisUtterance volume can only be set at creation,
    // but if paused or restarted it applies immediately.
    if (this.currentUtterance) {
      this.currentUtterance.volume = Math.max(0, Math.min(1, vol));
    }
  }

  public getDuration(): number {
    return this.estimatedDuration;
  }

  public getElapsedTime(): number {
    return this.elapsedSeconds;
  }
}

export const bedtimeSpeechNarrator = new BedtimeSpeechNarrator();
