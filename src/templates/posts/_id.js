import React, { Component } from "react";
import Layout from "../../components/layout";
import Tag from "../../components/tag";
import Time from "../../components/time";
import styles from "./_id.module.css";
import { Link } from "gatsby";
import mermaid from "mermaid";

export default class PostTemplate extends Component {
  componentDidMount() {
    const elements = document.getElementsByClassName("mermaid");
    if (elements.length === 0) return;

    mermaid.initialize({ startOnLoad: true });
    mermaid.parseError = (error, hash) => {
      console.error(error);
      console.log(hash);
    };

    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const texts = [];
    const pattern = /<div class="mermaid">([\s\S]+?)<\/div>/g;

    let match;
    while ((match = pattern.exec(this.props.pageContext.html)) !== null) {
      texts.push(match[1].trim());
    }

    const elements = document.getElementsByClassName("mermaid");
    for (let i = 0; i < elements.length; i++) {
      const text = texts[i];
      if (text === undefined) return;

      const element = elements[i];
      const insert = svg => (element.innerHTML = svg);
      mermaid.mermaidAPI.render(`container-${i}`, text, insert);
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
