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
import MovieDetailPage from "./pages/MovieDetailPage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage/>} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />

        </Routes>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
