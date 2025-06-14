class Command {
  execute() {
    throw new Error('Method execute() must be implemented');
  }

  undo() {
    throw new Error('Method undo() must be implemented');
  }
}

class StartStopCommand extends Command {
  constructor(sequencer) {
    super();
    this.sequencer = sequencer;
    this.previousState = null;
  }

  execute() {
    this.previousState = this.sequencer.isPlaying;
    this.sequencer.setPlaying(!this.previousState);
  }

  undo() {
    if (this.previousState !== null) {
      this.sequencer.setPlaying(this.previousState);
    }
  }
}

class SetTempoCommand extends Command {
  constructor(sequencer, newTempo) {
    super();
    this.sequencer = sequencer;
    this.newTempo = newTempo;
    this.previousTempo = null;
  }

  execute() {
    this.previousTempo = this.sequencer.tempo;
    this.sequencer.setTempo(this.newTempo);
  }

  undo() {
    if (this.previousTempo !== null) {
      this.sequencer.setTempo(this.previousTempo);
    }
  }
}

class CommandManager {
  constructor() {
    this.commands = [];
    this.currentIndex = -1;
  }

  execute(command) {
    command.execute();
    this.commands = this.commands.slice(0, this.currentIndex + 1);
    this.commands.push(command);
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex >= 0) {
      const command = this.commands[this.currentIndex];
      command.undo();
      this.currentIndex--;
    }
  }

  redo() {
    if (this.currentIndex < this.commands.length - 1) {
      this.currentIndex++;
      const command = this.commands[this.currentIndex];
      command.execute();
    }
  }
}

export { Command, StartStopCommand, SetTempoCommand, CommandManager }; 