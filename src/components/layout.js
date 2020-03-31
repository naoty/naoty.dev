import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import styles from "./layout.module.css";

export default function Layout({ title, description, image, path, children }) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              defaultDescription: description
              defaultTitle: title
              url
            }
          }
        }
      `}
      render={({ site: { siteMetadata } }) => {
        const metadata = {
          description: description || siteMetadata.description,
          image: image || `${siteMetadata.url}/icons/256x256.png`,
          title: title || siteMetadata.defaultTitle,
          url: `${siteMetadata.url}${path}`
        };
        return (
          <main className={styles.container}>
            <Helmet>
              <title>{metadata.title}</title>
              <meta name="description" content={metadata.description} />
              <meta property="og:url" content={metadata.url} />
              <meta property="og:title" content={metadata.title} />
              <meta property="og:description" content={metadata.description} />
              <meta property="og:image" content={metadata.image} />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@naoty_k" />
              <link rel="icon" type="image/png" href="/icons/favicon.png" />
              <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
              <link rel="manifest" href="/manifest.json" />
              <link
                rel="alternate"
                type="application/rss+xml"
                href="/posts/feed.xml"
              />
            </Helmet>
            {children}
          </main>
        );
      }}
    />
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string
};

Layout.defaultProps = {
  title: null,
  description: null,
  image: null,
  path: ""
};
