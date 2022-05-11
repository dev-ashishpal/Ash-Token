import React from "react";
import classes from "./Progress.module.css";

const Progress = (props) => {
  return (
    <div className={classes.ProgressBar}>
      <progress
        className={classes.Progress}
        id="file"
        value={props.value}
        max="1"
      >
        {props.value * 100}%
      </progress>
    </div>
  );
};

export default Progress;
