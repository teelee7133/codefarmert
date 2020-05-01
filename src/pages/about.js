import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import SEO from '../components/seo';


const About = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <SEO title="About" />
      <div></div>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;