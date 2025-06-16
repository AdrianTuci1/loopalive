import React, { useEffect, useState } from 'react';
import { StateManager } from '@elektrond';
import './Monitor.css';

const Monitor = () => {
    const initialState = {
        ui: {
            currentPage: 'sequencer',
            activeTrack: 0,
            editMode: 'normal',
            cursorPosition: { x: 0, y: 0 }
        },
        sequencer: {
            isPlaying: false,
            tempo: 120,
            currentPattern: 0,
            currentStep: 0,
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
        tracks: Array(8).fill(null).map(() => ({
            volume: 0.8,
            pan: 0,
            pitch: 0,
            startPoint: 0,
            endPoint: 1,
            filterCutoff: 0.5,
            filterResonance: 0,
            filterType: 'lowpass',
            ampAttack: 0,
            ampDecay: 0.5,
            ampHold: 0,
            ampRelease: 0.5,
            lfo: {
                waveform: 'sine',
                speed: 0.5,
                depth: 0.5,
                target: 'filter'
            }
        })),
        effects: {
            reverb: {
                time: 0.5,
                mix: 0.3
            },
            delay: {
                time: 0.5,
                mix: 0.3
            }
        }
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        const unsubscribe = StateManager.subscribe(newState => {
            setState(prevState => ({
                ...prevState,
                ...newState
            }));
        });

        return () => unsubscribe();
    }, []);

    const { ui, sequencer, tracks } = state;
    const { currentPage, activeTrack, editMode } = ui;
    const { isPlaying, tempo, currentPattern, currentStep } = sequencer;
    const activeTrackData = tracks[activeTrack];

    const renderSequencerPage = () => (
        <div className="monitor-content">
            <div className="monitor-header">
                <span>TRK {activeTrack + 1}</span>
                <span>PAT {currentPattern + 1}</span>
                <span>{isPlaying ? 'PLAY' : 'STOP'}</span>
            </div>
            <div className="monitor-grid">
                {Array(16).fill().map((_, i) => {
                    const step = sequencer.patterns[currentPattern][i];
                    const isActive = step?.tracks[activeTrack]?.active;
                    const isCurrentStep = i === currentStep;
                    return (
                        <div 
                            key={i} 
                            className={`grid-step ${i === ui.cursorPosition.x ? 'cursor' : ''} ${isActive ? 'active' : ''} ${isCurrentStep ? 'playing' : ''}`}
                        >
                            {isActive ? 'X' : '-'}
                        </div>
                    );
                })}
            </div>
            <div className="monitor-footer">
                <span>BPM: {tempo}</span>
                <span>{editMode.toUpperCase()}</span>
            </div>
        </div>
    );

    const renderSamplePage = () => (
        <div className="monitor-content">
            <div className="monitor-header">
                <span>SAMPLE</span>
                <span>TRK {activeTrack + 1}</span>
            </div>
            <div className="monitor-parameters">
                <div className="parameter-row">
                    <span>VOL</span>
                    <span>{Math.round(activeTrackData.volume * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>PAN</span>
                    <span>{Math.round(activeTrackData.pan * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>PITCH</span>
                    <span>{Math.round(activeTrackData.pitch * 24 - 12)}st</span>
                </div>
                <div className="parameter-row">
                    <span>START</span>
                    <span>{Math.round(activeTrackData.startPoint * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>END</span>
                    <span>{Math.round(activeTrackData.endPoint * 100)}%</span>
                </div>
            </div>
        </div>
    );

    const renderFilterPage = () => (
        <div className="monitor-content">
            <div className="monitor-header">
                <span>FILTER</span>
                <span>TRK {activeTrack + 1}</span>
            </div>
            <div className="monitor-parameters">
                <div className="parameter-row">
                    <span>CUTOFF</span>
                    <span>{Math.round(activeTrackData.filterCutoff * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>RES</span>
                    <span>{Math.round(activeTrackData.filterResonance * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>TYPE</span>
                    <span>{activeTrackData.filterType.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );

    const renderAmpPage = () => (
        <div className="monitor-content">
            <div className="monitor-header">
                <span>AMP</span>
                <span>TRK {activeTrack + 1}</span>
            </div>
            <div className="monitor-parameters">
                <div className="parameter-row">
                    <span>ATT</span>
                    <span>{Math.round(activeTrackData.ampAttack * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>DEC</span>
                    <span>{Math.round(activeTrackData.ampDecay * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>HOLD</span>
                    <span>{Math.round(activeTrackData.ampHold * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>REL</span>
                    <span>{Math.round(activeTrackData.ampRelease * 100)}%</span>
                </div>
            </div>
        </div>
    );

    const renderLFOPage = () => (
        <div className="monitor-content">
            <div className="monitor-header">
                <span>LFO</span>
                <span>TRK {activeTrack + 1}</span>
            </div>
            <div className="monitor-parameters">
                <div className="parameter-row">
                    <span>WAVE</span>
                    <span>{activeTrackData.lfo.waveform.toUpperCase()}</span>
                </div>
                <div className="parameter-row">
                    <span>SPEED</span>
                    <span>{Math.round(activeTrackData.lfo.speed * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>DEPTH</span>
                    <span>{Math.round(activeTrackData.lfo.depth * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>TARGET</span>
                    <span>{activeTrackData.lfo.target.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );

    const renderEffectsPage = () => (
        <div className="monitor-content">
            <div className="monitor-header">
                <span>EFFECTS</span>
                <span>MASTER</span>
            </div>
            <div className="monitor-parameters">
                <div className="parameter-row">
                    <span>REV TIME</span>
                    <span>{Math.round(state.effects.reverb.time * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>REV MIX</span>
                    <span>{Math.round(state.effects.reverb.mix * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>DLY TIME</span>
                    <span>{Math.round(state.effects.delay.time * 100)}%</span>
                </div>
                <div className="parameter-row">
                    <span>DLY MIX</span>
                    <span>{Math.round(state.effects.delay.mix * 100)}%</span>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (currentPage) {
            case 'sequencer':
                return renderSequencerPage();
            case 'sample':
                return renderSamplePage();
            case 'filter':
                return renderFilterPage();
            case 'amp':
                return renderAmpPage();
            case 'lfo':
                return renderLFOPage();
            case 'effects':
                return renderEffectsPage();
            default:
                return renderSequencerPage();
        }
    };

    return (
        <div className="monitor">
            <div className="monitor-frame">
                <div className="monitor-display">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Monitor;