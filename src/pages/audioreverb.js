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
import { reverb } from '../utils/reverb';
import reverbStyles from '../components/css/audioreverb.module.css';

const audioURLsState = atom({
  key: 'audioURLs',
  default: [],
});

const selectedAudioURLState = atom({
  key: 'selectedAudioURL',
  default: null,
});

const AudioItem = ({ url }) => {
  const [selectedAudioURL, setSelectedAudioURL] = useRecoilState(
    selectedAudioURLState
  );
  const setAudioURLs = useSetRecoilState(audioURLsState);

  const onChange = () => {
    setSelectedAudioURL(selectedAudioURL != url ? url : null);
  };
  const onDeleteButtonClick = () => {
    setAudioURLs(audioUrls => audioUrls.filter(x => x !== url));
  };

  return (
    <>
      <audio className={reverbStyles.recordingAudio} controls src={url} />

      <div key={`control-div-${url}`} className={reverbStyles.controlContainer}>
        <input
          type="radio"
          checked={selectedAudioURL == url}
          onChange={onChange}
          name="url_to_play"
        />
        <button
          type="button"
          className={reverbStyles.deleteButton}
          onClick={onDeleteButtonClick}
        >
          &#10006;
        </button>
      </div>
    </>
  );
};

const AudioItemList = () => {
  const audioURLs = useRecoilValue(audioURLsState);

  return (
    <>
      {audioURLs.map(url => (
        <AudioItem key={url} url={url} />
      ))}
    </>
  );
};

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const setaudioURLs = useSetRecoilState(audioURLsState);
  const selectedAudioURL = useSetRecoilState(selectedAudioURLState);

  const recorderStopperContainer = useRef({ stop: null });

  const reset = () => {
    setIsRecording(() => {
      recorderStopperContainer.current.stop = null;
      return false;
    });
  };

  const onerror = () => {
    reset();
  };

  const onstop = url => {
    if (url) {
      setaudioURLs(audioItems => {
        return [...audioItems, url];
      });
      selectedAudioURL(url);
    }
    reset();
  };

  const record = async () => {
    try {
      recorderStopperContainer.current.stop = await recordAudio(
        onstop,
        onerror
      );
    } catch (e) {
      reset();
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

  const recButtonOnClick = () => setIsRecording(isRecording => !isRecording);

  return (
    <button className={reverbStyles.recordButton} onClick={recButtonOnClick}>
      {' '}
      {isRecording ? 'Stop' : 'Record'}{' '}
    </button>
  );
};

const ReverbAudio = () => {
  const selectedAudioURL = useRecoilValue(selectedAudioURLState);
  const cancelReverb = useRef(null);
  const audioRef = useRef(null);
  const [gain, setGain] = useState(0.4);

  const stop = async () => {
    if (cancelReverb.current) {
      await cancelReverb.current();
      cancelReverb.current = null;
    }
  };
  const start = () => {
    if (selectedAudioURL) {
      cancelReverb.current = reverb(audioRef.current, gain);
    }
  };

  useEffect(() => {
    (async () => {
      await stop();
      start();
    })();
  }, [selectedAudioURL, gain]);

  const onChange = ev => {
    setGain(ev.target.value);
  };

  return selectedAudioURL ? (
    <>
      <audio
        className={reverbStyles.reverbAudio}
        controls
        ref={audioRef}
        src={selectedAudioURL}
      />
      <input
        className={reverbStyles.gainRangeInput}
        type="range"
        onChange={onChange}
        defaultValue={gain}
        min="0"
        max="0.8"
        step="0.1"
      />
    </>
  ) : null;
};

const ReverbAudioPage = () => {
  return (
    <Layout>
      <SEO title="Reverb Audio" />
      <RecoilRoot>
        <RecordAudio />
        <div className={reverbStyles.container}>
          <AudioItemList />
          <ReverbAudio />
        </div>
      </RecoilRoot>
    </Layout>
  );
};

export default ReverbAudioPage;
