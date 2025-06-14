import { createDrumSounds } from "../audio/sounds/drumSounds";


class AudioFacade {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.7;
    
    // Initialize effects
    this.distortionNode = this.audioContext.createWaveShaper();
    this.toneNode = this.audioContext.createBiquadFilter();
    this.toneNode.type = 'lowpass';
    this.toneNode.frequency.value = 2000;
    
    // Connect effects chain
    this.masterGain.connect(this.toneNode);
    this.toneNode.connect(this.distortionNode);
    this.distortionNode.connect(this.audioContext.destination);
    
    // Initialize drum volumes
    this.drumVolumes = {
      bassDrum: 1.0,
      snareDrum: 1.0,
      lowTom: 1.0,
      highTom: 1.0,
      cymbal: 1.0,
      clap: 1.0,
      hiHat: 1.0
    };
    
    this.drumSounds = createDrumSounds(this.audioContext);
  }

  playDrumSound(channel) {
    if (!this.drumSounds || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    let soundNode;

    switch (channel) {
      case 'bassDrum':
        soundNode = this.drumSounds.createBassDrum(now);
        break;
      case 'snareDrum':
        soundNode = this.drumSounds.createSnareDrum(now);
        break;
      case 'lowTom':
        soundNode = this.drumSounds.createLowTom(now);
        break;
      case 'highTom':
        soundNode = this.drumSounds.createHighTom(now);
        break;
      case 'cymbal':
        soundNode = this.drumSounds.createCymbal(now);
        break;
      case 'clap':
        soundNode = this.drumSounds.createClap(now);
        break;
      case 'hiHat':
        soundNode = this.drumSounds.createHiHat(now);
        break;
      default:
        return;
    }

    if (soundNode) {
      // Apply individual drum volume
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = this.drumVolumes[channel] || 1.0;
      soundNode.connect(gainNode);
      gainNode.connect(this.masterGain);
    }
  }

  setMasterVolume(volume) {
    this.masterGain.gain.value = volume;
  }

  setDrumVolume(drum, volume) {
    if (this.drumVolumes.hasOwnProperty(drum)) {
      this.drumVolumes[drum] = volume;
    }
  }

  setDistortion(amount) {
    // Create a wave shaper curve for distortion
    const curve = new Float32Array(44100);
    for (let i = 0; i < 44100; i++) {
      const x = (i * 2) / 44100 - 1;
      curve[i] = Math.tanh(x * amount * 10);
    }
    this.distortionNode.curve = curve;
  }

  setTone(amount) {
    // Map amount (0-1) to frequency range (200Hz - 20kHz)
    const minFreq = 200;
    const maxFreq = 20000;
    const freq = minFreq * Math.pow(maxFreq / minFreq, amount);
    this.toneNode.frequency.value = freq;
  }

  setAccent(amount) {
    // Apply accent to all drum volumes
    Object.keys(this.drumVolumes).forEach(drum => {
      this.drumVolumes[drum] = Math.min(1.0, this.drumVolumes[drum] * (1 + amount));
    });
  }

  cleanup() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

export default AudioFacade; 