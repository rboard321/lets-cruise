import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { callApi } from "./utils";
import { getCartByUser } from "../api";
const APIURL = `https://outdoorstuff.herokuapp.com/api`;
const REACT_APP_API_URL = process.env;

const Login = ({
  user,
  setUserId,
  setLoggedin,
  loggedIn,
  setToken,
  setUser,
  setIsAdmin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isMatched, setIsMatched] = useState(false);
  const [message, setMessage] = useState("");
  const params = useParams();

  let navigate = useNavigate();

  function logIn(resp) {
    if (resp) {
      setUserId(resp.user.id);
      setIsAdmin(resp.user.isAdmin);
      setToken(resp.token);
      localStorage.setItem("token", resp.token);
      if (resp.token == "") {
        setLoggedin(false);
      } else {
        setLoggedin(true);
        navigate("/products");
      }
    }
  }

  async function loginRoutine() {
    try {
      const resp = await fetch(`${APIURL}/users/${params.method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
        }),
      });

      const data = await resp.json();

      setUser(data.user);
      logIn(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (loggedIn === false) {
    return (
      <>
        <div className="login">
          <label>Login/Register</label>
          <form
            className="title"
            onSubmit={async (event) => {
              event.preventDefault();
              if (params.method !== "register") {
                loginRoutine();
              } else if (password === passwordConfirm) {
                setIsMatched(false);
                loginRoutine();
              } else {
                setIsMatched(true);
              }
            }}
          >
            {params.method === "login" ? (
              <>
                <>
                  <>
                    <>
                      <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      ></input>

                      <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      ></input>
                    </>
                    <button type="submit" disabled={password.length < 8}>
                      Submit
                    </button>
                  </>
                  <Link to="/api/users/register">Register</Link>
                </>
                <div>{message}</div>
              </>
            ) : null}
          </form>

          <form
            className=""
            onSubmit={async (event) => {
              event.preventDefault();
              if (params.method !== "register") {
                loginRoutine();
              } else if (password === passwordConfirm) {
                setIsMatched(false);
                loginRoutine();
              } else {
                setIsMatched(true);
              }
            }}
          >
            {params.method === "register" ? (
              <>
                <>
                  <input
                    type="text"
                    placeholder="first name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  ></input>

                  <input
                    type="text"
                    placeholder="last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  ></input>

                  <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  ></input>

                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  ></input>

                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  ></input>
                  <input
                    type="password"
                    placeholder="password"
                    value={passwordConfirm}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                  ></input>
                </>

                {password.length < 8 ? (
                  <div>Your password must be at least 8 characters long</div>
                ) : (
                  <div>Your password is more than 8 characters!</div>
                )}
                <button type="submit" disabled={password.length < 8}>
                  Submit
                </button>
              </>
            ) : null}
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="page-title">Welcome {user.firstName}</h1>
      </>
    );
  }
};

export default Login;
