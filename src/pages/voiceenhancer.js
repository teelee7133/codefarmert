import React, { useState, useEffect, useRef } from 'react';
import { List } from 'immutable';

import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { recordAudio } from '../utils/audiorecorder';

const VoiceEnhancer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingURLs, setRecordingURLs] = useState(List());
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
      setRecordingURLs(recordingURLs => recordingURLs.push(url));
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

  return (
    <div>
      <button onClick={() => setIsRecording(isRecording => !isRecording)}>
        {' '}
        {isRecording ? 'Stop' : 'Start'}{' '}
      </button>
      {recordingURLs.map(url => (
        <div key={url}>
          <audio controls src={url} />
        </div>
      ))}
    </div>
  );
};

const VoiceEnhancerPage = () => {
  return (
    <Layout>
      <SEO title="Voice Enhancer" />
      <div>
        <VoiceEnhancer />
      </div>
    </Layout>
  );
};

export default VoiceEnhancerPage;
