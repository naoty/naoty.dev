const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
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

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query");
    return;
  }

  const postTemplate = path.resolve("./src/templates/posts/_id.js");
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const id = path.basename(node.fileAbsolutePath, ".md");
    createPage({
      path: `/posts/${id}.html`,
      component: postTemplate,
      context: node
    });
  });
};
