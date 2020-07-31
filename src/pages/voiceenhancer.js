import React, { useState, useEffect, useRef } from 'react';
import { List } from 'immutable';

import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { recordAudio } from '../utils/audiorecorder';

const VoiceEnhancer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingURLs, setRecordingURLs] = useState(List());
  const recorderStopperContainer = useRef({ stop: null });

  const record = async () => {
    try {
      recorderStopperContainer.current.stop = await recordAudio();
    } catch (e) {
      recorderStopperContainer.current.stop = null;
      setIsRecording(false);
    }
  };

  const stop = async () => {
    try {
      const url = await recorderStopperContainer.current.stop();
      if (url) {
        setRecordingURLs(recordingURLs => recordingURLs.push(url));
      }
    } finally {
      recorderStopperContainer.current.stop = null;
      setIsRecording(false);
    }
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
