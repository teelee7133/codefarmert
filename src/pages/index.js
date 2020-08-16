import React from 'react';
import { Link } from 'gatsby';

import { IndexLayout } from '../components/layout';
import SEO from '../components/seo';
import indexStyle from '../components/css/index.module.css';

const Index = () => {
  return (
    <IndexLayout>
      <SEO title="Home" />
      <div className={indexStyle.bannerContainer}>
        <div className={indexStyle.banner}></div>
      </div>
      <div className={indexStyle.linkBlockContainer}>
        <Link className={indexStyle.linkBlock} to="/blogs">
          Blog
        </Link>
        <Link className={indexStyle.linkBlock} to="/tuner">
          Tuner
        </Link>
        <Link className={indexStyle.linkBlock} to="/audioreverb">
          Reverb
        </Link>
        <Link className={indexStyle.linkBlock} to="/about">
          About
        </Link>
      </div>
    </IndexLayout>
  );
};

export default Index;
