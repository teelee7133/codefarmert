import React, { useState, useEffect, useRef } from 'react';


import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { WebTuner, summarize } from '../utils/webtuner';
import tunerStyles from '../components/css/tuner.module.css';



const Note = ({note}) => (
  <div className={tunerStyles.note}>
    <div className={tunerStyles.noteName} >
      {note.noteName}
    </div>
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
    webtunerRef.current = {webtuner};
  };

  const close = async () => {
    await webtunerRef.current.webtuner.close();
    webtunerRef.current.webtuner = null;
  };

  const update = () => {
    const webtuner = webtunerRef.current.webtuner;

    if (!(active && webtuner)) {return;}
    try {
      const mynotes = summarize(webtuner.detectNotes());
      setNotes(mynotes);
      window.requestAnimationFrame(update);
    } catch (e) {
      setActive(0);
      console.log(e);
    }
  };

  useEffect( () => {
    if (active && !webtunerRef.current.webtuner) {
      (async () => {
        try {
          await init();
          update();
        } catch (e) {
          setActive(0);
          console.log(e);
        }
      })();
    }
    if (!active && webtunerRef.current.webtuner) {
      close();
    }
    return () => {};
  }, [active]);


  return (
    <div className={tunerStyles.outer}>
      <div className={active? tunerStyles.displayArea : tunerStyles.displayAreaInactive}  >
        {notes.map((note, idx) => <Note key={idx} note={note} />)}
      </div>
      <button
        onClick={() => setActive(active => !active)}
        className={tunerStyles.activateButton}
      >
        {active ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};


const Index = () => {
  return (
    <Layout>
      <SEO title='Tuner' />
      <div>
        <Tuner />
      </div>
    </Layout>
  );
};

export default Index;
