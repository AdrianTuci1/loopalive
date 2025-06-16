import { Command } from '@elektrond/commands';
import { StateManager, AudioService } from '@elektrond/services';

export class SetTrackParameterCommand extends Command {
  constructor(trackIndex, parameter, value) {
    super();
    this.trackIndex = trackIndex;
    this.parameter = parameter;
    this.value = value;
    this.previousValue = null;
  }

  execute() {
    const { tracks } = StateManager.state;
    this.previousValue = tracks[this.trackIndex][this.parameter];
    
    const newTracks = [...tracks];
    newTracks[this.trackIndex] = {
      ...newTracks[this.trackIndex],
      [this.parameter]: this.value
    };
    
    StateManager.setState({ tracks: newTracks });
    
    // Apply parameter changes to audio
    const audioService = AudioService.getInstance();
    const track = audioService.tracks[this.trackIndex];
    
    switch(this.parameter) {
      case 'volume':
        track.amp.volume.value = this.value * 20 - 20; // Convert to dB
        break;
      case 'pan':
        track.sampler.pan.value = this.value * 2 - 1; // Convert to stereo pan
        break;
      case 'pitch':
        track.sampler.pitch = this.value * 24 - 12; // Convert to semitones
        break;
      case 'filterCutoff':
        track.filter.frequency.value = this.value * 20000; // Convert to Hz
        break;
      case 'filterResonance':
        track.filter.Q.value = this.value * 20;
        break;
      case 'filterType':
        track.filter.type = this.value;
        break;
      case 'ampAttack':
        track.amp.attack = this.value * 2;
        break;
      case 'ampDecay':
        track.amp.decay = this.value * 2;
        break;
      case 'ampHold':
        track.amp.hold = this.value * 2;
        break;
      case 'ampRelease':
        track.amp.release = this.value * 4;
        break;
      case 'lfoWaveform':
        track.lfo.type = this.value;
        break;
      case 'lfoSpeed':
        track.lfo.frequency.value = this.value * 20;
        break;
      case 'lfoDepth':
        track.lfo.min = -this.value * 1000;
        track.lfo.max = this.value * 1000;
        break;
    }
  }

  undo() {
    if (this.previousValue !== null) {
      const { tracks } = StateManager.state;
      const newTracks = [...tracks];
      newTracks[this.trackIndex] = {
        ...newTracks[this.trackIndex],
        [this.parameter]: this.previousValue
      };
      
      StateManager.setState({ tracks: newTracks });
      
      // Reapply the previous parameter value
      const audioService = AudioService.getInstance();
      const track = audioService.tracks[this.trackIndex];
      
      switch(this.parameter) {
        case 'volume':
          track.amp.volume.value = this.previousValue * 20 - 20;
          break;
        case 'pan':
          track.sampler.pan.value = this.previousValue * 2 - 1;
          break;
        case 'pitch':
          track.sampler.pitch = this.previousValue * 24 - 12;
          break;
        case 'filterCutoff':
          track.filter.frequency.value = this.previousValue * 20000;
          break;
        case 'filterResonance':
          track.filter.Q.value = this.previousValue * 20;
          break;
        case 'filterType':
          track.filter.type = this.previousValue;
          break;
        case 'ampAttack':
          track.amp.attack = this.previousValue * 2;
          break;
        case 'ampDecay':
          track.amp.decay = this.previousValue * 2;
          break;
        case 'ampHold':
          track.amp.hold = this.previousValue * 2;
          break;
        case 'ampRelease':
          track.amp.release = this.previousValue * 4;
          break;
        case 'lfoWaveform':
          track.lfo.type = this.previousValue;
          break;
        case 'lfoSpeed':
          track.lfo.frequency.value = this.previousValue * 20;
          break;
        case 'lfoDepth':
          track.lfo.min = -this.previousValue * 1000;
          track.lfo.max = this.previousValue * 1000;
          break;
      }
    }
  }
}

export class SetEffectParameterCommand extends Command {
  constructor(trackIndex, effect, parameter, value) {
    super();
    this.trackIndex = trackIndex;
    this.effect = effect;
    this.parameter = parameter;
    this.value = value;
    this.previousValue = null;
  }

  execute() {
    const { tracks } = StateManager.state;
    this.previousValue = tracks[this.trackIndex].effects[this.effect][this.parameter];
    
    const newTracks = [...tracks];
    newTracks[this.trackIndex].effects[this.effect][this.parameter] = this.value;
    
    StateManager.setState({ tracks: newTracks });
    
    // Apply effect parameter changes to audio
    const audioService = AudioService.getInstance();
    const effect = audioService.tracks[this.trackIndex].effects[this.effect];
    effect[this.parameter] = this.value;
  }

