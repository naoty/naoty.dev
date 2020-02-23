import React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";

export default ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => (
  <Layout>
    <h1>Posts</h1>
    <ul>
      {edges.map(edge => (
        <li>
          <a href="#">{edge.node.frontmatter.title}</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(sort: { order: DESC, fields: fileAbsolutePath }) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
