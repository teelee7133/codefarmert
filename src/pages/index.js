import React from 'react';
import { Link, graphql } from 'gatsby';

import { IndexLayout } from '../components/layout';
import SEO from '../components/seo';
import indexStyle from '../components/css/index.module.css';


const Index = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <IndexLayout title={siteTitle}>
      <SEO title='All posts' />
      <div className={indexStyle.bannerContainer}>
        <img src="/images/schrody.svg"/>
      </div>
      <div className={indexStyle.linkBlockContainer}>
        <div className={indexStyle.linkBlock}>
          <Link to="/projects">Work and Play</Link>
        </div>

        <div className={indexStyle.linkBlock}>
          <Link to="/blogs">Blog</Link>
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
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
