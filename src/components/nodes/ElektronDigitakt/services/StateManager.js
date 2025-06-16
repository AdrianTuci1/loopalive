class StateManager {
  constructor() {
    this.observers = new Set();
    this.state = {
      // Track states (8 tracks)
      tracks: Array(8).fill().map(() => ({
        sample: null,
        volume: 0.5,
        pan: 0,
        pitch: 0,
        startPoint: 0,
        endPoint: 1,
        decay: 0.5,
        filterCutoff: 0.5,
        filterResonance: 0,
        filterType: 'lowpass',
        ampAttack: 0,
        ampDecay: 0.5,
        ampHold: 0,
        ampRelease: 0.5,
        overdrive: 0,
        bitReduction: 16,
        sampleRateReduction: 1,
        playbackMode: 'oneshot',
        reverse: false,
        lfo: {
          waveform: 'sine',
          speed: 0.5,
          depth: 0,
          target: 'none'
        }
      })),
      
      // Sequencer state
      sequencer: {
        patterns: Array(8).fill().map(() => Array(16).fill().map(() => ({
          active: false,
          pLocks: {
            volume: null,
            pitch: null,
            startPoint: null,
            endPoint: null,
            decay: null,
            filterCutoff: null,
            microTiming: 0
          }
        }))),
        currentPattern: 0,
        currentStep: 0,
        isPlaying: false,
        tempo: 120,
        swing: 0
      },

      // Master effects
      effects: {
        reverb: {
          time: 0.5,
          decay: 0.5,
          mix: 0,
          feedback: 0.5
        },
        delay: {
          time: 0.5,
          feedback: 0.5,
          mix: 0
        }
      },

      // UI state
      ui: {
        activeTrack: 0,
        cursorPosition: { x: 0, y: 0 },
        currentPage: 'sequencer', // sequencer, sample, filter, amp, lfo, effects
        editMode: 'normal', // normal, pLock, parameter
        selectedParameter: null
      }
    };
  }

  subscribe(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  notify() {
    this.observers.forEach(observer => observer(this.state));
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // Track methods
  setTrackParameter(trackIndex, parameter, value) {
    const newTracks = [...this.state.tracks];
    newTracks[trackIndex] = { ...newTracks[trackIndex], [parameter]: value };
    this.setState({ tracks: newTracks });
  }

  setTrackSample(trackIndex, sample) {
    this.setTrackParameter(trackIndex, 'sample', sample);
  }

  // Sequencer methods
  toggleStep(patternIndex, stepIndex) {
    const newPatterns = [...this.state.sequencer.patterns];
    newPatterns[patternIndex][stepIndex].active = !newPatterns[patternIndex][stepIndex].active;
    this.setState({ sequencer: { ...this.state.sequencer, patterns: newPatterns } });
  }

  setPLock(patternIndex, stepIndex, parameter, value) {
    const newPatterns = [...this.state.sequencer.patterns];
    newPatterns[patternIndex][stepIndex].pLocks[parameter] = value;
    this.setState({ sequencer: { ...this.state.sequencer, patterns: newPatterns } });
  }

  // Transport methods
  setTempo(tempo) {
    this.setState({ sequencer: { ...this.state.sequencer, tempo } });
  }

  setSwing(swing) {
    this.setState({ sequencer: { ...this.state.sequencer, swing } });
  }

  togglePlay() {
    this.setState({ 
      sequencer: { 
        ...this.state.sequencer, 
        isPlaying: !this.state.sequencer.isPlaying 
      } 
    });
  }

  // Effect methods
  setEffectParameter(effect, parameter, value) {
    this.setState({ 
      effects: { 
        ...this.state.effects, 
        [effect]: { 
          ...this.state.effects[effect], 
          [parameter]: value 
        } 
      } 
    });
  }

  // UI methods
  setCursorPosition(x, y) {
    this.setState({ 
      ui: { 
        ...this.state.ui, 
        cursorPosition: { x, y } 
      } 
    });
  }

  setActiveTrack(trackIndex) {
    this.setState({ 
      ui: { 
        ...this.state.ui, 
        activeTrack: trackIndex 
      } 
    });
  }

  setCurrentPage(page) {
    this.setState({ 
      ui: { 
        ...this.state.ui, 
        currentPage: page 
      } 
    });
  }

  setEditMode(mode) {
    this.setState({ 
      ui: { 
        ...this.state.ui, 
        editMode: mode 
      } 
    });
  }

  setSelectedParameter(parameter) {
    this.setState({ 
      ui: { 
        ...this.state.ui, 
        selectedParameter: parameter 
      } 
    });
  }
}

export default new StateManager(); 