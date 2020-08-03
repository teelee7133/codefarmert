import React, { useState, useEffect, useRef } from 'react';

import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { WebTuner, summarize } from '../utils/webtuner';
import tunerStyles from '../components/css/tuner.module.css';

const Note = ({ note }) => (
  <div className={tunerStyles.note}>
    <div className={tunerStyles.noteName}>{note.noteName}</div>
    <div className={tunerStyles.noteResidue}>
      {note.weightedResidue.toFixed(2)}
    </div>
  </div>
);

const Tuner = () => {
  const [active, setActive] = useState(0);
  const [notes, setNotes] = useState([]);
  const webtunerRef = useRef({});

  const init = async () => {
    const webtuner = new WebTuner();
    await webtuner.init();
    webtunerRef.current = { webtuner };
  };

  const close = async () => {
    await webtunerRef.current.webtuner.close();
    webtunerRef.current.webtuner = null;
  };

  const update = () => {
    const webtuner = webtunerRef.current.webtuner;

    if (!(active && webtuner)) {
      return;
    }
    try {
      const mynotes = summarize(webtuner.detectNotes());
      setNotes(mynotes);
      window.requestAnimationFrame(update);
    } catch (e) {
      setActive(0);
    }
  };

  useEffect(() => {
    if (active && !webtunerRef.current.webtuner) {
      (async () => {
        try {
          await init();
          update();
        } catch (e) {
          setActive(0);
        }
      })();
    }
    if (!active && webtunerRef.current.webtuner) {
      close();
    }
    return () => {};
  }, [active]);

  return (
    <>
      <div className={tunerStyles.introduction}>
        This app analyses and detects music notes being played. One intended use
        is instrument tuning. Hope it helps!
      </div>
      <div className={tunerStyles.outer}>
        <div
          className={
            active ? tunerStyles.displayArea : tunerStyles.displayAreaInactive
          }
        >
          {active ? (
            notes.map((note, idx) => <Note key={idx} note={note} />)
          ) : (
            <div className={tunerStyles.inviteMessage}>
              <p>
                Click <b>Start</b> to Detect!
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setActive(active => !active)}
          className={tunerStyles.activateButton}
        >
          {active ? 'Stop' : 'Start'}
        </button>
      </div>
    </>
  );
};

const TunerPage = () => {
  return (
    <Layout>
      <SEO title="Tuner" />
      <div>
        <Tuner />
      </div>
    </Layout>
  );
};

export default TunerPage;
