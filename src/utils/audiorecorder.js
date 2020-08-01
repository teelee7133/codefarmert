export const recordAudio = async (onstop, onerror) => {
  let stream;
  let mediaRecorder;

  const close = () => {
    try {
      stream &&
        stream.getTracks().forEach(track => {
          try {
            track.stop();
          } finally {
            // eslint-disable-next-line no-empty
          }
        });
    } finally {
      // eslint-disable-next-line no-empty
    }

    try {
      mediaRecorder &&
        mediaRecorder.state != 'inactive' &&
        mediaRecorder.stop();
    } finally {
      // eslint-disable-next-line no-empty
    }
  };

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onerror = () => {
      console.log('onerror');
      onerror();
    };
    mediaRecorder.onstop = () => {
      try {
        console.log('waitForStop onstop 1');
        const blob = new Blob(chucks, { type: mediaRecorder.mimeType });
        chucks = [];
        const audioURL = window.URL.createObjectURL(blob);

        onstop(audioURL);
      } catch (e) {
        console.log(e);
        onerror(e);
      } finally {
        close();
      }
    };

    let chucks = [];

    mediaRecorder.ondataavailable = ev => {
      chucks.push(ev.data);
    };

    mediaRecorder.start();

    const stop = () => {
      mediaRecorder.stop();
    };

    return stop;
  } catch (e) {
    close();
    onerror(e);
  }
};
