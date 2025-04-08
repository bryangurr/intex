import { useState } from "react";
import "./WelcomeBand.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function WelcomeBand() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark welcome-band"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1a082d",
        padding: "1rem 2rem",
        margin: 0,
        boxSizing: "border-box",
        zIndex: 9999,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        {/* Logo */}
        <h1
          className="mb-0"
          style={{
            color: "white",
            fontFamily: "Cinzel",
            fontSize: "3rem",
          }}
        >
          CineNiche
        </h1>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible nav items */}
        <div
          className="collapse navbar-collapse mt-3 mt-lg-0"
          id="navbarContent"
        >
          <ul className="navbar-nav d-flex flex-row gap-4 mx-auto">
            <li className="nav-item">
              <a className="nav-link fs-4 active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-4" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-4" href="#">
                Admin
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Search + user info */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          {!showSearch && (
            <i
              className="bi bi-search fs-5 text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowSearch(true)}
            ></i>
          )}

          {showSearch && (
            <form className="d-flex align-items-center gap-2 animate-expand">
              <input
                className="form-control"
                type="search"
                placeholder="Search movies..."
                aria-label="Search"
                style={{ minWidth: "200px" }}
              />
              <button className="btn btn-outline-light" type="submit">
                Go
              </button>
              <i
                className="bi bi-x-circle-fill text-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowSearch(false)}
              ></i>
            </form>
          )}

          <span className="text-white fs-5 fw-bold">Name</span>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "36px", height: "36px", objectFit: "cover" }}
          />
        </div>
      </div>
    </nav>
  );
}

export default WelcomeBand;