  undo() {
    if (this.previousValue !== null) {
      const { tracks } = StateManager.state;
      const newTracks = [...tracks];
      newTracks[this.trackIndex].effects[this.effect][this.parameter] = this.previousValue;
      
      StateManager.setState({ tracks: newTracks });
      
      // Reapply the previous effect parameter value
      const audioService = AudioService.getInstance();
      const effect = audioService.tracks[this.trackIndex].effects[this.effect];
      effect[this.parameter] = this.previousValue;
    }
  }
}

export class SetMasterEffectCommand extends Command {
  constructor(effect, parameter, value) {
    super();
    this.effect = effect;
    this.parameter = parameter;
    this.value = value;
    this.previousValue = null;
  }

  execute() {
    const { effects } = StateManager.state;
    this.previousValue = effects[this.effect][this.parameter];
    
    const newEffects = { ...effects };
    newEffects[this.effect][this.parameter] = this.value;
    
    StateManager.setState({ effects: newEffects });
    
    // Apply master effect parameter changes to audio
    const audioService = AudioService.getInstance();
    const effect = audioService.masterEffects[this.effect];
    effect[this.parameter] = this.value;
  }

  undo() {
    if (this.previousValue !== null) {
      const { effects } = StateManager.state;
      const newEffects = { ...effects };
      newEffects[this.effect][this.parameter] = this.previousValue;
      
      StateManager.setState({ effects: newEffects });
      
      // Reapply the previous master effect parameter value
      const audioService = AudioService.getInstance();
      const effect = audioService.masterEffects[this.effect];
      effect[this.parameter] = this.previousValue;
    }
  }
}

export class SetPerformanceParameterCommand extends Command {
  constructor(parameter, value) {
    super();
    this.parameter = parameter;
    this.value = value;
    this.previousValue = null;
  }

  execute() {
    const { performance } = StateManager.state;
    this.previousValue = performance[this.parameter];
    
    StateManager.setState({
      performance: {
        ...performance,
        [this.parameter]: this.value
      }
    });
  }

  undo() {
    if (this.previousValue !== null) {
      const { performance } = StateManager.state;
      StateManager.setState({
        performance: {
          ...performance,
          [this.parameter]: this.previousValue
        }
      });
    }
  }
}

export class SetSampleCommand extends Command {
  constructor(trackIndex, sampleIndex) {
    super();
    this.trackIndex = trackIndex;
    this.sampleIndex = sampleIndex;
    this.previousSample = null;
  }

  execute() {
    const { tracks } = StateManager.state;
    this.previousSample = tracks[this.trackIndex].sampleIndex;
    
    const newTracks = [...tracks];
    newTracks[this.trackIndex] = {
      ...newTracks[this.trackIndex],
      sampleIndex: this.sampleIndex
    };
    
    StateManager.setState({ tracks: newTracks });
    
    // Update audio
    const audioService = AudioService.getInstance();
    audioService.tracks[this.trackIndex].loadSample(this.sampleIndex);
  }

  undo() {
    if (this.previousSample !== null) {
      const { tracks } = StateManager.state;
      const newTracks = [...tracks];
      newTracks[this.trackIndex] = {
        ...newTracks[this.trackIndex],
        sampleIndex: this.previousSample
      };
      
      StateManager.setState({ tracks: newTracks });
      
      // Restore previous sample
      const audioService = AudioService.getInstance();
      audioService.tracks[this.trackIndex].loadSample(this.previousSample);
    }
  }
}

export class SaveProjectCommand extends Command {
  constructor(projectName) {
    super();
    this.projectName = projectName;
    this.previousState = null;
  }

  execute() {
    const state = StateManager.state;
    this.previousState = JSON.parse(JSON.stringify(state));
    
    // Save to localStorage
    localStorage.setItem(`project_${this.projectName}`, JSON.stringify(state));
  }

  undo() {
    if (this.previousState) {
      StateManager.setState(this.previousState);
    }
  }
}

export class LoadProjectCommand extends Command {
  constructor(projectName) {
    super();
    this.projectName = projectName;
    this.previousState = null;
  }

  execute() {
    const state = StateManager.state;
    this.previousState = JSON.parse(JSON.stringify(state));
    
    // Load from localStorage
    const savedState = localStorage.getItem(`project_${this.projectName}`);
    if (savedState) {
      StateManager.setState(JSON.parse(savedState));
    }
  }

  undo() {
    if (this.previousState) {
      StateManager.setState(this.previousState);
    }
  }
} 