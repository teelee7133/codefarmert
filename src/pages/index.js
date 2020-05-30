import React from 'react';
import { Link } from 'gatsby';

import { IndexLayout } from '../components/layout';
import SEO from '../components/seo';
import indexStyle from '../components/css/index.module.css';


const Index = () => {

  return (
    <IndexLayout>
      <SEO title='All posts' />
      <div className={indexStyle.bannerContainer}>
        <div className={indexStyle.banner}></div>
      </div>
      <div className={indexStyle.linkBlockContainer}>
        <div className={indexStyle.linkBlock}>
          <Link to="/blogs">Blog</Link>
        </div>
        <div className={indexStyle.linkBlock}>
          <Link to="/tuner">Tuner</Link>
        </div>

        <div className={indexStyle.linkBlock}>
          <Link to="/about">About</Link>
        </div>
      </div>

    </IndexLayout>
  );
};

export default Index;

