import React from "react";
import Layout from "../../components/layout";
import Time from "../../components/time";
import styles from "./_id.module.css";
import { Link } from "gatsby";

export default ({ pageContext }) => (
  <Layout>
    <article>
      <header className={styles.header}>
        <h1 className={styles.title}>{pageContext.frontmatter.title}</h1>
        <p className={styles.metadata}>
          <Time timeString={pageContext.frontmatter.time} />
        </p>
      </header>
      <section
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: pageContext.html }}
      ></section>
      <footer>
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
      </footer>
    </article>
  </Layout>
);
