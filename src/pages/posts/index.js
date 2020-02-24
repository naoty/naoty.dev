import React from "react";
import Layout from "../../components/layout";
import Tag from "../../components/tag";
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
        {(node.frontmatter.tags || []).map(tag => (
          <Tag key={tag} name={tag} />
        ))}
      </li>
    );
  });

  return (
    <Layout
      title="Naoto Kaneko's posts"
      description="Naoto Kaneko's all posts"
      path="/posts/"
    >
      <h1 className={styles.title}>Posts</h1>
      <ul>{links}</ul>
      <nav className={styles.navigation}>
        <Link to="/">Top</Link>
      </nav>
    </Layout>
  );
}

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___time }) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            tags
            title
          }
        }
      }
    }
  }
`;
