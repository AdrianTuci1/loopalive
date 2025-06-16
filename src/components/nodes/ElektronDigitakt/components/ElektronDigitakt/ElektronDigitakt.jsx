import React, { useState, useEffect } from 'react';
import './ElektronDigitakt.css';
import { Monitor } from '@elektrond';
import { Knob, Button } from '../common';
import { StateManager, AudioService, ButtonHandler } from '@elektrond';

import { TiMediaStopOutline } from "react-icons/ti";
import { FaRegCircle } from "react-icons/fa";
import { CiPlay1, CiSettings } from "react-icons/ci";
import { PiPlaylistDuotone, PiWaveform } from "react-icons/pi";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlinePiano } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const ElektronDigitakt = () => {
  const initialState = {
    sequencer: {
      currentPattern: 0,
      patterns: Array(16).fill(null).map(() => 
        Array(16).fill(null).map(() => ({
          tracks: Array(8).fill(null).map(() => ({
            active: false,
            note: 'C4',
            velocity: 100,
            length: 1
          }))
        }))
      )
    },
    ui: {
      activeTrack: 0
    }
  };

  const [state, setState] = useState(initialState);
  const [mainLevels, setMainLevels] = useState([0.5, 0.5]);
  const [knobValues, setKnobValues] = useState(Array(8).fill(0.5));

  useEffect(() => {
    const unsubscribe = StateManager.subscribe(newState => {
      setState(prevState => ({
        ...prevState,
        ...newState
      }));
    });

    // Initialize audio service
    const audioService = AudioService.getInstance();
    
    // Start audio context on user interaction
    const startAudio = async () => {
      try {
        await Tone.start();
        console.log('Audio context started');
      } catch (error) {
        console.error('Failed to start audio context:', error);
      }
    };

    // Add click event listener to start audio
    document.addEventListener('click', startAudio, { once: true });

    // Wait for samplers to load
    audioService.loadSamples().catch(error => {
      console.error('Failed to load samples:', error);
    });

    return () => {
      document.removeEventListener('click', startAudio);
      unsubscribe();
    };
  }, []);

  const handleMainLevelChange = (index, value) => {
    ButtonHandler.handleMainLevelChange(index, value);
  };

  const handleKnobChange = (index, value) => {
    ButtonHandler.handleParameterKnob(index, value);
  };

  const handleSequencerButton = (index) => {
    ButtonHandler.handleSequencerButton(index);
  };

  const handleFunctionButton = (label) => {
    ButtonHandler.handleFunctionButton(label);
  };

  const mainControls = [
    { 
      type: 'knob', 
      label: 'Level', 
      value: mainLevels[0], 
      onChange: (value) => handleMainLevelChange(0, value), 
      size: 50,
      command: 'Controls main output level'
    },
    { 
      type: 'knob', 
      label: 'Pan', 
      value: mainLevels[1], 
      onChange: (value) => handleMainLevelChange(1, value), 
      size: 50,
      command: 'Controls stereo panning'
    }
  ];

  const parameterKnobs = Array.from({ length: 8 }).map((_, index) => ({
    type: 'knob',
    label: String.fromCharCode(65 + index),
    value: knobValues[index],
    onChange: (value) => handleKnobChange(index, value),
    size: 40,
    command: 'Controls track parameters (filter, amp, LFO, etc.)'
  }));

  const functionButtons = [
    { label: 'Func', icon: 'Func', onClick: () => handleFunctionButton('Func'), command: 'Accesses function menu' },
    { label: 'KB', icon: <MdOutlinePiano />, onClick: () => handleFunctionButton('KB'), command: 'Keyboard mode' },
    { label: 'Mute', icon: 'Mute', onClick: () => handleFunctionButton('Mute'), command: 'Mutes selected track' },
    { label: 'Bank', icon: 'Ptn', onClick: () => handleFunctionButton('Bank'), command: 'Pattern bank selection' },
    { label: 'Song Edit', icon: 'Song', onClick: () => handleFunctionButton('Song Edit'), command: 'Song mode editing' },
    { label: 'Quantize', icon: 'TRIG', onClick: () => handleFunctionButton('Quantize'), command: 'Quantize timing' },
    { label: 'Machine', icon: 'SRC', onClick: () => handleFunctionButton('Machine'), command: 'Sample source selection' },
    { label: 'Setup', icon: 'FLTR', onClick: () => handleFunctionButton('Setup'), command: 'Filter setup' },
    { label: 'Sequence', icon: 'AMP', onClick: () => handleFunctionButton('Sequence'), command: 'Amp envelope' },
    { label: 'Send FX', icon: 'FX', onClick: () => handleFunctionButton('Send FX'), command: 'Send effects' },
    { label: 'Mixer', icon: 'MOD', onClick: () => handleFunctionButton('Mixer'), command: 'Mixer settings' },
    { label: 'Save', icon: 'Yes', onClick: () => handleFunctionButton('Save'), command: 'Save current state' },
    { label: 'Reload', icon: 'No', onClick: () => handleFunctionButton('Reload'), command: 'Reload last saved state' },
    { label: 'Left', icon: <IoIosArrowBack />, onClick: () => handleFunctionButton('Left'), command: 'Navigate left' },
    { label: 'Right', icon: <IoIosArrowForward />, onClick: () => handleFunctionButton('Right'), command: 'Navigate right' },
    { label: 'Up', icon: <IoIosArrowUp />, onClick: () => handleFunctionButton('Up'), command: 'Navigate up' },
    { label: 'Down', icon: <IoIosArrowDown />, onClick: () => handleFunctionButton('Down'), command: 'Navigate down' }
  ];

  const stepButtons = [
    { 
      type: 'button', 
      label: 'Perform', 
      icon: <PiPlaylistDuotone />, 
      size: 'small-square',
      onClick: () => handleFunctionButton('Perform'),
      command: 'Performance mode'
    },
    { 
      type: 'button', 
      label: 'Save Proj', 
      icon: <CiSettings />, 
      size: 'small-square',
      onClick: () => handleFunctionButton('Save Proj'),
      command: 'Save project'
    },
    { 
      type: 'button', 
      label: 'Samples', 
      icon: <PiWaveform />, 
      size: 'small-square',
      onClick: () => handleFunctionButton('Samples'),
      command: 'Sample management'
    },
    { 
      type: 'button', 
      label: 'Tap Tempo', 
      icon: <IoHourglassOutline />, 
      size: 'small-square',
      onClick: () => handleFunctionButton('Tap Tempo'),
      command: 'Set tempo by tapping'
    }
  ];

  const wideButtons = [
    { 
      type: 'button', 
      label: 'Copy', 
      icon: <FaRegCircle />, 
      size: 'wide',
      onClick: () => handleFunctionButton('Copy'),
      command: 'Copy pattern'
    },
    { 
      type: 'button', 
      label: 'Clear', 
      icon: <CiPlay1/>, 
      size: 'wide',
      onClick: () => handleFunctionButton('Clear'),
      command: 'Clear pattern'
    },
    { 
      type: 'button', 
      label: 'Paste', 
      icon: <TiMediaStopOutline />, 
      size: 'wide',
      onClick: () => handleFunctionButton('Paste'),
      command: 'Paste pattern'
    }
  ];

  const sequencerButtons = Array.from({ length: 16 }).map((_, index) => ({
    icon: `${index + 1}`,
    label: ``,
    size: 'large-square',
    onClick: () => handleSequencerButton(index),
    command: 'Toggle step in sequencer',
    active: state.sequencer?.patterns[state.sequencer.currentPattern]?.[index]?.tracks[state.ui.activeTrack]?.active
  }));

  return (
    <div className="node elektron-digitakt-node">
      <div className="ed-first-row">
        <div className="ed-main-level">
          {mainControls.map((control, index) => (
            <Knob 
              key={index}
              label={control.label}
              value={control.value}
              onChange={control.onChange}
              size={control.size}
            />
          ))}
        </div>
        <div className="ed-monitor">
          <Monitor />
        </div>
        <div className="ed-knobs">
          {parameterKnobs.map((knob, index) => (
            <div className="ed-4x2-column" key={index}>
              <Knob 
                label={knob.label}
                value={knob.value}
                onChange={knob.onChange}
                size={knob.size}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="ed-second-row">
        <div className="ed-first-column">
          {functionButtons.slice(0, 5).map((button, index) => (
            <div className="ed-button" key={index}>
              <Button 
                label={button.label}
                icon={button.icon}
                size="wide"
              />
            </div>
          ))}
        </div>

        <div className="ed-second-column">
          <div className="ed-2x-column">
            <div className="ed-first-group">
              <div className="outline-rows">
                <div className="ed-4x-small-buttons">
                  {stepButtons.map((button, index) => (
                    <Button 
                      key={index}
                      label={button.label}
                      icon={button.icon}
                      size={button.size}
                    />
                  ))}
                </div>
                <div className="ed-3x-wide-buttons">
                  {wideButtons.map((button, index) => (
                    <Button 
                      key={index}
                      label={button.label}
                      icon={button.icon}
                      size={button.size}
                    />
                  ))}
                </div>
              </div>
              <div className="ed-second-group">
                <div className="functions-row">
                  {functionButtons.slice(5, 11).map((button, index) => (
                    <Button 
                      key={index}
                      label={button.label}
                      icon={button.icon}
                      size="small-square"
                    />
                  ))}
                </div>
                <div className="second-function-row">
                  <div className="yes-no-column">
                    {functionButtons.slice(11, 13).map((button, index) => (
                      <Button 
                        key={index}
                        label={button.label}
                        icon={button.icon}
                        size="small-square"
                      />
                    ))}
                  </div>
                  <div className="arrow-column">
                    {functionButtons.slice(13, 17).map((button, index) => (
                      <div key={index} className={`arrow-button ${button.label.toLowerCase()}`}>
                        <Button 
                          label={button.label}
                          icon={button.icon}
                          size="small-square"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="light-page-column">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ed-sequencer-column">
            {sequencerButtons.map((button, index) => (
              <Button 
                key={index}
                label={button.label}
                icon={button.icon}
                size={button.size}
                onClick={button.onClick}
                active={button.active}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElektronDigitakt; 