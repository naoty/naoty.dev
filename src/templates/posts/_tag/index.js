import React from "react";
import Layout from "../../../components/layout";
import Tag from "../../../components/tag";
import { graphql, Link } from "gatsby";
import styles from "./index.module.css";

export default function TaggedPostsPage({
  pageContext,
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
      title={`Naoto Kaneko's posts #${pageContext.tag}`}
      description={`Naoto Kaneko's posts tagged with #${pageContext.tag}`}
      path={`/posts/${pageContext.tag}/`}
    >
      <h1 className={styles.title}>#{pageContext.tag}</h1>
      <ul>{links}</ul>
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Top</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/posts/">Posts</Link>
          </li>
        </ul>
      </nav>
    </Layout>
  );
}

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___time] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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
