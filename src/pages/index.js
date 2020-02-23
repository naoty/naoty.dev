import React from "react";
import styles from "./index.module.css";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

export default ({
  data: {
    site: { siteMetadata }
  }
}) => (
  <main className={styles.container}>
    <Helmet>
      <title>{siteMetadata.title}</title>
      <meta name="description" content={siteMetadata.description} />
    </Helmet>

    <h1 className={styles.title}>Naoto Kaneko</h1>
    <ul>
      <li>
        <a href="#">Posts</a>
      </li>
      <li>
        <a href="https://github.com/naoty">GitHub</a>
      </li>
      <li>
        <a href="https://twitter.com/naoty_k">Twitter</a>
      </li>
    </ul>
  </main>
);

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
