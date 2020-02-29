import React, { Component } from "react";
import Layout from "../../components/layout";
import Tag from "../../components/tag";
import Time from "../../components/time";
import styles from "./_id.module.css";
import { Link } from "gatsby";
import mermaid from "mermaid";

export default class PostTemplate extends Component {
  componentDidMount() {
    mermaid.initialize({ startOnLoad: true });

    const elements = document.getElementsByClassName("mermaid");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const insert = svg => (element.innerHTML = svg);
      mermaid.mermaidAPI.render(`container-${i}`, element.textContent, insert);
    }
  }

  render() {
    const basename = this.props.pageContext.fileAbsolutePath.split("/").pop();
    const id = basename.replace(".md", "");

    return (
      <Layout
        title={this.props.pageContext.frontmatter.title}
        description={this.props.pageContext.frontmatter.description}
        path={`/posts/${id}.html`}
      >
        <article>
          <header className={styles.header}>
            <h1 className={styles.title}>
              {this.props.pageContext.frontmatter.title}
            </h1>
            <p className={styles.metadata}>
              <Time timeString={this.props.pageContext.frontmatter.time} />
              {(this.props.pageContext.frontmatter.tags || []).map(tag => (
                <Tag key={tag} name={tag} />
              ))}
            </p>
          </header>
          <section
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: this.props.pageContext.html }}
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
  }
}
