import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Product = ({ products }) => {
  const { productId } = useParams();

  return (
    <>
      <Link to="/products">Back to all products</Link>
      <div id="all-products-container-one">
      <div className="single-product-card">
      {products.map((product) => {
        return productId == product.id ? (
          <div className=".single-product-card" key={product.id}>
            <h1>{product.title}</h1>
            <h3>{'$'}{product.price}</h3>
            <p>{product.description}</p>
            <img src={product.imgurl} />
          </div>
        ) : null;
      })}
      </div>
      </div>
    </>
  );
};
export default Product;
