import React, { useEffect, useRef, useState } from 'react';
import { useStepSequencer } from './StepSequencerState';
import './StepSequencer.css';

const StepSequencer = ({ onStepTrigger }) => {
  const {
    steps,
    activeLEDs,
    selectedTrack,
    setSelectedTrack,
    toggleStep,
    getActiveChannels,
    setActiveLED
  } = useStepSequencer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const animationFrameRef = useRef();
  const lastStepTimeRef = useRef(0);
  const stepDurationRef = useRef(125); // 120 BPM = 500ms per step

  const handleStepClick = (stepIndex) => {
    const activeChannels = getActiveChannels();
    activeChannels.forEach(channel => {
      toggleStep(channel, stepIndex);
    });
  };

  const handleTrackSelect = (trackIndex) => {
    setSelectedTrack(trackIndex);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      lastStepTimeRef.current = performance.now();
      setCurrentStep(0);
    }
  };

  const updatePlayback = (timestamp) => {
    if (!isPlaying) return;

    const elapsed = timestamp - lastStepTimeRef.current;
    if (elapsed >= stepDurationRef.current) {
      const newStep = (currentStep + 1) % 16;
      setCurrentStep(newStep);
      lastStepTimeRef.current = timestamp;

      // Update active LEDs and trigger steps
      Object.entries(steps).forEach(([channel, channelSteps]) => {
        if (channelSteps[newStep]) {
          setActiveLED(channel, newStep);
          onStepTrigger(channel, newStep);
        } else {
          setActiveLED(channel, -1);
        }
      });
    }

    animationFrameRef.current = requestAnimationFrame(updatePlayback);
  };

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updatePlayback);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentStep]);

  return (
    <div className="step-sequencer">
      <div className="track-selector">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((track) => (
          <button
            key={track}
            className={`track-button ${selectedTrack === track ? 'selected' : ''}`}
            onClick={() => handleTrackSelect(track)}
          >
            {track}
          </button>
        ))}
      </div>
      <div className="step-grid">
        {Array.from({ length: 16 }).map((_, stepIndex) => (
          <div key={stepIndex} className="step-column">
            <div className="led-slot">
              {getActiveChannels().map((channel) => (
                <div
                  key={channel}
                  className={`led-button ${
                    activeLEDs[channel] === stepIndex ? 'active' : ''
                  }`}
                />
              ))}
            </div>
            <button
              className={`step-button ${
                getActiveChannels().some(channel => steps[channel][stepIndex]) ? 'active' : ''
              } ${currentStep === stepIndex ? 'current' : ''}`}
              onClick={() => handleStepClick(stepIndex)}
            />
          </div>
        ))}
      </div>
      <button
        className={`play-button ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlayback}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default StepSequencer; 