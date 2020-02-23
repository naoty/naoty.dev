const path = require("path");

const createPostPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              time
              title
            }
            html
          }
        }
      }
    }
  `);

  const { createPage } = actions;
  const template = path.resolve("./src/templates/posts/_id.js");

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const id = path.basename(node.fileAbsolutePath, ".md");
    createPage({
      path: `/posts/${id}.html`,
      component: template,
      context: node
    });
  });
};

const createTaggedPostsPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `);

  const { createPage } = actions;
  const template = path.resolve("./src/templates/posts/_tag/index.js");

  result.data.allMarkdownRemark.group.forEach(({ tag }) => {
    createPage({
      path: `/posts/${tag}/`,
      component: template,
      context: { tag }
    });
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  try {
    await createPostPages({ graphql, actions });
    await createTaggedPostsPages({ graphql, actions });
  } catch (e) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${e}`);
  }
};
