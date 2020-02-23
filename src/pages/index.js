import React from "react";
import styles from "./index.module.css";

export default () => (
  <main className={styles.container}>
    <h1 className={styles.title}>Naoto Kaneko</h1>
    <ul>
      <li>
        <a href="#">Posts</a>
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
