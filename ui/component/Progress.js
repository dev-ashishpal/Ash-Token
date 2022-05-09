import classes from "./Progress.module.css";

const Progress = (props) => {
  return (
    <div className={classes.ProgressBar}>
      <progress className={classes.Progress} id="file" value={props.value} max="100">
        {props.value}%
      </progress>
    </div>
  );
};

export default Progress;
