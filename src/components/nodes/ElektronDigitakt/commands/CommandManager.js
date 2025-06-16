class CommandManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  execute(command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo stack when new command is executed
  }

  undo() {
    if (this.undoStack.length > 0) {
      const command = this.undoStack.pop();
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const command = this.redoStack.pop();
      command.execute();
      this.undoStack.push(command);
    }
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}

export default new CommandManager(); 