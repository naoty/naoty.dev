import React from "react";
import styles from "./index.module.css";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";

export default ({
  data: {
    site: { siteMetadata }
  }
}) => (
  <main className={styles.container}>
    <Helmet>
      <title>{siteMetadata.title}</title>
      <meta name="description" content={siteMetadata.description} />
      <meta name="og:title" content={siteMetadata.title} />
      <meta name="og:description" content={siteMetadata.description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@naoty_k" />
    </Helmet>

    <h1 className={styles.title}>Naoto Kaneko</h1>
    <ul>
      <li>
        <Link to="/posts/">Posts</Link>
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
