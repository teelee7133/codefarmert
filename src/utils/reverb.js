export const reverb = (audioElement, gain) => {
  const audioCtx = new window.AudioContext();

  var source = audioCtx.createMediaElementSource(audioElement);
  var gainNode = audioCtx.createGain();
  var delayNode = audioCtx.createDelay();

  gainNode.gain.value = gain;
  delayNode.delayTime.value = 0.1;

  source.connect(gainNode);
  gainNode.connect(delayNode);
  delayNode.connect(audioCtx.destination);
  delayNode.connect(gainNode);
  source.connect(audioCtx.destination);
  const cancel = () => {
    source.disconnect();
    audioCtx.close();
  }
  return cancel;
};
