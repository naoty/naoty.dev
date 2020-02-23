import React from "react";
import PropTypes from "prop-types";
import styles from "./tag.module.css";
import { Link } from "gatsby";

export default function Tag({ name }) {
  return (
    <Link to={`/posts/${name}/`} className={styles.label}>
      #{name}
    </Link>
  );
}

Tag.propTypes = {
  name: PropTypes.string
};
