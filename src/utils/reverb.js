export class ReverbAudioGraph {
  constructor({ audioElement, gain }) {
    this._audioElement = audioElement;
    this._gain = gain;
  }

  init() {
    this._audioCtx = new window.AudioContext();
    this._source = this._audioCtx.createMediaElementSource(this._audioElement);
    this._gainNode = this._audioCtx.createGain();
    this._delayNode = this._audioCtx.createDelay();

    this._gainNode.gain.value = this._gain;
    this._delayNode.delayTime.value = 0.1;

    this._source.connect(this._gainNode);
    this._gainNode.connect(this._delayNode);
    this._delayNode.connect(this._audioCtx.destination);
    this._delayNode.connect(this._gainNode);
    this._source.connect(this._audioCtx.destination);
  }

  close() {
    try {
      this._audioCtx.close();
    } finally {
      // eslint-disable-next-line no-empty
    }
  }

  set gain(value) {
    this._gain = value;
    this._gainNode.gain.value = this._gain;
    console.log(this._gainNode.gain.value);
  }
}
