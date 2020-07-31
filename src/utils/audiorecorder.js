export const recordAudio = async () => {
  let stream;
  let mediaRecorder;

  const close = () => {
    try {
      stream &&
        stream.getTracks().forEach(track => {
          try {
            track.stop();
          } catch {
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
    let chucks = [];

    mediaRecorder.ondataavailable = ev => {
      chucks.push(ev.data);
    };

    mediaRecorder.start();

    const waitForStop = async () => {
      return new Promise((resolve, reject) => {
        mediaRecorder.onstop = () => {
          try {
            const blob = new Blob(chucks, { type: mediaRecorder.mimeType });
            chucks = [];
            const audioURL = window.URL.createObjectURL(blob);

            resolve(audioURL);
          } catch (e) {
            reject(e);
          }
        };
        mediaRecorder.stop();
      });
    };

    const stop = async () => {
      try {
        return await waitForStop();
      } finally {
        close();
      }
    };
    return stop;
  } catch (e) {
    close();
    throw e;
  }
};
