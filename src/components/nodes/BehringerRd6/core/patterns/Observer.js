class Subject {
  constructor() {
    this.observers = new Set();
  }

  attach(observer) {
    this.observers.add(observer);
  }

  detach(observer) {
    this.observers.delete(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class SequencerSubject extends Subject {
  constructor() {
    super();
    this.currentStep = 0;
    this.isPlaying = false;
    this.tempo = 120;
  }

  setStep(step) {
    this.currentStep = step;
    this.notify({ type: 'STEP_CHANGE', step });
  }

  setPlaying(isPlaying) {
    this.isPlaying = isPlaying;
    this.notify({ type: 'PLAYING_STATE_CHANGE', isPlaying });
  }

  setTempo(tempo) {
    this.tempo = tempo;
    this.notify({ type: 'TEMPO_CHANGE', tempo });
  }
}

export { Subject, SequencerSubject }; 