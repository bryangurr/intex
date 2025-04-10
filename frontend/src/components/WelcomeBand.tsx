import { useState } from "react";
import "./WelcomeBand.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { useUser } from "./AuthorizeView";

function WelcomeBand() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const user = useUser();
  const isLoggedIn = !!user;
  const isAdmin = user?.roles.includes("Admin");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
        <div className="d-flex align-items-center gap-4">
          <h1
            className="mb-0"
            style={{ color: "white", fontFamily: "Cinzel", fontSize: "3rem" }}
          >
            CineNiche
          </h1>
          <br />
          {isLoggedIn && window.history.length > 1 && (
            <span
              className="nav-link fs-5 text-white"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              ← Back
            </span>
          )}
        </div>

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

        <div
          className="collapse navbar-collapse mt-3 mt-lg-0"
          id="navbarContent"
        >
          <ul className="navbar-nav d-flex flex-row gap-4 mx-auto">
            <li className="nav-item">
              <span
                className="nav-link fs-4 active"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (user?.email) {
                    navigate("/movies");
                  } else {
                    navigate("/");
                  }
                }}
              >
                Home
              </span>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <span
                  className="nav-link fs-4 active"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </span>
              </li>
            )}
          </ul>
        </div>

        {isLoggedIn && (
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
                src="https://inteximages47.blob.core.windows.net/uploads/profileImage.jpg"
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
                <li className="dropdown-item-text fw-bold">{user?.name}</li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="bg-secondary text-white border-0 rounded-3 px-3 py-2">
                    <Logout>
                      Logout <>{user?.email}</>
                    </Logout>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default WelcomeBand;
