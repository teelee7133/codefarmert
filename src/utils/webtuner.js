
const signalFilter = (signal, weights, {output=null}) => {

  const filtered = output || new Float64Array(signal.length - weights.length + 1);

  filtered.forEach((value, index, array) => {
    array[index] = signal
      .slice(index, index + weights.length)
      .reduce((accumulated, v, idx) => accumulated + v * weights[idx], 0);
  });
  return filtered;
};

const getMaximaIndices = (signal, {buffer=null}) => {
  const d1 = signalFilter(signal, [-0.5, 0, 0.5], {output: buffer});
  const maximas = [];
  d1.forEach((value, index, array) => {
    if (index <= 0 || index >= array.length) {return;}
    if (d1[index] > 0 && d1[index + 1] < 0) {
      maximas.push(
        Math.abs(d1[index]) < Math.abs(d1[index + 1])
          ? index
          : index + 1 );
    }
  });
  return maximas.map(x => x + 1);
};

const getNote = (freq)  => {
  const C4 = 261.626;
  const notes = [
    'C', 'C#', 'D', 'Eb', 'E', 'F',
    'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
  ];
  const transformed = Math.log(freq / C4)/Math.log(2)* 12 + 48;
  const semi = Math.round(transformed);
  const quotient = Math.floor(semi/12);
  const remainder = semi % 12;
  return {
    noteName: notes[remainder] ,
    semitone: semi,
    residue: transformed - semi,
    octave: quotient,
    noteValue: remainder,
  };

};

export class WebTuner {

  async init () {
    this.stream = await navigator.mediaDevices.getUserMedia({audio: true});
    this.audioCtx = new window.AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(this.stream);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.minDecibels = -70;
    this.source.connect(this.analyser);
    this.data = {};
    this.data.signal = new Uint8Array(this.analyser.frequencyBinCount);
    this.data.smoothed = new Float64Array(this.analyser.frequencyBinCount - 4);
    this.data.d1 = new Float64Array(this.analyser.frequencyBinCount - 6);
  }

  close () {
    this.audioCtx.close();
    this.stream.getTracks().forEach(track => track.stop());
  }

  async resume () {
    return await this.audioCtx.resume();
  }

  async suspense() {
    return await this.audioCtx.suspend();
  }

  getState () {
    return this.audioCtx.state;
  }

  detectNotes () {
    const C2 = 65;
    const interval = this.audioCtx.sampleRate/ 2 / this.analyser.fftSize;
    const signal = this.data.signal;
    const smoothed = this.data.smoothed;
    const d1 = this.data.d1;

    this.analyser.getByteFrequencyData(signal);
    signalFilter(
      signal,
      [0.1, 0.2, 0.4, 0.2, 0.1],
      {output: smoothed}
    );
    const maxSignal = Math.max(...signal);

    const maximaIndices = getMaximaIndices(smoothed, {buffer: d1}).map(x => x + 2);

    const detectedNotes = maximaIndices
      .map(x => Object.assign({x: x, freq: x * interval, decibel: signal[x]}, getNote(x * interval)))
      .filter(obj => obj.freq >= C2 && obj.decibel > maxSignal * 0.25)
      .sort((a, b) => b.decibel - a.decibel);

    return detectedNotes;
  }
}


export const summarize =  (detectedNotes) => {
  const grouped = detectedNotes.reduce((res, note) => {
    const noteName = note.noteName;
    res[noteName] = (res[noteName] ?? []);
    res[noteName].push(note);

    return res;
  }, {});
  const result = Object.entries(grouped).map(([key, value]) => {
    const maxDecibel = Math.max(...value.map(x => x.decibel));
    const weightedResidueSum = value.map(
      x => x.residue * Math.pow(10, ((x.decibel - maxDecibel)/10))
    ).reduce((r, x) => r + x, 0) ;
    const weightSum = value.map(
      x => Math.pow(10, (x.decibel - maxDecibel)/10)
    ).reduce((r, x) => r + x, 0);
    return {
      noteName: key,
      weightedResidue: (weightedResidueSum / weightSum),
      decibel: Math.log10(weightSum) * 10 + maxDecibel,
    };
  }).sort((a, b) => b.decibel - a.decibel);
  return result;
}
