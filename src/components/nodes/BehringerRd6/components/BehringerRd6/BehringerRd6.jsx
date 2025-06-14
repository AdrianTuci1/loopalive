import React, { useRef, useEffect, useState } from 'react';
import '../../../../Node.css';
import '../../styles/BehringerRd6.css';
import '../../styles/BehringerRd6.frames.css';
import '../../styles/BehringerRd6.notations.css';

// Import all components and utilities from the main index
import {
  // Common components
  Knob,
  Switch,
  FourPositionSwitch,
  FunctionButton,
  Jack,
  
  // Frame components
  TempoFrame,
  SelectFrame,
  TrackFrame,
  MeasureFrame,
  PatternFrame,
  WriteFrame,
  VolumeFrame,
  DistortionFrame,
  
  // Sequencer components
  StepSequencer,
  MeasureVisualization,
  
  // Core patterns
  SequencerSubject,
  CommandManager,
  StartStopCommand,
  SetTempoCommand,
  StoppedState,
  LinearSequencerStrategy,
  SequencerContext,
  AudioFacade
} from '../../index';

const BehringerRd6 = () => {
  // Initialize our patterns
  const sequencerSubject = useRef(new SequencerSubject());
  const commandManager = useRef(new CommandManager());
  const [currentState, setCurrentState] = useState(new StoppedState());
  const sequencerContext = useRef(new SequencerContext(new LinearSequencerStrategy()));
  const audioFacade = useRef(new AudioFacade());

  // State for UI
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Subscribe to sequencer events
  useEffect(() => {
    const handleSequencerUpdate = (data) => {
      switch (data.type) {
        case 'STEP_CHANGE':
          setCurrentStep(data.step);
          break;
        case 'PLAYING_STATE_CHANGE':
          setIsPlaying(data.isPlaying);
          break;
        case 'TEMPO_CHANGE':
          setTempo(data.tempo);
          break;
        default:
          break;
      }
    };

    sequencerSubject.current.attach({ update: handleSequencerUpdate });

    return () => {
      sequencerSubject.current.detach({ update: handleSequencerUpdate });
      audioFacade.current.cleanup();
    };
  }, []);

  const handleStartStop = () => {
    const command = new StartStopCommand(sequencerSubject.current);
    commandManager.current.execute(command);
    currentState.handleStartStop();
  };

  const handleTempoChange = (newTempo) => {
    const command = new SetTempoCommand(sequencerSubject.current, newTempo);
    commandManager.current.execute(command);
  };

  const handleStepTrigger = (channel) => {
    audioFacade.current.playDrumSound(channel);
  };

  const handleClear = () => {
    sequencerContext.current.clearPattern();
    sequencerSubject.current.notify({ type: 'PATTERN_CLEAR' });
  };

  const handleReset = () => {
    sequencerContext.current.reset();
    setCurrentStep(0);
    sequencerSubject.current.notify({ type: 'PATTERN_RESET' });
  };

  const handleVolumeChange = (value) => {
    audioFacade.current.setVolume(value);
  };

  const handleDistortionChange = (value) => {
    audioFacade.current.setDistortion(value);
  };

  const handleAccentChange = (value) => {
    audioFacade.current.setAccent(value);
  };

  const handleDrumVolumeChange = (drum, value) => {
    audioFacade.current.setDrumVolume(drum, value);
  };

  return (
    <div className="node drum-node rd6-mockup">
      <div className="rd6-header">
        <h3>BEHRINGER RD-6</h3>
      </div>
      
      {/* Top row: Knobs */}
      <div className="rd6-controls">
        <div className="rd6-section">
          <Knob 
            label="ACCENT" 
            value={0.5} 
            onChange={handleAccentChange}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="BASS DRUM" 
            value={0.5} 
            onChange={(v) => handleDrumVolumeChange('bass', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="SNARE DRUM" 
            value={0.5} 
            onChange={(v) => handleDrumVolumeChange('snare', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="L.H. TOM" 
            value={0.5} 
            onChange={(v) => handleDrumVolumeChange('tom', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="CYMBAL/CLAP" 
            value={0.5} 
            onChange={(v) => handleDrumVolumeChange('cymbal', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="O.C. HI HAT" 
            value={0.5} 
            onChange={(v) => handleDrumVolumeChange('hihat', v)}
            steps={10}
            color="#FFD600"
          />
          <Jack label="IN" />
          <Jack label="OUT" />
          <Knob 
            label="DISTORTION" 
            value={0.5} 
            onChange={handleDistortionChange}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="TONE" 
            value={0.5} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="LEVEL" 
            value={0.7} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
        </div>

        {/* Center row: Mode, Smiley, Distortion/Volume */}
        <div className="rd6-center-row">
          <TempoFrame>
            <Knob 
              label="TEMPO" 
              value={tempo} 
              onChange={handleTempoChange}
              steps={10}
              size={120}
              color="#FFD600"
            />
          </TempoFrame>
          <SelectFrame>
            <Knob 
              label="SELECT" 
              value={0.5} 
              onChange={(v) => {}}
              steps={10}
              size={120}
              color="#FFD600"
            />
          </SelectFrame>
          <TrackFrame>
            <Knob 
              label="TRACK" 
              value={0.5} 
              onChange={(v) => {}}
              steps={10}
              size={120}
              color="#FFD600"
            />
          </TrackFrame>
          <Knob 
            label="MODE" 
            value={0.5} 
            onChange={(v) => {}}
            steps={2}
            color="#FFD600"
          />

          <div className="rd6-smiley">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="32" fill="#FFD600" stroke="#000" strokeWidth="2"/>
              <circle cx="24" cy="30" r="4" fill="#000"/>
              <circle cx="46" cy="30" r="4" fill="#000"/>
              <path d="M24 46 Q35 56 46 46" stroke="#000" strokeWidth="2.5" fill="none"/>
            </svg>
          </div>

          <DistortionFrame>
            <Knob 
              label="DISTORTION" 
              value={0.5} 
              onChange={handleDistortionChange}
              steps={10}
              color="#FFD600"
            />
          </DistortionFrame>
          <VolumeFrame>
            <Knob 
              label="VOLUME" 
              value={0.7} 
              onChange={handleVolumeChange}
              steps={10}
              size={120}
              color="#FFD600"
            />
          </VolumeFrame>
        </div>

        {/* Three columns layout */}
        <div className="rd6-three-columns">
          {/* First column - Control buttons */}
          <div className="rd6-control-column">
            <div className="rd6-reset-group">
              <div className="rd6-group-label">BAR RESET</div>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="CLEAR" 
                  onClick={handleClear}
                />
                <FunctionButton 
                  label="RESET" 
                  onClick={handleReset}
                />
              </div>
            </div>
            <div className="rd6-start-stop-group">
              <div className="rd6-group-label">START/STOP</div>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="START/STOP" 
                  onClick={handleStartStop}
                />
              </div>
            </div>
          </div>

          {/* Second column - Measure switch and button */}
          <MeasureFrame>
            <FourPositionSwitch 
              value={1}
              onChange={(v) => {}}
              color="#FFD600"
            />
            <div className="rd6-measure-button-group">
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="MEASURE" 
                  onClick={() => currentState.handlePatternChange()}
                />
              </div>
            </div>
          </MeasureFrame>

          {/* Third column - Measure visualization and sequencer */}
          <div className="rd6-sequencer-column">
            <div className="rd6-measure-visualization">
              <MeasureVisualization currentStep={currentStep} />
            </div>
            <StepSequencer onStepTrigger={handleStepTrigger} />
          </div>

          {/* Fourth column - Pattern and write controls */}
          <div className="rd6-pattern-column">
            <PatternFrame>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="PATTERN" 
                  onClick={() => currentState.handlePatternChange()}
                />
              </div>
            </PatternFrame>
            <WriteFrame>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="WRITE/NEXT" 
                  onClick={() => currentState.handleWrite()}
                />
              </div>
            </WriteFrame>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehringerRd6; 