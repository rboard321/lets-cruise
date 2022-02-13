import React from "react";
const { REACT_APP_API_URL = `https://outdoorstuff.herokuapp.com/api` } =
  process.env;

export const callApi = async ({ url, method, body }) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    const respObject = await fetch(`${REACT_APP_API_URL}${url}`, options);
    const data = await respObject.json();
    if (data.error) {
      throw data.error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
