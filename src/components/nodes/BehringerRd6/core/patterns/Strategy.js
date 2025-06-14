class SequencerStrategy {
  execute(sequencer) {
    throw new Error('Method execute() must be implemented');
  }
}

class LinearSequencerStrategy extends SequencerStrategy {
  execute(sequencer) {
    const nextStep = (sequencer.currentStep + 1) % sequencer.totalSteps;
    sequencer.setStep(nextStep);
  }
}

class RandomSequencerStrategy extends SequencerStrategy {
  execute(sequencer) {
    const randomStep = Math.floor(Math.random() * sequencer.totalSteps);
    sequencer.setStep(randomStep);
  }
}

class PatternSequencerStrategy extends SequencerStrategy {
  constructor(pattern) {
    super();
    this.pattern = pattern;
  }

  execute(sequencer) {
    const nextStep = this.pattern[sequencer.currentStep];
    sequencer.setStep(nextStep);
  }
}

class SequencerContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy(sequencer) {
    this.strategy.execute(sequencer);
  }
}

export {
  SequencerStrategy,
  LinearSequencerStrategy,
  RandomSequencerStrategy,
  PatternSequencerStrategy,
  SequencerContext
}; 