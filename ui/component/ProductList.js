import React from 'react';
import Product from "./Product";
import classes from "./ProductList.module.css";

const ProductList = (props) => {
  const { products } = props;
  return (
    <ul className={classes.list}>
      {products.map((product) => (
        <Product
          key={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
		  onClick={props.onClick}
        />
      ))}
    </ul>
  );
};

export default ProductList;
