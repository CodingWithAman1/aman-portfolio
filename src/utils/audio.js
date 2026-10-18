// Lightweight Web Audio API synthesizer for futuristic interactive sounds
class SoundManager {
  constructor() {
    this.enabled = false; // muted by default for best UX
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playSuccess();
    }
    return this.enabled;
  }

  playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // AudioContext handling safety
    }
  }

  playLetterHover(char = 'a') {
    if (!this.enabled) return;
    // Map character code to pitch between 300Hz and 700Hz
    const code = char.charCodeAt(0) || 65;
    const freq = 320 + ((code * 17) % 380);
    this.playTone(freq, 'sine', 0.09, 0.03);
  }

  playButtonHover() {
    if (!this.enabled) return;
    this.playTone(587.33, 'triangle', 0.06, 0.03); // D5
  }

  playButtonClick() {
    if (!this.enabled) return;
    this.playTone(880, 'sine', 0.12, 0.06); // A5
  }

  playSuccess() {
    if (!this.enabled) return;
    this.playTone(523.25, 'sine', 0.15, 0.05);
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.05), 100);
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.06), 200);
    setTimeout(() => this.playTone(1046.50, 'sine', 0.35, 0.05), 300);
  }
}

export const sound = new SoundManager();
