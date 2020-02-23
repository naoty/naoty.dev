import React from "react";
import Layout from "../../components/layout";

export default ({ pageContext }) => (
  <Layout>
    <article>
      <header>
        <h1>{pageContext.frontmatter.title}</h1>
      </header>
      <section dangerouslySetInnerHTML={{ __html: pageContext.html }}></section>
    </article>
  </Layout>
);
