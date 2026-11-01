// Bedtime Speech Narrator for custom user-generated bedtime stories
// Uses Web Speech API with bedtime prosody (slow, warm, soft) layered with WebAudio ambient soundscapes
// and sentence-by-sentence natural breathing pauses to eliminate robotic delivery.

export interface SpeechProgressCallback {
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onEnd: () => void;
  onStart: () => void;
}

export class BedtimeSpeechNarrator {
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private progressTimer: number | null = null;
  private pauseTimeout: number | null = null;
  private estimatedDuration: number = 0;
  private elapsedSeconds: number = 0;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private selectedVoiceURI: string | null = null;
  private sentenceQueue: string[] = [];
  private currentSentenceIndex: number = 0;
  private activeCallbacks: SpeechProgressCallback | null = null;
  private currentVolume: number = 0.9;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    this.cachedVoices = window.speechSynthesis.getVoices();
    return this.cachedVoices;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    const voices = this.loadVoices();
    const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    enVoices.sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
    return enVoices;
  }

  public setSelectedVoice(voiceURI: string) {
    this.selectedVoiceURI = voiceURI;
  }

  private scoreVoice(v: SpeechSynthesisVoice): number {
    const name = v.name.toLowerCase();
    let score = 0;

    // Prioritize ultra-natural neural / network voices over legacy offline robot synths
    if (name.includes('natural')) score += 120;
    if (name.includes('neural')) score += 110;
    if (name.includes('enhanced') || name.includes('premium')) score += 95;
    if (name.includes('siri')) score += 90;
    if (name.includes('jenny') || name.includes('aria') || name.includes('guy') || name.includes('ava')) score += 85;
    if (name.includes('google us english') || name.includes('google uk english')) score += 75;
    if (name.includes('samantha') || name.includes('serena') || name.includes('oliver') || name.includes('karen')) score += 60;

    // Online / network voices sound significantly more human than offline local formant engines
    if (v.localService === false) score += 40;

    // Penalize robotic, legacy sounding desktop engines
    if (name.includes('espeak') || name.includes('desktop') || name.includes('compact') || name.includes('robot')) {
      score -= 80;
    }

    return score;
  }

  public getBestBedtimeVoice(): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (voices.length === 0) return null;

    if (this.selectedVoiceURI) {
      const selected = voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (selected) return selected;
    }

    // Top scored neural/natural voice
    return voices[0] || null;
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
    this.currentVolume = volume;
    this.activeCallbacks = callbacks;

    // Clean up text and split into gentle natural sentence chunks
    // Splitting by sentence allows natural breathing pauses between thoughts,
    // avoiding the monotonous robotic runaway delivery of single huge blocks.
    const cleanText = text
      .replace(/\.\.\./g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    // Match sentences ending in punctuation
    const rawSentences = cleanText.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [cleanText];
    this.sentenceQueue = rawSentences
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (this.sentenceQueue.length === 0) {
      callbacks.onEnd();
      return;
    }

    const words = cleanText.split(/\s+/).filter(Boolean);
    // At relaxed bedtime speed (~95-105 words per minute including breath pauses)
    this.estimatedDuration = Math.max(30, Math.round((words.length / 100) * 60));
    this.elapsedSeconds = 0;
    this.currentSentenceIndex = 0;

    this.isSpeaking = true;
    this.isPaused = false;
    callbacks.onStart();
    this.startProgressTracking(callbacks);

    this.speakNextSentence();
  }

  private speakNextSentence() {
    if (!this.isSpeaking || this.isPaused) return;

    if (this.currentSentenceIndex >= this.sentenceQueue.length) {
      // Finished all sentences
      this.isSpeaking = false;
      this.isPaused = false;
      this.stopProgressTracking();
      if (this.activeCallbacks) {
        this.activeCallbacks.onEnd();
      }
      return;
    }

    const sentenceText = this.sentenceQueue[this.currentSentenceIndex];
    const utterance = new SpeechSynthesisUtterance(sentenceText);
    const voice = this.getBestBedtimeVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Bedtime prosody parameters:
    // Rate 0.74 - 0.78: calming bedtime story reading tempo
    // Pitch 0.94: warm, chest-resonant soothing frequency
    utterance.rate = 0.76;
    utterance.pitch = 0.94;
    utterance.volume = Math.max(0, Math.min(1, this.currentVolume));

    utterance.onend = () => {
      this.currentSentenceIndex++;
      if (!this.isSpeaking) return;

      // Natural Bedtime Breath Pause (400ms between sentences)
      // This mimics a human storyteller taking a quiet breath,
      // letting the ambient background rain/waves swell soothingly.
      this.pauseTimeout = window.setTimeout(() => {
        this.speakNextSentence();
      }, 420);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis utterance error:", e);
      this.currentSentenceIndex++;
      if (this.isSpeaking && this.currentSentenceIndex < this.sentenceQueue.length) {
        this.speakNextSentence();
      } else {
        this.isSpeaking = false;
        this.stopProgressTracking();
        if (this.activeCallbacks) {
          this.activeCallbacks.onEnd();
        }
      }
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
    if (this.pauseTimeout) {
      window.clearTimeout(this.pauseTimeout);
      this.pauseTimeout = null;
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
      // If we paused during a breath pause timeout, kick off next sentence
      if (!window.speechSynthesis.speaking) {
        this.speakNextSentence();
      }
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
    this.sentenceQueue = [];
    this.currentSentenceIndex = 0;
  }

  public setVolume(vol: number) {
    this.currentVolume = vol;
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
