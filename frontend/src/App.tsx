import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/CartPage";
// import { CartProvider } from "./context/CartContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer"; // Your footer component
import PrivacyPolicy from "./components/PrivacyPolicy";
import MoviePage from "./pages/MoviePage";
import AdminMoviePage from "./pages/AdminMoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchResults from "./components/SearchResults";
import CookieBanner from "./components/CookieBanner";
import AuthorizeView from "./components/AuthorizeView";
import WelcomeBand from "./components/WelcomeBand";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <>
      <Router>
        <CookieBanner />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          // App.tsx or routes
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
            path="/movies"
            element={
              <AuthorizeView>
                <WelcomeBand />
                <MoviePage />
              </AuthorizeView>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthorizeView>
                <WelcomeBand />
                <AdminMoviePage />
              </AuthorizeView>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/search" element={<SearchResults />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
