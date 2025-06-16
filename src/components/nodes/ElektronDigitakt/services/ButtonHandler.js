import {
    CommandManager,
    ToggleStepCommand,
    ClearPatternCommand,
    CopyPatternCommand,
    PastePatternCommand,
    SetPLockCommand,
    SetMicroTimingCommand,
    SetTrackParameterCommand,
    SetEffectParameterCommand,
    SetMasterEffectCommand
} from '@elektrond/commands';
import { AudioService, StateManager } from '@elektrond/services';

class ButtonHandler {
  constructor() {
    this.audioService = AudioService.getInstance();
    this.stateManager = StateManager;
    this.lastTap = null;
  }

  // Navigation methods
  handleArrowKey(direction) {
    const { ui } = this.stateManager.state;
    const { cursorPosition, currentPage, editMode } = ui;

    switch(direction) {
      case 'up':
        if (currentPage === 'sequencer') {
          this.stateManager.setActiveTrack(Math.max(0, ui.activeTrack - 1));
        } else if (editMode === 'parameter') {
          this.handleParameterAdjustment('up');
        }
        break;
      case 'down':
        if (currentPage === 'sequencer') {
          this.stateManager.setActiveTrack(Math.min(7, ui.activeTrack + 1));
        } else if (editMode === 'parameter') {
          this.handleParameterAdjustment('down');
        }
        break;
      case 'left':
        if (currentPage === 'sequencer') {
          this.stateManager.setCursorPosition(Math.max(0, cursorPosition.x - 1), cursorPosition.y);
        } else if (editMode === 'parameter') {
          this.handleParameterAdjustment('left');
        }
        break;
      case 'right':
        if (currentPage === 'sequencer') {
          this.stateManager.setCursorPosition(Math.min(15, cursorPosition.x + 1), cursorPosition.y);
        } else if (editMode === 'parameter') {
          this.handleParameterAdjustment('right');
        }
        break;
    }
  }

  // Sequencer methods
  handleSequencerButton(x, y) {
    const { ui, sequencer } = this.stateManager.state;
    const { currentPattern, patterns } = sequencer;
    const { activeTrack } = ui;

    if (ui.editMode === 'normal') {
      const command = new ToggleStepCommand(currentPattern, x, activeTrack);
      CommandManager.execute(command);
    } else if (ui.editMode === 'pLock') {
      const command = new SetPLockCommand(currentPattern, x, activeTrack, ui.selectedParameter);
      CommandManager.execute(command);
    }
  }

  handlePlayButton() {
    const isPlaying = !this.stateManager.state.sequencer.isPlaying;
    this.stateManager.togglePlay();
    
    if (isPlaying) {
      this.audioService.startSequencer();
    } else {
      this.audioService.stopSequencer();
    }
  }

  handleTempoButton() {
    const now = Date.now();
    if (this.lastTap) {
      const interval = now - this.lastTap;
      const newTempo = Math.round(60000 / interval);
      this.stateManager.setTempo(newTempo);
      this.audioService.setTempo(newTempo);
    }
    this.lastTap = now;
  }

  // Parameter methods
  handleParameterKnob(trackIndex, parameter, value) {
    const command = new SetTrackParameterCommand(trackIndex, parameter, value);
    CommandManager.execute(command);
  }

  handleEffectKnob(effect, parameter, value) {
    const command = new SetEffectParameterCommand(effect, parameter, value);
    CommandManager.execute(command);
  }

  handleMasterEffectKnob(effect, parameter, value) {
    const command = new SetMasterEffectCommand(effect, parameter, value);
    CommandManager.execute(command);
  }

  handleParameterAdjustment(direction) {
    const { ui } = this.stateManager.state;
    const { selectedParameter, activeTrack } = ui;
    
    if (!selectedParameter) return;

    const step = 0.01; // Fine adjustment step
    const currentValue = this.stateManager.state.tracks[activeTrack][selectedParameter];
    let newValue;

    switch(direction) {
      case 'up':
        newValue = Math.min(1, currentValue + step);
        break;
      case 'down':
        newValue = Math.max(0, currentValue - step);
        break;
      case 'left':
        newValue = Math.max(0, currentValue - step);
        break;
      case 'right':
        newValue = Math.min(1, currentValue + step);
        break;
    }

    this.handleParameterKnob(activeTrack, selectedParameter, newValue);
  }

  // Function methods
  handleFunctionButton(label) {
    switch(label) {
      case 'Copy':
        const copyCommand = new CopyPatternCommand();
        CommandManager.execute(copyCommand);
        break;
      case 'Clear':
        const clearCommand = new ClearPatternCommand();
        CommandManager.execute(clearCommand);
        break;
      case 'Paste':
        const pasteCommand = new PastePatternCommand();
        CommandManager.execute(pasteCommand);
        break;
      case 'Undo':
        CommandManager.undo();
        break;
      case 'Redo':
        CommandManager.redo();
        break;
      case 'PLock':
        this.stateManager.setEditMode('pLock');
        break;
      case 'Parameter':
        this.stateManager.setEditMode('parameter');
        break;
      case 'Page':
        this.cyclePage();
        break;
    }
  }

  cyclePage() {
    const pages = ['sequencer', 'sample', 'filter', 'amp', 'lfo', 'effects'];
    const currentIndex = pages.indexOf(this.stateManager.state.ui.currentPage);
    const nextIndex = (currentIndex + 1) % pages.length;
    this.stateManager.setCurrentPage(pages[nextIndex]);
  }

  handleEnter() {
    const { ui } = this.stateManager.state;
    
    if (ui.editMode === 'normal') {
      this.stateManager.setEditMode('pLock');
    } else if (ui.editMode === 'pLock') {
      this.stateManager.setEditMode('parameter');
    } else {
      this.stateManager.setEditMode('normal');
    }
  }

  handleBack() {
    const { ui } = this.stateManager.state;
    
    if (ui.editMode !== 'normal') {
      this.stateManager.setEditMode('normal');
    } else {
      this.stateManager.setCurrentPage('sequencer');
    }
  }
}

export default new ButtonHandler(); 