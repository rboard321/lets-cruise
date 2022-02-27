import React, {useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from "react-router-dom";

import {
  createOrder,
  getCartByUser,
  getAllProducts
  
} from "../api";

const Products = ({ setProducts, products, user, token, setMyProducts }) => {

  useEffect(() => {
    async function getProducts() {
      const response = await getAllProducts();
      setProducts(response);
    }
    getProducts();
  }, []);
  console.log('from products',products)

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
            <img src={product.imgurl} alt="bike"></img>
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
