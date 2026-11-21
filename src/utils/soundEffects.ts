/**
 * Native Web Audio API sound synthesizer for cute interactive sounds and party music.
 * Zero external audio files required, instant playback, zero network latency.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private partyMusicInterval: number | null = null;
  private isPartyMusicPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPartyMusicPlaying) {
      this.stopPartyMusic();
      this.isPartyMusicPlaying = true; // remember state to resume if unmuted
    } else if (!this.isMuted && this.isPartyMusicPlaying) {
      this.startPartyMusic();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Upbeat celebratory party music synthesizer
   * Plays a catchy, upbeat disco/chiptune loop
   */
  public startPartyMusic() {
    this.isPartyMusicPlaying = true;
    if (this.partyMusicInterval) return;

    const ctx = this.getContext();
    if (!ctx) return;

    // Happy melody notes in Hz (C-major / A-minor pentatonic happy party progression)
    // C5, E5, G5, A5, C6, G5, E5, D5
    const melody = [
      523.25, 659.25, 783.99, 880.00,
      1046.5, 783.99, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99,
      880.00, 1046.5, 1174.66, 1046.5
    ];

    // Bass notes (C3, G2, A2, F2)
    const bassline = [130.81, 98.00, 110.00, 87.31];

    let step = 0;
    const tempo = 150; // ms per 16th note (~100 BPM)

    const tick = () => {
      if (!this.isPartyMusicPlaying || this.isMuted) return;
      const audioCtx = this.getContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      // 1. Kick / Percussion on beats 0, 4, 8, 12
      if (step % 4 === 0) {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(35, now + 0.09);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.09);
        } catch {}
      }

      // 2. Off-beat hi-hat on beats 2, 6, 10, 14
      if (step % 4 === 2) {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'highpass' as unknown as OscillatorType;
          osc.frequency.setValueAtTime(4000, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
        } catch {}
      }

      // 3. Bass synth
      if (step % 4 === 0) {
        const bassFreq = bassline[Math.floor(step / 4) % bassline.length];
        try {
          const bassOsc = audioCtx.createOscillator();
          const bassGain = audioCtx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, now);
          bassGain.gain.setValueAtTime(0.15, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          bassOsc.connect(bassGain);
          bassGain.connect(audioCtx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + 0.25);
        } catch {}
      }

      // 4. Melodic cheerful synth lead
      const note = melody[step % melody.length];
      try {
        const leadOsc = audioCtx.createOscillator();
        const leadGain = audioCtx.createGain();
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(note, now);
        leadGain.gain.setValueAtTime(0.1, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        leadOsc.connect(leadGain);
        leadGain.connect(audioCtx.destination);
        leadOsc.start(now);
        leadOsc.stop(now + 0.14);
      } catch {}

      step = (step + 1) % 16;
    };

    this.partyMusicInterval = window.setInterval(tick, tempo);
  }

  public stopPartyMusic() {
    this.isPartyMusicPlaying = false;
    if (this.partyMusicInterval) {
      clearInterval(this.partyMusicInterval);
      this.partyMusicInterval = null;
    }
  }

  /**
   * Cute bubble pop sound for taps and clicks
   */
  public playPop() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, startTime);
      osc.frequency.exponentialRampToValueAtTime(880, startTime + 0.08);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.08);
    } catch {}
  }

  /**
   * Sparkle harp chime for magic/reveals
   */
  public playSparkle() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {}
  }

  /**
   * Candle blow-out gentle wind puff + chime
   */
  public playCandleBlow() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      setTimeout(() => {
        this.playSparkle();
      }, 100);
    } catch {}
  }

  /**
   * Cute munch / chewing crunch for feeding animals
   */
  public playMunch() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, startTime);
      osc.frequency.setValueAtTime(240, startTime + 0.04);
      osc.frequency.setValueAtTime(180, startTime + 0.08);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.12);
    } catch {}
  }

  /**
   * Cheerful fanfare when completing an action or winning
   */
  public playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.08;
        const duration = idx === chord.length - 1 ? 0.6 : 0.2;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {}
  }

  /**
   * Playful boing sound when dodging or evading
   */
  public playBoing() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, startTime);
      osc.frequency.exponentialRampToValueAtTime(620, startTime + 0.15);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    } catch {}
  }
}

export const sound = new SoundEffectsManager();
