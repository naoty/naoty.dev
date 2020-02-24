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
            description
            title
            url
          }
        }
      }
    `}
    render={({ site: { siteMetadata } }) => (
      <main className={styles.container}>
        <Helmet>
          <title>{siteMetadata.title}</title>
          <meta name="description" content={siteMetadata.description} />
          <meta property="og:url" content={siteMetadata.url} />
          <meta property="og:title" content={siteMetadata.title} />
          <meta property="og:description" content={siteMetadata.description} />
          <meta
            property="og:image"
            content={`${siteMetadata.url}/icons/256x256.png`}
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@naoty_k" />
          <link rel="icon" type="image/png" href="/icons/favicon.png" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        {children}
      </main>
    )}
  />
);
