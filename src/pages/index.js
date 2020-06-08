import React from 'react';
import { Link, graphql } from 'gatsby';

import { IndexLayout } from '../components/layout';
import SEO from '../components/seo';
import indexStyle from '../components/css/index.module.css';


const Index = ({ data }) => {
  const referrerRegex = data.site.siteMetadata.highlightedReferrerRegex;

  const showReferrer = (new RegExp(referrerRegex)).test(document.referrer);

  return (
    <IndexLayout>
      <SEO title='All posts' />
      {showReferrer
        ?(
          <div className={indexStyle.bannerContainer}>
            You are redirected from { document.referrer }
          </div>
        )
        :null}
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        highlightedReferrerRegex
      }
    }
  }
`;