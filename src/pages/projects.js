import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import SEO from '../components/seo';


const Projects = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <SEO title="Work and Fun" />
      <div>tbd</div>
    </Layout>
  );
};

export default Projects;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;