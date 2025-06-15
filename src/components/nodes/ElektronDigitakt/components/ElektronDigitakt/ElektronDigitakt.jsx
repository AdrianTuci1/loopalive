import React, { useState } from 'react';
import './ElektronDigitakt.css';
import Monitor from '../monitor/Monitor';
import Knob from '../common/Knob';
import Button from '../common/Button';

import { TiMediaStopOutline } from "react-icons/ti";
import { FaRegCircle } from "react-icons/fa";
import { CiPlay1, CiSettings } from "react-icons/ci";
import { PiPlaylistDuotone, PiWaveform } from "react-icons/pi";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlinePiano } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


const ElektronDigitakt = () => {
  const [mainLevels, setMainLevels] = useState([0.5, 0.5]);
  const [knobValues, setKnobValues] = useState(Array(8).fill(0.5));

  const handleMainLevelChange = (index, value) => {
    const newLevels = [...mainLevels];
    newLevels[index] = value;
    setMainLevels(newLevels);
  };

  const handleKnobChange = (index, value) => {
    const newValues = [...knobValues];
    newValues[index] = value;
    setKnobValues(newValues);
  };

  const mainControls = [
    { type: 'knob', label: 'Level', value: mainLevels[0], onChange: (value) => handleMainLevelChange(0, value), size: 50 },
    { type: 'knob', label: 'Pan', value: mainLevels[1], onChange: (value) => handleMainLevelChange(1, value), size: 50 }
  ];

  const parameterKnobs = Array.from({ length: 8 }).map((_, index) => ({
    type: 'knob',
    label: String.fromCharCode(65 + index),
    value: knobValues[index],
    onChange: (value) => handleKnobChange(index, value),
    size: 40
  }));

  const functionButtons = [
    { label: 'Func', icon: 'Func' },
    { label: 'KB', icon: <MdOutlinePiano /> },
    { label: 'Mute', icon: 'Mute' },
    { label: 'Bank', icon: 'Ptn' },
    { label: 'Song Edit', icon: 'Song' },
    { label: 'Quantize', icon: 'TRIG' },
    { label: 'Machine', icon: 'SRC' },
    { label: 'Setup', icon: 'FLTR' },
    { label: 'Sequence', icon: 'AMP' },
    { label: 'Send FX', icon: 'FX' },
    { label: 'Mixer', icon: 'MOD' },
    { label: 'Save', icon: 'Yes' },
    { label: 'Reload', icon: 'No' },
    { label: 'Left', icon: <IoIosArrowBack /> },
    { label: 'Right', icon: <IoIosArrowForward /> },
    { label: 'Up', icon: <IoIosArrowUp /> },
    { label: 'Down', icon: <IoIosArrowDown /> }
  ];

  const stepButtons = [
    { type: 'button', label: 'Perform', icon: <PiPlaylistDuotone />, size: 'small-square' },
    { type: 'button', label: 'Save Proj', icon: <CiSettings />, size: 'small-square' },
    { type: 'button', label: 'Samples', icon: <PiWaveform />, size: 'small-square' },
    { type: 'button', label: 'Tap Tempo', icon: <IoHourglassOutline />, size: 'small-square' }
  ];

  const wideButtons = [
    { type: 'button', label: 'Copy', icon: <FaRegCircle />, size: 'wide' },
    { type: 'button', label: 'Clear', icon: <CiPlay1/>, size: 'wide' },
    { type: 'button', label: 'Paste', icon: <TiMediaStopOutline />, size: 'wide' }
  ];

  const sequencerButtons = Array.from({ length: 16 }).map((_, index) => ({
    icon: `${index + 1}`,
    label: ``,
    size: 'large-square'
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElektronDigitakt; 