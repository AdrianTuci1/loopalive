import { Command } from '@elektrond/commands';
import { StateManager, AudioService } from '@elektrond/services';

export class ToggleStepCommand extends Command {
  constructor(patternIndex, stepIndex, trackIndex) {
    super();
    this.patternIndex = patternIndex;
    this.stepIndex = stepIndex;
    this.trackIndex = trackIndex;
    this.previousState = null;
  }

  execute() {
    const { patterns } = StateManager.state.sequencer;
    this.previousState = JSON.parse(JSON.stringify(patterns[this.patternIndex][this.stepIndex]));
    
    const newPatterns = [...patterns];
    if (!newPatterns[this.patternIndex][this.stepIndex].tracks) {
      newPatterns[this.patternIndex][this.stepIndex].tracks = Array(8).fill(null);
    }
    
    newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex] = {
      active: !newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex]?.active,
      pLocks: {}
    };
    
    StateManager.setState({ 
      sequencer: { 
        ...StateManager.state.sequencer, 
        patterns: newPatterns 
      } 
    });
    
    if (newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex].active) {
      AudioService.getInstance().tracks[this.trackIndex].sampler.triggerAttackRelease('C4', '16n');
    }
  }

  undo() {
    if (this.previousState) {
      const { patterns } = StateManager.state.sequencer;
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex][this.stepIndex] = this.previousState;
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }
}

export class SetPLockCommand extends Command {
  constructor(patternIndex, stepIndex, trackIndex, parameter) {
    super();
    this.patternIndex = patternIndex;
    this.stepIndex = stepIndex;
    this.trackIndex = trackIndex;
    this.parameter = parameter;
    this.previousValue = null;
  }

  execute() {
    const { patterns } = StateManager.state.sequencer;
    const step = patterns[this.patternIndex][this.stepIndex];
    
    if (step.tracks[this.trackIndex]) {
      this.previousValue = step.tracks[this.trackIndex].pLocks[this.parameter];
      
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex].pLocks[this.parameter] = 
        StateManager.state.tracks[this.trackIndex][this.parameter];
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }

  undo() {
    if (this.previousValue !== null) {
      const { patterns } = StateManager.state.sequencer;
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex].pLocks[this.parameter] = this.previousValue;
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }
}

export class SetMicroTimingCommand extends Command {
  constructor(patternIndex, stepIndex, trackIndex, timing) {
    super();
    this.patternIndex = patternIndex;
    this.stepIndex = stepIndex;
    this.trackIndex = trackIndex;
    this.timing = timing;
    this.previousValue = null;
  }

  execute() {
    const { patterns } = StateManager.state.sequencer;
    const step = patterns[this.patternIndex][this.stepIndex];
    
    if (step.tracks[this.trackIndex]) {
      this.previousValue = step.tracks[this.trackIndex].microTiming;
      
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex].microTiming = this.timing;
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }

  undo() {
    if (this.previousValue !== null) {
      const { patterns } = StateManager.state.sequencer;
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex][this.stepIndex].tracks[this.trackIndex].microTiming = this.previousValue;
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }
}

export class ClearPatternCommand extends Command {
  constructor(patternIndex) {
    super();
    this.patternIndex = patternIndex;
    this.previousState = null;
  }

  execute() {
    const { patterns } = StateManager.state.sequencer;
    this.previousState = JSON.parse(JSON.stringify(patterns[this.patternIndex]));
    
    const newPatterns = [...patterns];
    newPatterns[this.patternIndex] = Array(16).fill().map(() => ({
      active: false,
      tracks: Array(8).fill(null),
      pLocks: {}
    }));
    
    StateManager.setState({ 
      sequencer: { 
        ...StateManager.state.sequencer, 
        patterns: newPatterns 
      } 
    });
  }

  undo() {
    if (this.previousState) {
      const { patterns } = StateManager.state.sequencer;
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex] = this.previousState;
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }
}

