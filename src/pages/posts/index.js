import React from "react";
import Layout from "../../components/layout";
import Tag from "../../components/tag";
import { graphql, Link } from "gatsby";
import styles from "./index.module.css";
import dayjs from "dayjs";

export default function PostsPage({
  data: {
    allMarkdownRemark: { edges }
  }
}) {
  const nodesByYear = {};
  edges.forEach(({ node }) => {
    const year = dayjs(node.frontmatter.time).year();
    if (nodesByYear[year] === undefined) {
      nodesByYear[year] = [];
    }
    nodesByYear[year].push(node);
  });

  const lists = [];
  for (const year in nodesByYear) {
    const links = nodesByYear[year].map(node => {
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
    lists.push(
      <section key={`${year}-section`}>
        <h2 key={`${year}-header`}>{year}</h2>
        <ul key={`${year}-list`}>{links}</ul>
      </section>
    );
  }
  lists.reverse();

  return (
    <Layout
      title="Naoto Kaneko's posts"
      description="Naoto Kaneko's all posts"
      path="/posts/"
    >
      <h1 className={styles.title}>Posts</h1>
      {lists}
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Top</Link>
          </li>
          <li className={styles.navigationItem}>
            <a href="/feed.xml">Feed</a>
          </li>
        </ul>
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
            time
          }
        }
      }
    }
  }
`;
