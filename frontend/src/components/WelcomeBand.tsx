import { useState } from "react";
import "./WelcomeBand.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { AuthorizedUser } from "./AuthorizeView";

function WelcomeBand() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://localhost:5000/api/Movies/Search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      console.log("Search results:", data);
      // Optionally, navigate to a results page or update state with search results
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

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
              <span
                className="nav-link fs-4 active"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/movies`)}
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link fs-4 active"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/privacy`)}
              >
                About
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link fs-4 active"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/admin`)}
              >
                Admin
              </span>
            </li>
          </ul>
        </div>
        {/* Mobile profile dropdown */}
        <div className="d-lg-none mt-3">
          <hr className="text-white" />
          <div className="dropdown align-items-center text-center">
            <span className="text-white fs-5 fw-bold d-block mb-2">Name</span>
            <img
              src="https://media.istockphoto.com/id/1345297900/vector/retro-style-gentleman-face-vector-cartoon.jpg?s=612x612&w=0&k=20&c=_R-Bi_cYrBak_wozvaHDGR1Uo3Tb4tX5yxS-GF0S2Cg="
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu align-items-center">
              <li className="dropdown-item-text fw-bold">Name</li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => console.log("Log out")}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
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
            <form
              className="d-flex align-items-center gap-2 animate-expand"
              onSubmit={handleSearch}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search movies..."
                aria-label="Search"
                style={{ minWidth: "200px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          <div className="dropdown">
            <img
              src="https://media.istockphoto.com/id/1345297900/vector/retro-style-gentleman-face-vector-cartoon.jpg?s=612x612&w=0&k=20&c=_R-Bi_cYrBak_wozvaHDGR1Uo3Tb4tX5yxS-GF0S2Cg=
              "
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "36px",
                height: "36px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu dropdown-menu-end align-items-center text-center">
              <li className="dropdown-item-text fw-bold">Name</li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="bg-secondary text-white border-0 rounded-3 px-3 py-2">
                  <Logout>
                    Logout <AuthorizedUser value="email" />
                  </Logout>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default WelcomeBand;
