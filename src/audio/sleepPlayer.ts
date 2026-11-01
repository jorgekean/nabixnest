import { ambientSoundscape } from './ambientSynth';
import type { AmbientType } from './ambientSynth';
import type { Story } from '../data/stories';

export interface PlayerState {
  isPlaying: boolean;
  currentStory: Story | null;
  currentTime: number;
  duration: number;
  voiceVolume: number;
  ambientVolume: number;
  ambientType: AmbientType;
  timerMinutesRemaining: number | null;
  isBlackScreen: boolean;
}

export type StateListener = (state: PlayerState) => void;

export class SleepPlayerController {
  private audio: HTMLAudioElement | null = null;
  private state: PlayerState = {
    isPlaying: false,
    currentStory: null,
    currentTime: 0,
    duration: 0,
    voiceVolume: 0.9,
    ambientVolume: 0.4,
    ambientType: 'rain',
    timerMinutesRemaining: null,
    isBlackScreen: false,
  };

  private listeners: Set<StateListener> = new Set();
  private timerInterval: number | null = null;
  private timerSecondsLeft: number = 0;
  private totalTimerSeconds: number = 0;

  constructor() {
    this.audio = new Audio();
    this.setupAudioListeners();
  }

  private setupAudioListeners() {
    if (!this.audio) return;

    this.audio.addEventListener('timeupdate', () => {
      if (!this.audio) return;
      this.state.currentTime = this.audio.currentTime;
      this.state.duration = this.audio.duration || 0;
      this.notify();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      if (!this.audio) return;
      this.state.duration = this.audio.duration || 0;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.state.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('play', () => {
      this.state.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.state.isPlaying = false;
      this.notify();
    });
  }

  public subscribe(listener: StateListener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn({ ...this.state }));
  }

  public async playStory(story: Story) {
    if (!this.audio) return;

    if (this.state.currentStory?.id !== story.id) {
      this.state.currentStory = story;
      this.audio.src = story.audioUrl;
      this.audio.volume = this.state.voiceVolume;
      this.audio.currentTime = 0;
    }

    try {
      await this.audio.play();
      this.state.isPlaying = true;

      // Start default ambient sound if not playing
      if (this.state.ambientType !== 'none') {
        ambientSoundscape.play(this.state.ambientType);
        ambientSoundscape.setVolume(this.state.ambientVolume);
      }
    } catch (err) {
      console.warn("Audio playback interrupted or requires gesture:", err);
    }
    this.notify();
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.state.isPlaying = false;
    this.notify();
  }

  public resume() {
    if (this.audio && this.state.currentStory) {
      this.audio.play().catch(console.warn);
      this.state.isPlaying = true;
    }
    this.notify();
  }

  public togglePlayPause() {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  public seek(seconds: number) {
    if (!this.audio) return;
    this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration || 0));
    this.state.currentTime = this.audio.currentTime;
    this.notify();
  }

  public seekRelative(deltaSeconds: number) {
    if (!this.audio) return;
    this.seek(this.audio.currentTime + deltaSeconds);
  }

  public setVoiceVolume(val: number) {
    this.state.voiceVolume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.state.voiceVolume;
    }
    this.notify();
  }

  public setAmbientVolume(val: number) {
    this.state.ambientVolume = Math.max(0, Math.min(1, val));
    ambientSoundscape.setVolume(this.state.ambientVolume);
    this.notify();
  }

  public setAmbientType(type: AmbientType) {
    this.state.ambientType = type;
    ambientSoundscape.play(type);
    ambientSoundscape.setVolume(this.state.ambientVolume);
    this.notify();
  }

  public setSleepTimer(minutes: number | null) {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.state.timerMinutesRemaining = minutes;

    if (minutes === null) {
      this.timerSecondsLeft = 0;
      this.totalTimerSeconds = 0;
      this.notify();
      return;
    }

    this.totalTimerSeconds = minutes * 60;
    this.timerSecondsLeft = this.totalTimerSeconds;

    this.timerInterval = window.setInterval(() => {
      this.timerSecondsLeft--;

      // Smooth volume fadeout in last 60 seconds
      if (this.timerSecondsLeft <= 60 && this.timerSecondsLeft > 0) {
        const fadeRatio = this.timerSecondsLeft / 60;
        if (this.audio) {
          this.audio.volume = this.state.voiceVolume * fadeRatio;
        }
        ambientSoundscape.setVolume(this.state.ambientVolume * fadeRatio);
      }

      if (this.timerSecondsLeft <= 0) {
        this.stopAll();
        this.setSleepTimer(null);
      } else {
        this.state.timerMinutesRemaining = Math.ceil(this.timerSecondsLeft / 60);
        this.notify();
      }
    }, 1000);

    this.notify();
  }

  public toggleBlackScreen(enabled?: boolean) {
    this.state.isBlackScreen = enabled !== undefined ? enabled : !this.state.isBlackScreen;
    this.notify();
  }

  public stopAll() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    ambientSoundscape.stop();
    this.state.isPlaying = false;
    this.notify();
  }

  public getState(): PlayerState {
    return { ...this.state };
  }
}

export const sleepPlayer = new SleepPlayerController();
