export type AmbientType = 'none' | 'rain' | 'crickets' | 'lullaby' | 'waves';

export class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentType: AmbientType = 'none';
  private loopInterval: number | null = null;
  private nodes: AudioNode[] = [];

  constructor() {
    // Initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (!this.ctx || !this.masterGain) return;
    const clamped = Math.max(0, Math.min(1, volume));
    this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
  }

  public stop() {
    if (this.loopInterval) {
      window.clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.nodes.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore already disconnected nodes
      }
    });
    this.nodes = [];
    this.currentType = 'none';
  }

  public play(type: AmbientType) {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    if (type === this.currentType) return;
    this.stop();
    this.currentType = type;

    if (type === 'none') return;

    switch (type) {
      case 'rain':
        this.playRain();
        break;
      case 'crickets':
        this.playCrickets();
        break;
      case 'lullaby':
        this.playLullaby();
        break;
      case 'waves':
        this.playWaves();
        break;
    }
  }

  /* 🌧️ Soft Warm Rain on Leaves: Low-pass filtered pink noise */
  private playRain() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise approximation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Gentle low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.masterGain);
    whiteNoise.start();

    this.nodes.push(whiteNoise, filter);
  }

  /* 🌌 Night Breeze & Crickets */
  private playCrickets() {
    if (!this.ctx || !this.masterGain) return;

    // Gentle night wind drone
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    osc.connect(windGain);
    windGain.connect(this.masterGain);
    osc.start();
    this.nodes.push(osc, windGain);

    // Occasional cricket chirp
    const triggerCricketChirp = () => {
      if (!this.ctx || !this.masterGain || this.currentType !== 'crickets') return;
      const t0 = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const cOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        cOsc.type = 'triangle';
        cOsc.frequency.setValueAtTime(4500 + i * 200, t0 + i * 0.06);

        cGain.gain.setValueAtTime(0.0001, t0 + i * 0.06);
        cGain.gain.exponentialRampToValueAtTime(0.02, t0 + i * 0.06 + 0.02);
        cGain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.06 + 0.05);

        cOsc.connect(cGain);
        cGain.connect(this.masterGain);
        cOsc.start(t0 + i * 0.06);
        cOsc.stop(t0 + i * 0.06 + 0.06);
      }
    };

    triggerCricketChirp();
    this.loopInterval = window.setInterval(() => {
      if (Math.random() > 0.4) triggerCricketChirp();
    }, 2800);
  }

  /* 🎵 Music Box Lullaby: Calming pentatonic melody loop */
  private playLullaby() {
    if (!this.ctx || !this.masterGain) return;

    // Calming bedtime notes: G4, C5, E5, G5, A5, C6
    const melody = [
      { note: 783.99, delay: 0 },    // G5
      { note: 659.25, delay: 1.5 },  // E5
      { note: 523.25, delay: 3.0 },  // C5
      { note: 587.33, delay: 4.5 },  // D5
      { note: 659.25, delay: 6.0 },  // E5
      { note: 523.25, delay: 7.5 },  // C5
      { note: 440.00, delay: 9.0 },  // A4
      { note: 523.25, delay: 10.5 }, // C5
    ];

    const playMelodyCycle = () => {
      if (!this.ctx || !this.masterGain || this.currentType !== 'lullaby') return;
      const t0 = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.note, t0 + item.delay);

        gain.gain.setValueAtTime(0.0001, t0 + item.delay);
        gain.gain.exponentialRampToValueAtTime(0.09, t0 + item.delay + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + item.delay + 1.4);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t0 + item.delay);
        osc.stop(t0 + item.delay + 1.5);
      });
    };

    playMelodyCycle();
    this.loopInterval = window.setInterval(playMelodyCycle, 12000);
  }

  /* 🌊 Ocean Tide Breath: Slow, rhythmic swells (8s breath cycle) */
  private playWaves() {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const waveGain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(65, this.ctx.currentTime); // Low ocean rumble
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    // Modulate gain in a slow 8-second breathing surge
    waveGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    osc1.start();
    osc2.start();

    this.nodes.push(osc1, osc2, filter, waveGain);

    let swellIn = true;
    this.loopInterval = window.setInterval(() => {
      if (!this.ctx || !waveGain) return;
      const t = this.ctx.currentTime;
      if (swellIn) {
        waveGain.gain.setTargetAtTime(0.18, t, 1.8);
      } else {
        waveGain.gain.setTargetAtTime(0.03, t, 2.2);
      }
      swellIn = !swellIn;
    }, 4000);
  }
}

export const ambientSoundscape = new AmbientSoundscape();
