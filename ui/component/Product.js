import React from "react";
import classes from "./Product.module.css";

const Product = (props) => {
  const { image, title, price } = props;
  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <span>ASH.</span>
          <span>{price}</span>
          <button onClick={props.onClick}>BUY!</button>
        </div>
      </div>
    </li>
  );
};

export default Product;
