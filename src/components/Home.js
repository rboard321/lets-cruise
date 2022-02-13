import React, { useEffect, useState } from "react";

const Home = () => {
  return (
    <>
      <h1 className="page-title">Welcome to Let's Cruise!</h1>
      <br></br>
      <div className="home-paragraph-container">
        <p className="home-paragraph">
          At Let's Cruise we focus on the rider. Our goal is to help you find
          the perfect ride for whatever you need. We provide customized bikes
          for any type of situation. If you enjoy exploring the city and need a
          great road bike we can help with that. If you prefer riding on the
          road or the forest trails we will make sure you have the best bike for
          your adventures. If you are not satisfied we will make it right!
        </p>
      </div>
      <img
        className="home-page-image"
        src="https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80"
        alt="Riding on the road by forest"
      ></img>
    </>
  );
};
export default Home;
