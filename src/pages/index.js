import React from "react";
import styles from "./index.module.css";
import { Link } from "gatsby";
import Layout from "../components/layout";

export default () => (
  <Layout>
    <h1 className={styles.title}>Naoto Kaneko</h1>
    <ul>
      <li>
        <a href="https://blog.naoty.dev">Blog</a>
      </li>
      <li>
        <a href="https://github.com/naoty">GitHub</a>
      </li>
      <li>
        <a href="https://twitter.com/naoty_k">Twitter</a>
      </li>
    </ul>
  </Layout>
);
