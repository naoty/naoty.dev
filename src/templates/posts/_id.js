import React from "react";
import Layout from "../../components/layout";

export default ({ pageContext }) => (
  <Layout>
    <article>
      <h1>{pageContext.frontmatter.title}</h1>
    </article>
  </Layout>
);
