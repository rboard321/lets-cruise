import React, { useState, useEffect } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getAllCheckoutByUserId, getCartByUser, getAllProducts } from "../api";
import { Products, Product, Login, MyCart, AdminEdit, Home } from "./";

const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState();
  const [loggedIn, setLoggedin] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [myProducts, setMyProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [itemId, setItemId] = useState();
  const [checkout, setCheckout] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [totalCartCost, setTotalCartCost] = useState(0);

  useEffect(() => {
    async function getProducts() {
      const response = await getAllProducts();
      setProducts(response);
    }
    getProducts();
  }, []);

  let navigate = useNavigate();

  return (
    <>
      <header id="top">
        <h1 className="headerTitle">Let's Cruise</h1>
        <Link className={"title"} to="/">
          Home
        </Link>
        <Link to="/products">Products</Link> <Link to="/cart">Cart</Link>{" "}
        <Link className={token ? "ifLoggedOut" : ""} to="api/users/login">
          Login/Register
        </Link>
        {loggedIn ? (
          <button
            className={token ? "" : "ifLoggedOut"}
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedin(false);
              setIsAdmin(false);
              localStorage.removeItem("token");
              navigate("/");
              window.location.reload(false);
            }}
          >
            Log Out
          </button>
        ) : null}
        {isAdmin ? <Link to="/admin">Admin</Link> : null}
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/products"
          element={
            <Products
              isAdmin={isAdmin}
              setCartItems={setCartItems}
              cartItems={cartItems}
              itemId={itemId}
              products={products}
              setItemId={setItemId}
              setProducts={setProducts}
              setMyProducts={setMyProducts}
              myProducts={myProducts}
              user={user}
              token={token}
            />
          }
        />
        <Route
          exact
          path="/products/:productId"
          element={<Product products={products} isAdmin={isAdmin} />}
        />
        <Route
          path="api/users/:method"
          element={
            <Login
              setIsAdmin={setIsAdmin}
              setToken={setToken}
              setLoggedin={setLoggedin}
              loggedIn={loggedIn}
              setUserId={setUserId}
              setUser={setUser}
              setCartItems={setCartItems}
              userId={userId}
              token={token}
              user={user}
              totalCartCost={totalCartCost}
              setTotalCartCost={setTotalCartCost}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <MyCart
              loggedIn={loggedIn}
              user={user}
              userId={userId}
              token={token}
              products={products}
              myProducts={myProducts}
              setMyProducts={setMyProducts}
              setCheckout={setCheckout}
              setCartItems={setCartItems}
              userData={userData}
              cart={cart}
            />
          }
        />
        <Route
          exact
          path="/admin"
          element={<AdminEdit isAdmin={isAdmin} token={token} />}
        />
      </Routes>
    </>
  );
};

export default App;
