import React, { forwardRef } from "react";
import classes from "./Form.module.css";
const Form = forwardRef((props, ref) => {
  return (
    <div className={classes.FormBox}>
      <form className={classes.Form} onSubmit={props.onSubmit}>
        <div className={classes.Input}>
          <input type="number" ref={ref} />
          <button type="submit">BUY!</button>
        </div>
      </form>
    </div>
  );
});

export default Form;
