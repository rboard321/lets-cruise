import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Routes, useNavigate } from "react-router-dom";

import {
  createOrder,
  getCartByUser,
  getProductById,
  updateQuantity,
  getAllProducts,
} from "../api";

const Products = ({ products, setProducts, user, token, setMyProducts }) => {
  const [quantity, setQuantity] = useState(0);
  const [itemOrder, setItemOrder] = useState(0);
  const [updatingItem, setUpdatingItem] = useState(false);

  const navigate = useNavigate();

  const addProductToOrder = async (productId) => {
    if (user.id) {
      const order = await createOrder({
        userId: user.id,
        completePurchase: false,
        productId: productId,
        quantity: 1,
        token,
      });

      const cart = await getCartByUser(user.id, token);

      console.log(">>>>???/", cart);
      const notify = () =>
        toast.success("🚲 Your item has been added to your cart!");
      notify();
      setMyProducts(cart);
    }
  };

  return (
    <>
      {user ? (
        <h2 className="page-title">
          Welcome to Let's Cruise! {user.firstName}
        </h2>
      ) : (
        <h2 className="page-title">Welcome to Let's Cruise!</h2>
      )}

      <div id="all-products-container">
        {products.map((product) => (
          <div className="single-product-card" key={product.id}>
            <h1>{product.title}</h1>
            <h3>
              {"$"}
              {product.price}
            </h3>
            <p>{product.description}</p>
            <img src={product.imgurl}></img>
            <button
              value={product.id}
              onClick={(event) => navigate(`${event.target.value}`)}
            >
              View
            </button>
            <br></br>
            <button
              value={product.id}
              onClick={(event) => addProductToOrder(event.target.value)}
            >
              Add to Cart
            </button>
            <ToastContainer theme="colored" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
