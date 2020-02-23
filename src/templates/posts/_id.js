import React from "react";
import Layout from "../../components/layout";
import styles from "./_id.module.css";

export default ({ pageContext }) => (
  <Layout>
    <article>
      <header className={styles.header}>
        <h1 className={styles.title}>{pageContext.frontmatter.title}</h1>
      </header>
      <section
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: pageContext.html }}
      ></section>
    </article>
  </Layout>
);
