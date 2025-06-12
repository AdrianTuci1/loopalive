import React, { useState } from 'react';
import './Toolbar.css';

const Toolbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [tempo, setTempo] = useState(120);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value);
    if (newTempo >= 40 && newTempo <= 240) {
      setTempo(newTempo);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button 
          className={`toolbar-button ${isPlaying ? 'active' : ''}`}
          onClick={handlePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button 
          className={`toolbar-button ${isRecording ? 'active' : ''}`}
          onClick={handleRecord}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          {isRecording ? '⏹' : '⏺'}
        </button>
      </div>
      
      <div className="toolbar-group">
        <label className="tempo-control">
          <span>Tempo: {tempo} BPM</span>
          <input
            type="range"
            min="40"
            max="240"
            value={tempo}
            onChange={handleTempoChange}
            className="tempo-slider"
          />
        </label>
      </div>
    </div>
  );
};

export default Toolbar; 