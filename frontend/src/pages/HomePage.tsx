// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Identity.css";
import "@fortawesome/fontawesome-free/css/all.css";

function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login");
  };
  return (
    <>
      <h1>CineNiche</h1>
      <button onClick={handleLoginClick}>Login</button>
    </>
  );
}

export default HomePage;
