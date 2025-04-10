import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Identity.css";
import "@fortawesome/fontawesome-free/css/all.css";

function LoginPage() {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);

  // state variable for error messages
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setRememberme(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!password) {
      setError("Password is required");
      return;
    }
    if (!email) {
      setError("Email is required");
      return;
    }

    const loginUrl = rememberme
      ? // ? "https://localhost:5000/login?useCookies=true" // Comment out for deployment or testing server
        // : "https://localhost:5000/login?useSessionCookies=true"; // Comment out for deployment or testing server
        "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/login?useCookies=true" // Comment out for localhost testing
      : "https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net/login?useSessionCookies=true"; // Comment out for localhost testing

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are sent & received
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Ensure we only parse JSON if there is content
      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      navigate("/movies");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch attempt failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h1
              style={{
                color: "#2b183f",
                fontFamily: "cinzel",
                fontSize: "3.25rem",
              }}
              className="text-center mb-4"
            >
              CineNiche
            </h1>
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberme"
                  name="rememberme"
                  checked={rememberme}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberme">
                  Remember password
                </label>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-purple text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-purple text-uppercase fw-bold"
                  type="submit"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-purple text-uppercase fw-bold"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Back to Home Page
                </button>
              </div>

              <hr className="my-4" />
              <div className="text-center mt-4">
                <a href="https://play.google.com/store/apps/dev?id=7789761052013638919&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer">
                <i className="fa-brands fa-google social-icon me-3"></i>
                </a>
                <a href="https://www.facebook.com/AngelStudios.inc/" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook-f social-icon"></i>
                </a>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
