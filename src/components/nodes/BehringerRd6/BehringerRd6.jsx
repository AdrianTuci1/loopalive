import React from 'react';
import '../../Node.css';
import './BehringerRd6.css';
import './BehringerRd6.frames.css';
import './BehringerRd6.notations.css';
import Knob from './common/Knob';
import Switch from './common/Switch';
import FourPositionSwitch from './common/FourPositionSwitch';
import { FunctionButton, Jack } from './common/Buttons';
import TempoFrame from './frames/TempoFrame';
import SelectFrame from './frames/SelectFrame';
import TrackFrame from './frames/TrackFrame';
import MeasureFrame from './frames/MeasureFrame';
import PatternFrame from './frames/PatternFrame';
import WriteFrame from './frames/WriteFrame';
import VolumeFrame from './frames/VolumeFrame';
import DistortionFrame from './frames/DistortionFrame';
import StepSequencer from './StepSequencer';
import MeasureVisualization from './MeasureVisualization';
import useBehringerRd6 from './useBehringerRd6';

const BehringerRd6 = () => {
  const {
    isPlaying,
    currentStep,
    steps,
    params,
    handleStepClick,
    handleKnobChange,
    togglePlay,
    clearSteps
  } = useBehringerRd6();

  const handleFunctionClick = (action) => {
    switch(action) {
      case 'startStop':
        togglePlay();
        break;
      case 'clear':
        clearSteps();
        break;
      case 'reset':
        // Implement reset logic
        break;
      // Add other function handlers
    }
  };

  const handleTopButtonClick = (index) => {
    // Implement top button click logic here
    console.log('Top button clicked:', index);
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
            value={params.accent} 
            onChange={(v) => handleKnobChange('accent', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="BASS DRUM" 
            value={params.bassDrum} 
            onChange={(v) => handleKnobChange('bassDrum', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="SNARE DRUM" 
            value={params.snareDrum} 
            onChange={(v) => handleKnobChange('snareDrum', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="L.H. TOM" 
            value={params.lowTom} 
            onChange={(v) => handleKnobChange('lowTom', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="CYMBAL/CLAP" 
            value={params.cymbal} 
            onChange={(v) => handleKnobChange('cymbal', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="O.C. HI HAT" 
            value={params.hiHat} 
            onChange={(v) => handleKnobChange('hiHat', v)}
            steps={10}
            color="#FFD600"
          />
          <Jack label="IN" />
          <Jack label="OUT" />
          <Knob 
            label="DISTORTION" 
            value={params.distortion} 
            onChange={(v) => handleKnobChange('distortion', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="TONE" 
            value={params.tone} 
            onChange={(v) => handleKnobChange('tone', v)}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="LEVEL" 
            value={params.level} 
            onChange={(v) => handleKnobChange('level', v)}
            steps={10}
            color="#FFD600"
          />
        </div>

        {/* Center row: Mode, Smiley, Distortion/Volume */}
        <div className="rd6-center-row">
          <TempoFrame>
            <Knob 
              label="" 
              value={params.tempo} 
              onChange={(v) => handleKnobChange('tempo', v)}
              steps={10}
              size={120}
              color="#FFD600"
            />
          </TempoFrame>
          <SelectFrame>
            <Switch 
              label="" 
              value={params.select} 
              onChange={(v) => handleKnobChange('select', v)}
              color="#FFD600"
            />
          </SelectFrame>
          <TrackFrame>
            <Knob 
              label="" 
              value={params.track} 
              onChange={(v) => handleKnobChange('track', v)}
              steps={8}
              color="#FFD600"
            />
          </TrackFrame>
          <Knob 
            label="MODE" 
            value={params.mode === 'pattern' ? 0.5 : 0} 
            onChange={(v) => handleKnobChange('mode', v > 0.25 ? 'pattern' : 'write')}
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
            <Switch 
              label="" 
              value={params.distortion} 
              onChange={(v) => handleKnobChange('distortion', v)}
              color="#FFD600"
            />
          </DistortionFrame>
          <VolumeFrame>
            <Knob 
              label="" 
              value={params.volume} 
              onChange={(v) => handleKnobChange('volume', v)}
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
                  onClick={() => handleFunctionClick('clear')}
                />
              </div>
            </div>
            <div className="rd6-start-stop-group">
              <div className="rd6-group-label">START/STOP</div>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="START/STOP" 
                  isActive={isPlaying}
                  onClick={() => handleFunctionClick('startStop')}
                />
              </div>
            </div>
          </div>

          {/* Second column - Measure switch and button */}
          <MeasureFrame>
            <FourPositionSwitch 
              value={params.measure}
              onChange={(v) => handleKnobChange('measure', v)}
              color="#FFD600"
            />
            <div className="rd6-measure-button-group">
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="MEASURE" 
                  onClick={() => handleFunctionClick('measure')}
                />
              </div>
            </div>
          </MeasureFrame>

          {/* Third column - Measure visualization and sequencer */}
          <div className="rd6-sequencer-column">
            <div className="rd6-measure-visualization">
              <MeasureVisualization currentStep={currentStep} />
            </div>
            <StepSequencer 
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
              onTopButtonClick={handleTopButtonClick}
            />
          </div>

          {/* Fourth column - Pattern and write controls */}
          <div className="rd6-pattern-column">
            <PatternFrame>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="PATTERN" 
                  onClick={() => handleFunctionClick('patternGroup')}
                />
              </div>
            </PatternFrame>
            <WriteFrame>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="WRITE/NEXT" 
                  onClick={() => handleFunctionClick('writeNext')}
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