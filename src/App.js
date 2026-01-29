import Navbar from "./Components/Navbar/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";

import Footer from "./Components/Footer/Footer";
import NewCollections from "./Components/NewCollections/NewCollections";
import OfferPage from "./Components/OfferPage/OfferPage";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";

import { ShopContext } from "./Context/ShopContext";

export const backend_url = "https://shopper-backend-q43b.onrender.com";
export const currency = "₹";

function App() {
  const { products } = useContext(ShopContext);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Shop gender="all" />} />

        {/* CATEGORY PAGES */}
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />

        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />

        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kid" />}
        />

        {/* PRODUCT PAGE */}
        <Route path="/product/:productId" element={<Product />} />

        {/* OFFER PAGE ✅ */}
        <Route path="/offers" element={<OfferPage />} />

        {/* CART & LOGIN */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* NEW COLLECTIONS */}
        <Route
          path="/newcollections"
          element={<NewCollections data={products} />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
