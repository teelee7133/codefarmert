import React from 'react';
import { Link, graphql } from 'gatsby';

import { Layout } from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import markdownStyle from '../components/css/markdown.module.css';
import 'katex/dist/katex.min.css';


const MarkdownTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className={markdownStyle.container}>
        <header style={{ marginTop: rhythm(1), marginBottom: rhythm(1) }}>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.date ?
            <p style={{...scale(-1 / 5)}}>
              {post.frontmatter.date}
            </p> : null
          }
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{marginBottom: rhythm(1)}}/>
      </article>
      <nav className={markdownStyle.nav}>
        <ul
          className={markdownStyle.navList}
          style={{...scale(-2 / 5)}}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default MarkdownTemplate;

export const pageQuery = graphql`
  query MarkdownBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
