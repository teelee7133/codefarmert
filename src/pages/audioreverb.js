import React, { useState, useEffect, useRef } from 'react';
import {
  RecoilRoot,
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { recordAudio } from '../utils/audiorecorder';
import { ReverbAudioGraph } from '../utils/reverb';
import reverbStyles from '../components/css/audioreverb.module.css';

const audioURLsState = atom({
  key: 'audioURLs',
  default: [],
});

const errorMessagesState = atom({
  key: 'errorMessages',
  default: [],
});

const AudioItem = ({ url }) => {
  const setAudioURLs = useSetRecoilState(audioURLsState);
  const setErrorMessages = useSetRecoilState(errorMessagesState);
  const reverbAudioGraph = useRef(null);
  const audioRef = useRef(null);
  const [gain, setGain] = useState(0.4);

  const onDeleteButtonClick = () => {
    if (reverbAudioGraph.current) {
      reverbAudioGraph.current.close();
    }
    setAudioURLs(audioUrls => audioUrls.filter(x => x !== url));
  };

  useEffect(() => {
    if (audioRef.current && !reverbAudioGraph.current)
      (async () => {
        try {
          reverbAudioGraph.current = new ReverbAudioGraph({
            audioElement: audioRef.current,
            gain: gain,
          });
          await reverbAudioGraph.current.init();
        } catch {
          reverbAudioGraph.current = null;
          setErrorMessages(errorMessages => [
            ...errorMessages,
            'Problem encountered while generating audio.',
          ]);
        }
      })();
  }, [audioRef]);

  useEffect(() => {
    if (reverbAudioGraph.current) {
      reverbAudioGraph.current.gain = gain;
    }
  }, [gain]);

  return (
    <div className={reverbStyles.audioItemContainer}>
      <div key="audio" className={reverbStyles.recordingAudioContainer}>
        <audio
          ref={audioRef}
          className={reverbStyles.recordingAudio}
          controls
          src={url}
        />
        <button
          type="button"
          className={reverbStyles.deleteButton}
          onClick={onDeleteButtonClick}
        >
          &#10006;
        </button>
      </div>
      <div key="input" className={reverbStyles.gainInputContainer}>
        <label>Reverb: </label>
        <input
          type="range"
          onChange={ev => {
            setGain(ev.target.value);
          }}
          defaultValue={gain}
          min="0"
          max="0.8"
          step="0.05"
        />
      </div>
    </div>
  );
};

const AudioItemList = () => {
  const audioURLs = useRecoilValue(audioURLsState);

  return audioURLs.length > 0 ? (
    <>
      {audioURLs.map(url => (
        <AudioItem key={url} url={url} />
      ))}
    </>
  ) : (
    <div className={reverbStyles.emptyListMessage}>
      <p>
        Make a sound recording and hear some reverb/echo effects applied to it!
      </p>
    </div>
  );
};

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const setaudioURLs = useSetRecoilState(audioURLsState);
  const [errorMessages, setErrorMessages] = useRecoilState(errorMessagesState);

  const recorderStopperContainer = useRef({ stop: null });

  const reset = () => {
    setIsRecording(() => {
      recorderStopperContainer.current.stop = null;
      return false;
    });
  };

  const onerror = e => {
    reset();
    setErrorMessages(errorMessages => [
      ...errorMessages,
      'Problem encountered while recording.',
    ]);
  };

  const onstop = url => {
    if (url) {
      setaudioURLs(audioItems => {
        return [...audioItems, url];
      });
    }
    reset();
  };

  const record = async () => {
    setErrorMessages([]);
    try {
      recorderStopperContainer.current.stop = await recordAudio(
        onstop,
        onerror
      );
    } catch (e) {
      reset();
      setErrorMessages(errorMessages => [
        ...errorMessages,
        'Problem encountered while recording.',
      ]);
    }
  };

  const stop = () => {
    recorderStopperContainer.current.stop();
  };

  useEffect(() => {
    if (isRecording && !recorderStopperContainer.current.stop) {
      record();
    }
    if (!isRecording && recorderStopperContainer.current.stop) {
      stop();
    }
  }, [isRecording]);

  return (
    <>
      <button
        className={reverbStyles.recordButton}
        onClick={() => setIsRecording(isRecording => !isRecording)}
      >
        {' '}
        {isRecording ? 'Stop' : 'Record'}{' '}
      </button>
      <ul className={reverbStyles.errorMessages}>
        {errorMessages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    </>
  );
};

const ReverbAudioPage = () => {
  return (
    <Layout>
      <SEO title="Reverb Audio" />
      <RecoilRoot>
        <RecordAudio />
        <div className={reverbStyles.container}>
          <AudioItemList />
        </div>
      </RecoilRoot>
    </Layout>
  );
};

export default ReverbAudioPage;
