import React from "react";
import Layout from "../../components/layout";
import { graphql, Link } from "gatsby";
import styles from "./index.module.css";

export default function PostsPage({
  data: {
    allMarkdownRemark: { edges }
  }
}) {
  const links = edges.map(({ node }) => {
    const basename = node.fileAbsolutePath.split("/").pop();
    const id = basename.replace(".md", "");
    return (
      <li key={id}>
        <Link to={`/posts/${id}.html`}>{node.frontmatter.title}</Link>
      </li>
    );
  });

  return (
    <Layout>
      <h1 className={styles.title}>Posts</h1>
      <ul>{links}</ul>
    </Layout>
  );
}

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(sort: { order: DESC, fields: fileAbsolutePath }) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
