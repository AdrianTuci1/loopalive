import React, { useRef, useEffect } from 'react';
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
import { createDrumSounds } from './sounds/drumSounds';

const BehringerRd6 = () => {
  const audioContextRef = useRef(null);
  const drumSoundsRef = useRef(null);
  const masterGainRef = useRef(null);

  // Initialize audio context and drum sounds
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    masterGainRef.current.gain.value = 0.7;

    drumSoundsRef.current = createDrumSounds(audioContextRef.current);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleStepTrigger = (channel, stepIndex) => {
    if (!drumSoundsRef.current || !audioContextRef.current) return;

    const now = audioContextRef.current.currentTime;
    let soundNode;

    switch (channel) {
      case 'bassDrum':
        soundNode = drumSoundsRef.current.createBassDrum(now);
        break;
      case 'snareDrum':
        soundNode = drumSoundsRef.current.createSnareDrum(now);
        break;
      case 'lowTom':
        soundNode = drumSoundsRef.current.createLowTom(now);
        break;
      case 'highTom':
        soundNode = drumSoundsRef.current.createHighTom(now);
        break;
      case 'cymbal':
        soundNode = drumSoundsRef.current.createCymbal(now);
        break;
      case 'clap':
        soundNode = drumSoundsRef.current.createClap(now);
        break;
      case 'hiHat':
        soundNode = drumSoundsRef.current.createHiHat(now);
        break;
      default:
        return;
    }

    if (soundNode) {
      soundNode.connect(masterGainRef.current);
    }
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
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="BASS DRUM" 
            value={0.5} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="SNARE DRUM" 
            value={0.5} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="L.H. TOM" 
            value={0.5} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="CYMBAL/CLAP" 
            value={0.5} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Knob 
            label="O.C. HI HAT" 
            value={0.5} 
            onChange={(v) => {}}
            steps={10}
            color="#FFD600"
          />
          <Jack label="IN" />
          <Jack label="OUT" />
          <Knob 
            label="DISTORTION" 
            value={0.5} 
            onChange={(v) => {}}
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
              value={120} 
              onChange={(v) => {}}
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
              label="" 
              value={0.5} 
              onChange={(v) => {}}
              steps={10}
              color="#FFD600"
            />
          </DistortionFrame>
          <VolumeFrame>
            <Knob 
              label="" 
              value={0.7} 
              onChange={(v) => {}}
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
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className="rd6-start-stop-group">
              <div className="rd6-group-label">START/STOP</div>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="START/STOP" 
                  onClick={() => {}}
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
                  onClick={() => {}}
                />
              </div>
            </div>
          </MeasureFrame>

          {/* Third column - Measure visualization and sequencer */}
          <div className="rd6-sequencer-column">
            <div className="rd6-measure-visualization">
              <MeasureVisualization currentStep={0} />
            </div>
            <StepSequencer onStepTrigger={handleStepTrigger} />
          </div>

          {/* Fourth column - Pattern and write controls */}
          <div className="rd6-pattern-column">
            <PatternFrame>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="PATTERN" 
                  onClick={() => {}}
                />
              </div>
            </PatternFrame>
            <WriteFrame>
              <div className="rd6-group-buttons">
                <FunctionButton 
                  label="WRITE/NEXT" 
                  onClick={() => {}}
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