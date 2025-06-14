// Sound synthesis logic for Behringer RD-6
export const createDrumSounds = (ctx) => {
  const createBassDrum = (now) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.Q.setValueAtTime(1, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gainNode);

    osc.start(now);
    osc.stop(now + 0.3);

    return gainNode;
  };

  const createSnareDrum = (now) => {
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;
    noiseGain.gain.setValueAtTime(1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, now);
    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.setValueAtTime(1, now);

    noise.connect(noiseGain);
    noiseGain.connect(filter);
    osc.connect(oscGain);
    oscGain.connect(filter);

    noise.start(now);
    osc.start(now);
    noise.stop(now + 0.2);
    osc.stop(now + 0.2);

    return filter;
  };

  const createLowTom = (now) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    filter.Q.setValueAtTime(1, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter);
    filter.connect(gainNode);

    osc.start(now);
    osc.stop(now + 0.4);

    return gainNode;
  };

  const createHighTom = (now) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.Q.setValueAtTime(1, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(filter);
    filter.connect(gainNode);

    osc.start(now);
    osc.stop(now + 0.3);

    return gainNode;
  };

  const createCymbal = (now) => {
    const noise = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;
    gainNode.gain.setValueAtTime(1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5000, now);
    filter.Q.setValueAtTime(1, now);

    noise.connect(gainNode);
    gainNode.connect(filter);

    noise.start(now);
    noise.stop(now + 0.5);

    return filter;
  };

  const createClap = (now) => {
    const noise = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;
    gainNode.gain.setValueAtTime(1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.setValueAtTime(2, now);

    noise.connect(gainNode);
    gainNode.connect(filter);

    noise.start(now);
    noise.stop(now + 0.3);

    return filter;
  };

  const createHiHat = (now) => {
    const noise = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;
    gainNode.gain.setValueAtTime(1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, now);
    filter.Q.setValueAtTime(1, now);

    noise.connect(gainNode);
    gainNode.connect(filter);

    noise.start(now);
    noise.stop(now + 0.1);

    return filter;
  };

  return {
    createBassDrum,
    createSnareDrum,
    createLowTom,
    createHighTom,
    createCymbal,
    createClap,
    createHiHat
  };
};

// Add default export
export default createDrumSounds; 