export class CopyPatternCommand extends Command {
  constructor(patternIndex) {
    super();
    this.patternIndex = patternIndex;
    this.copiedPattern = null;
  }

  execute() {
    const { patterns } = StateManager.state.sequencer;
    this.copiedPattern = JSON.parse(JSON.stringify(patterns[this.patternIndex]));
  }

  undo() {
    // Copy command doesn't need undo
  }
}

export class PastePatternCommand extends Command {
  constructor(patternIndex) {
    super();
    this.patternIndex = patternIndex;
    this.previousState = null;
  }

  execute() {
    const { patterns } = StateManager.state.sequencer;
    this.previousState = JSON.parse(JSON.stringify(patterns[this.patternIndex]));
    
    if (this.copiedPattern) {
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex] = JSON.parse(JSON.stringify(this.copiedPattern));
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }

  undo() {
    if (this.previousState) {
      const { patterns } = StateManager.state.sequencer;
      const newPatterns = [...patterns];
      newPatterns[this.patternIndex] = this.previousState;
      
      StateManager.setState({ 
        sequencer: { 
          ...StateManager.state.sequencer, 
          patterns: newPatterns 
        } 
      });
    }
  }
}

export class SetPatternBankCommand extends Command {
  constructor(bankIndex) {
    super();
    this.bankIndex = bankIndex;
    this.previousBank = null;
  }

  execute() {
    const { sequencer } = StateManager.state;
    this.previousBank = sequencer.currentBank;
    
    StateManager.setState({
      sequencer: {
        ...sequencer,
        currentBank: this.bankIndex
      }
    });
  }

  undo() {
    if (this.previousBank !== null) {
      const { sequencer } = StateManager.state;
      StateManager.setState({
        sequencer: {
          ...sequencer,
          currentBank: this.previousBank
        }
      });
    }
  }
}

export class SetSongModeCommand extends Command {
  constructor(enabled) {
    super();
    this.enabled = enabled;
    this.previousState = null;
  }

  execute() {
    const { sequencer } = StateManager.state;
    this.previousState = sequencer.songMode;
    
    StateManager.setState({
      sequencer: {
        ...sequencer,
        songMode: this.enabled
      }
    });
  }

  undo() {
    if (this.previousState !== null) {
      const { sequencer } = StateManager.state;
      StateManager.setState({
        sequencer: {
          ...sequencer,
          songMode: this.previousState
        }
      });
    }
  }
}

export class SetSongStepCommand extends Command {
  constructor(stepIndex, patternIndex) {
    super();
    this.stepIndex = stepIndex;
    this.patternIndex = patternIndex;
    this.previousPattern = null;
  }

  execute() {
    const { sequencer } = StateManager.state;
    this.previousPattern = sequencer.songSteps[this.stepIndex];
    
    const newSongSteps = [...sequencer.songSteps];
    newSongSteps[this.stepIndex] = this.patternIndex;
    
    StateManager.setState({
      sequencer: {
        ...sequencer,
        songSteps: newSongSteps
      }
    });
  }

  undo() {
    if (this.previousPattern !== null) {
      const { sequencer } = StateManager.state;
      const newSongSteps = [...sequencer.songSteps];
      newSongSteps[this.stepIndex] = this.previousPattern;
      
      StateManager.setState({
        sequencer: {
          ...sequencer,
          songSteps: newSongSteps
        }
      });
    }
  }
}

export class SetQuantizeCommand extends Command {
  constructor(amount) {
    super();
    this.amount = amount;
    this.previousAmount = null;
  }

  execute() {
    const { sequencer } = StateManager.state;
    this.previousAmount = sequencer.quantizeAmount;
    
    StateManager.setState({
      sequencer: {
        ...sequencer,
        quantizeAmount: this.amount
      }
    });
  }

  undo() {
    if (this.previousAmount !== null) {
      const { sequencer } = StateManager.state;
      StateManager.setState({
        sequencer: {
          ...sequencer,
          quantizeAmount: this.previousAmount
        }
      });
    }
  }
} 