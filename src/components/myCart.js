import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  destroyCart,
  getCartByUser,
  submitCheckout,
  orderDelete,
  updateQuantity,
} from "../api";

const MyCart = ({ userId, token, setMyProducts, myProducts, user, cart }) => {
  let totalPrice = 0;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExp, setCreditCardExp] = useState("");
  const [creditValidationNumber, setCreditValidationNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  const getTotal = async () => {
    if (myProducts) {
      const updatedMyProducts = await getCartByUser(user.id, token);
      setMyProducts(updatedMyProducts);
    }

    if (myProducts) {
      myProducts.map((element) => {
        totalPrice =
          Number(totalPrice) + Number(element.price) * element.orderQuantity;
        setTotal(totalPrice);
      });
      totalPrice = 0;
    }
  };

  const getUpdateTotal = async () => {
    const updatedMyProducts = await getCartByUser(user.id, token);
    setMyProducts(updatedMyProducts);

    if (updatedMyProducts) {
      updatedMyProducts.map((element) => {
        totalPrice =
          Number(totalPrice) + Number(element.price) * element.orderQuantity;
        setTotal(totalPrice);
      });
      totalPrice = 0;
    }
  };

  const getMyProducts = async () => {
    try {
      const myProducts = await getCartByUser(user.id, token);

      setMyProducts(myProducts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyProducts();
    getTotal();
  }, [token]);

  const handleUpdate = async (orderId) => {
    await updateQuantity(orderId, quantity, token);
    getUpdateTotal();
  };

  const removeItem = async (orderId) => {
    if (orderId) {
      await orderDelete(orderId, token);
    }

    getUpdateTotal();
  };

  const deleteCart = async () => {
    if (userId) {
      await destroyCart(userId, token);
      const usersCart = await getCartByUser(userId, token);
      setMyProducts(usersCart);
    }

    setTotal(0);
  };

  const submitOrder = async (event) => {
    event.preventDefault();

    if (user.id) {
      const checkout = await submitCheckout(
        {
          userId: user.id,
          firstName,
          lastName,
          street,
          city,
          state,
          zip,
          phone,
          creditCardNumber,
          creditCardExp,
          creditValidationNumber,
          orders: cart,
        },
        token
      );
    }
    const usersCart = await getCartByUser(user.id, token);
    setMyProducts(usersCart);
    deleteCart();
    setSuccess(true);
    setFirstName("");
    setLastName("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setCreditValidationNumber("");
    setCreditCardExp("");
    setCreditCardNumber("");
    const notify = () =>
      toast.success("Thank you for your purchase! Your purchase is complete.");
    notify();
  };

  return (
    <>
      {user ? (
        <h1 className="page-title">Welcome to your cart, {user.firstName}</h1>
      ) : (
        <h1 className="page-title">
          Your cart is empty. Please start shopping and find the bike of your
          dreams!
        </h1>
      )}
      <div class="card">
        {myProducts ? (
          myProducts.map((item) => (
            <>
              <div class="product">
                <div class="img-wrapper">
                  <img src={item.imgurl} alt="" class="product-img" />
                  <div class="badge">{item.orderQuantity}</div>
                </div>
                <div class="product-name">
                  <p>{item.title}</p>
                </div>
                <div>
                  <button
                    value={item.orderId}
                    onClick={(event) => handleUpdate(event.target.value)}
                  >
                    Update
                  </button>
                  <select onChange={(event) => setQuantity(event.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </div>
                <div>
                  <button
                    className="remove-button"
                    value={item.orderId}
                    onClick={(event) => {
                      event.preventDefault();
                      removeItem(event.target.value);
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div class="price">
                  <span>${item.price * item.orderQuantity}</span>
                </div>
              </div>
            </>

            // <div className="card" key={item.id}>
            //   <div className="product">

            //     {/*<img className="product-img" src={item.imgurl}></img>*/}
            //     <div className="product-name">
            //     {item.title}
            //     </div>
            //     <div className="price">
            //     {" $"}
            //     {item.price * item.orderQuantity}
            //     </div>
            //     <button
            //       value={item.orderId}
            //       onClick={(event) => handleUpdate(event.target.value)}
            //     >
            //       Update
            //     </button>
            //     <select onChange={(event) => setQuantity(event.target.value)}>
            //       <option value={1}>1</option>
            //       <option value={2}>2</option>
            //       <option value={3}>3</option>
            //       <option value={4}>4</option>
            //       <option value={5}>5</option>
            //       <option value={6}>6</option>
            //       <option value={7}>7</option>
            //       <option value={8}>8</option>
            //       <option value={9}>9</option>
            //       <option value={10}>10</option>
            //     </select>
            //     <button
            //       value={item.orderId}
            //       onClick={(event) => {
            //         event.preventDefault();
            //         removeItem(event.target.value);
            //       }}
            //     >
            //       Remove selected item
            //     </button>
            //   </div>
            // </div>
          ))
        ) : (
          <div>Cart is Empty</div>
        )}
        <div class="total">
          <p class="text">Total</p>
          <p class="total-price">
            <span>USD</span>&nbsp;{"$"}
            {total}
          </p>
        </div>
      </div>

      <button onClick={() => deleteCart()}>Delete Cart</button>

      <Link to="/products">Click here to find more Bikes!</Link>

      <form onSubmit={submitOrder}>
        <h3 id="checkoutInstruction">
          Please Enter Your Shipping and Payment Information!
        </h3>
        <div id="creditCardSection">
          <input
            className="input"
            type="text"
            placeholder="First"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="Last"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          ></input>
        </div>
        <div id="creditCardSection">
          <input
            className="input"
            type="text"
            placeholder="Street"
            required
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="State"
            required
            value={state}
            onChange={(event) => setState(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="Zip"
            required
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="Phone"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          ></input>
        </div>
        <div id="creditCardSection">
          <input
            className="input"
            type="text"
            placeholder="CC Number"
            required
            value={creditCardNumber}
            onChange={(event) => setCreditCardNumber(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="Expiration"
            required
            value={creditCardExp}
            onChange={(event) => setCreditCardExp(event.target.value)}
          ></input>

          <input
            className="input"
            type="text"
            placeholder="CVV# on Back"
            required
            value={creditValidationNumber}
            onChange={(event) => setCreditValidationNumber(event.target.value)}
          ></input>
        </div>
        {/* {success ? (
          <div>Thank you for your purchase! Your purchase is complete.</div>
        ) : null} */}
        <button
          id="paymentSubmit"
          type="submit"
          variant="contained"
          className="button"
        >
          Submit Order
        </button>
        <ToastContainer theme="colored" />
      </form>
    </>
  );
};

export default MyCart;
