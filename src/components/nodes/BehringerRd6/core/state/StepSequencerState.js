// StepSequencerState.js - Observer pattern implementation for step sequencer
import { create } from 'zustand';

export const useStepSequencer = create((set, get) => ({
  // Track to channel mapping
  trackMapping: {
    1: ['accent'],
    2: ['bassDrum'],
    3: ['snareDrum'],
    4: ['lowTom'],
    5: ['highTom'],
    6: ['cymbal'],
    7: ['clap'],
    8: ['hiHat']
  },

  // State
  steps: {
    accent: Array(16).fill(false),
    bassDrum: Array(16).fill(false),
    snareDrum: Array(16).fill(false),
    lowTom: Array(16).fill(false),
    highTom: Array(16).fill(false),
    cymbal: Array(16).fill(false),
    clap: Array(16).fill(false),
    hiHat: Array(16).fill(false)
  },

  activeLEDs: {
    accent: -1,
    bassDrum: -1,
    snareDrum: -1,
    lowTom: -1,
    highTom: -1,
    cymbal: -1,
    clap: -1,
    hiHat: -1
  },

  selectedTrack: 1,

  // Actions
  setSelectedTrack: (track) => set({ selectedTrack: track }),

  toggleStep: (channel, stepIndex) => {
    set((state) => ({
      steps: {
        ...state.steps,
        [channel]: state.steps[channel].map((value, index) =>
          index === stepIndex ? !value : value
        )
      }
    }));
  },

  getActiveChannels: () => {
    const { selectedTrack, trackMapping } = get();
    return trackMapping[selectedTrack] || [];
  },

  setActiveLED: (channel, stepIndex) => {
    set((state) => ({
      activeLEDs: {
        ...state.activeLEDs,
        [channel]: stepIndex
      }
    }));
  }
}));

export class StepSequencerState {
  constructor() {
    this.observers = new Set();
    this.trackMapping = {
      1: ['accent'],
      2: ['bassDrum'],
      3: ['snareDrum'],
      4: ['lowTom'],
      5: ['highTom'],
      6: ['cymbal'],
      7: ['clap'],
      8: ['hiHat']
    };
    this.state = {
      currentStep: 0,
      isPlaying: false,
      selectedTrack: 1,
      steps: {
        accent: Array(16).fill(false),
        bassDrum: Array(16).fill(false),
        snareDrum: Array(16).fill(false),
        lowTom: Array(16).fill(false),
        highTom: Array(16).fill(false),
        cymbal: Array(16).fill(false),
        clap: Array(16).fill(false),
        hiHat: Array(16).fill(false)
      },
      accents: {
        accent: Array(16).fill(false),
        bassDrum: Array(16).fill(false),
        snareDrum: Array(16).fill(false),
        lowTom: Array(16).fill(false),
        highTom: Array(16).fill(false),
        cymbal: Array(16).fill(false),
        clap: Array(16).fill(false),
        hiHat: Array(16).fill(false)
      },
      activeLEDs: {
        accent: Array(16).fill(false),
        bassDrum: Array(16).fill(false),
        snareDrum: Array(16).fill(false),
        lowTom: Array(16).fill(false),
        highTom: Array(16).fill(false),
        cymbal: Array(16).fill(false),
        clap: Array(16).fill(false),
        hiHat: Array(16).fill(false)
      }
    };
  }

  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  notify() {
    this.observers.forEach(callback => callback(this.state));
  }

  getState() {
    return this.state;
  }

  setCurrentStep(step) {
    this.state.currentStep = step;
    this.updateActiveLEDs();
  }

  setPlaying(isPlaying) {
    this.state.isPlaying = isPlaying;
    this.updateActiveLEDs();
  }

  setSelectedTrack(trackValue) {
    this.state.selectedTrack = trackValue;
    this.updateActiveLEDs();
  }

  getSelectedChannels() {
    return this.trackMapping[this.state.selectedTrack] || ['accent'];
  }

  toggleStep(stepIndex, track) {
    const channels = this.getSelectedChannels();
    channels.forEach(channel => {
      this.state.steps[channel][stepIndex] = !this.state.steps[channel][stepIndex];
    });
    this.updateActiveLEDs();
    this.notify();
  }

  toggleAccent(stepIndex, track) {
    const channels = this.getSelectedChannels();
    channels.forEach(channel => {
      // Only allow accent if the step is active
      if (this.state.steps[channel][stepIndex]) {
        this.state.accents[channel][stepIndex] = !this.state.accents[channel][stepIndex];
      }
    });
    this.updateActiveLEDs();
    this.notify();
  }

  updateActiveLEDs() {
    // Clear all active LEDs
    Object.keys(this.state.activeLEDs).forEach(track => {
      this.state.activeLEDs[track] = Array(16).fill(false);
    });

    // Set active LED for current step on selected track
    const channels = this.getSelectedChannels();
    channels.forEach(channel => {
      if (this.state.activeLEDs[channel]) {
        // Always show the current step LED for the selected track
        this.state.activeLEDs[channel][this.state.currentStep] = true;
        
        // If playing, also show the step LEDs for the selected track
        if (this.state.isPlaying) {
          this.state.steps[channel].forEach((isActive, index) => {
            if (isActive) {
              this.state.activeLEDs[channel][index] = true;
            }
          });
        }
      }
    });

    this.notify();
  }
}

export const stepSequencerState = new StepSequencerState(); 