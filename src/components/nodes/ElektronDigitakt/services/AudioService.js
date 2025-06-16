import * as Tone from 'tone';

class AudioService {
  static instance = null;
  
  constructor() {
    if (AudioService.instance) {
      return AudioService.instance;
    }
    
    // Initialize audio context
    this.context = Tone.getContext();
    
    // Create track samplers
    this.tracks = Array(8).fill().map(() => {
      // Create nodes
      const sampler = new Tone.Sampler({
        urls: {
          C4: "/samples/kick.wav",
          D4: "/samples/snare.wav",
          E4: "/samples/hihat.wav"
        },
        onload: () => {
          console.log("Sampler loaded");
        }
      });
      const filter = new Tone.Filter();
      const amp = new Tone.AmplitudeEnvelope();
      const lfo = new Tone.LFO();
      
      // Connect nodes in the correct order
      sampler.chain(filter, amp, Tone.Destination);
      lfo.connect(filter.frequency);
      
      return {
        sampler,
        filter,
        amp,
        lfo,
        effects: {
          reverb: new Tone.Reverb().connect(Tone.Destination),
          delay: new Tone.FeedbackDelay().connect(Tone.Destination)
        }
      };
    });

    // Create master effects
    this.masterEffects = {
      reverb: new Tone.Reverb().toDestination(),
      delay: new Tone.FeedbackDelay().toDestination()
    };

    // Initialize sequencer
    this.sequencer = new Tone.Sequence();
    this.patterns = Array(8).fill().map(() => Array(16).fill(null));
    this.currentPattern = 0;
    this.isPlaying = false;
    this.tempo = 120;
    this.swing = 0;
    
    AudioService.instance = this;
  }

  static getInstance() {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  // Track methods
  async loadSample(trackIndex, note, url) {
    const track = this.tracks[trackIndex];
    await track.sampler.add(note, url);
  }

  async loadSamples(sampleMap) {
    const loadPromises = this.tracks.map(track => {
      return track.sampler.loaded;
    });
    await Promise.all(loadPromises);
  }

  setTrackParameter(trackIndex, parameter, value) {
    const track = this.tracks[trackIndex];
    
    switch(parameter) {
      case 'volume':
        track.amp.volume.value = value;
        break;
      case 'pan':
        track.sampler.pan.value = value;
        break;
      case 'pitch':
        track.sampler.pitch = value;
        break;
      case 'filterCutoff':
        track.filter.frequency.value = value;
        break;
      case 'filterResonance':
        track.filter.Q.value = value;
        break;
      case 'filterType':
        track.filter.type = value;
        break;
      case 'ampAttack':
        track.amp.attack = value;
        break;
      case 'ampDecay':
        track.amp.decay = value;
        break;
      case 'ampHold':
        track.amp.hold = value;
        break;
      case 'ampRelease':
        track.amp.release = value;
        break;
      case 'lfoWaveform':
        track.lfo.type = value;
        break;
      case 'lfoSpeed':
        track.lfo.frequency.value = value;
        break;
      case 'lfoDepth':
        track.lfo.min = -value;
        track.lfo.max = value;
        break;
    }
  }

  // Sequencer methods
  startSequencer() {
    if (!this.isPlaying) {
      Tone.Transport.start();
      this.isPlaying = true;
    }
  }

  stopSequencer() {
    if (this.isPlaying) {
      Tone.Transport.stop();
      this.isPlaying = false;
    }
  }

  setTempo(newTempo) {
    this.tempo = newTempo;
    Tone.Transport.bpm.value = newTempo;
  }

  setSwing(newSwing) {
    this.swing = newSwing;
    Tone.Transport.swing = newSwing;
  }

  setPattern(patternIndex, steps) {
    this.patterns[patternIndex] = steps;
    if (patternIndex === this.currentPattern) {
      this.updateSequencer();
    }
  }

  updateSequencer() {
    const currentPattern = this.patterns[this.currentPattern];
    this.sequencer.events = currentPattern.map((step, index) => {
      if (!step || !step.active) return null;
      
      return (time) => {
        step.tracks.forEach((trackStep, trackIndex) => {
          if (trackStep) {
            const track = this.tracks[trackIndex];
            const note = trackStep.note || 'C4';
            const velocity = trackStep.velocity || 1;
            
            // Apply P-locks
            if (trackStep.pLocks) {
              Object.entries(trackStep.pLocks).forEach(([param, value]) => {
                if (value !== null) {
                  this.setTrackParameter(trackIndex, param, value);
                }
              });
            }
            
            track.sampler.triggerAttackRelease(note, "16n", time, velocity);
          }
        });
      };
    });
  }

  // Effect methods
  setMasterEffectParameter(effect, parameter, value) {
    const effectNode = this.masterEffects[effect];
    if (effectNode) {
      effectNode[parameter] = value;
    }
  }

  setTrackEffectParameter(trackIndex, effect, parameter, value) {
    const track = this.tracks[trackIndex];
    if (track.effects[effect]) {
      track.effects[effect][parameter] = value;
    }
  }
}

export default AudioService; 