import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styles from "./time.module.css";

export default function Time({ timeString }) {
  const time = dayjs(timeString);
  return (
    <time
      dateTime={time.format("YYYY-MM-DDTHH:mm:ss.SSSZZ")}
      className={styles.label}
    >
      {time.format("YYYY-MM-DD HH:mm")}
    </time>
  );
}

Time.propTypes = {
  timeString: PropTypes.string
};
