class RD6State {
  constructor(rd6) {
    this.rd6 = rd6;
  }

  handleStartStop() {
    throw new Error('Method handleStartStop() must be implemented');
  }

  handlePatternChange() {
    throw new Error('Method handlePatternChange() must be implemented');
  }

  handleWrite() {
    throw new Error('Method handleWrite() must be implemented');
  }
}

class PlayingState extends RD6State {
  handleStartStop() {
    this.rd6.setPlaying(false);
    this.rd6.setState(new StoppedState(this.rd6));
  }

  handlePatternChange() {
    // Pattern changes are not allowed while playing
    console.log('Cannot change pattern while playing');
  }

  handleWrite() {
    // Writing is not allowed while playing
    console.log('Cannot write while playing');
  }
}

class StoppedState extends RD6State {
  handleStartStop() {
    this.rd6.setPlaying(true);
    this.rd6.setState(new PlayingState(this.rd6));
  }

  handlePatternChange() {
    // Allow pattern changes when stopped
    this.rd6.changePattern();
  }

  handleWrite() {
    this.rd6.setState(new WritingState(this.rd6));
  }
}

class WritingState extends RD6State {
  handleStartStop() {
    // Stop writing and return to stopped state
    this.rd6.setState(new StoppedState(this.rd6));
  }

  handlePatternChange() {
    // Pattern changes are allowed while writing
    this.rd6.changePattern();
  }

  handleWrite() {
    // Save current pattern and return to stopped state
    this.rd6.savePattern();
    this.rd6.setState(new StoppedState(this.rd6));
  }
}

export { RD6State, PlayingState, StoppedState, WritingState }; 