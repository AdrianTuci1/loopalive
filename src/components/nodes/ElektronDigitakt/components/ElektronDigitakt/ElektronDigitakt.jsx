import React, { useState } from 'react';
import './ElektronDigitakt.css';
import Monitor from '../monitor/Monitor';
import Knob from '../common/Knob';
import Button from '../common/Button';

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

  const functionButtons = [
    { label: 'Func', icon: 'Func' },
    { label: 'KB', icon: 'KB' },
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
    { label: 'Left', icon: 'Left' },
    { label: 'Right', icon: 'Right' },
    { label: 'Up', icon: 'Up' },
    { label: 'Down', icon: 'Down' }
  ];

  return (
    <div className="node elektron-digitakt-node">
      <div className="ed-first-row">
        <div className="ed-main-level">
          <Knob 
            label="Level"
            value={mainLevels[0]}
            onChange={(value) => handleMainLevelChange(0, value)}
            size={50}
          />
          <Knob 
            label="Pan"
            value={mainLevels[1]}
            onChange={(value) => handleMainLevelChange(1, value)}
            size={50}
          />
        </div>
        <div className="ed-monitor">
          <Monitor />
        </div>
        <div className="ed-knobs">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="ed-4x2-column" key={index}>
              <Knob 
                label={`Param ${index + 1}`}
                value={knobValues[index]}
                onChange={(value) => handleKnobChange(index, value)}
                size={40}
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
              {/* 4xsmall buttons, 3xwide buttons - 2 columns */}
              <div className="ed-4x-small-buttons">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Button 
                    key={index}
                    label={`Step ${index + 1}`}
                    size="small-square"
                    />
                ))}
              </div>
              <div className="ed-3x-wide-buttons">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Button 
                    key={index}
                    label={`Step ${index + 1}`}
                    size="wide"
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
            {Array.from({ length: 16 }).map((_, index) => (
              <Button 
                key={index}
                label={`${index + 1}`}
                size="large-square"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElektronDigitakt; 