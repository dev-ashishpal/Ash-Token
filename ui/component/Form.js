import classes from "./Form.module.css";

const Form = (props) => {
  return (
    <div className={classes.FormBox}>
      <form className={classes.Form}>
        <div className={classes.Input}>
          <input type="number" />
          <button>BUY!</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
