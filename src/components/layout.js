import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import styles from "./layout.module.css";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => (
      <main className={styles.container}>
        <Helmet>
          <title>{siteMetadata.title}</title>
          <meta name="description" content={siteMetadata.description} />
          <meta name="og:title" content={siteMetadata.title} />
          <meta name="og:description" content={siteMetadata.description} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@naoty_k" />
        </Helmet>
        {children}
      </main>
    )}
  />
);
