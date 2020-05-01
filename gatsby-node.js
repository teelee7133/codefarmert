const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const markDown = path.resolve(`./src/templates/markdown.js`);
  const resultPosts = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {frontmatter: {date: {ne: null}}}
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );


  if (resultPosts.errors) {
    throw resultPosts.errors;
  }

  // Create blog posts pages.
  const posts = resultPosts.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: markDown,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  const resultOthers = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {frontmatter: {date: {eq: null}}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );


  if (resultOthers.errors) {
    throw resultOthers.errors;
  }

  // Create blog posts pages.
  const pages = resultOthers.data.allMarkdownRemark.edges;

  pages.forEach((page) => {

    createPage({
      path: page.node.fields.slug,
      component: markDown,
      context: {
        slug: page.node.fields.slug,
      },
    });
  });

};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
