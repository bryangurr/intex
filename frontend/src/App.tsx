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


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

        </Routes>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
