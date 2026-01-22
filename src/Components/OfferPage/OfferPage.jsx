import React from "react";
import "./OfferPage.css";
import { useNavigate } from "react-router-dom";

import exclusive_image1 from "../Assets/product_1.png";
import exclusive_image2 from "../Assets/product_2.png";
import exclusive_image3 from "../Assets/product_3.png";

const OfferPage = () => {
  const navigate = useNavigate();

  return (
    <div className="offerpage">
      <div className="offerpage-banner">
        <h1>🔥 Exclusive Offers 🔥</h1>
        <p>Best deals only for you</p>
      </div>

      <div className="offerpage-content">
        <div className="offer-card">
          <img src={exclusive_image1} alt="offer" />
          <h2>Flat 50% OFF</h2>
          <p>On selected best seller products</p>
          <button onClick={() => navigate("/product/1")}>
            Shop Now
          </button>
        </div>

        <div className="offer-card">
          <img src={exclusive_image2} alt="offer" />
          <h2>Buy 1 Get 1</h2>
          <p>Limited time offer</p>
          <button onClick={() => navigate("/product/2")}>
            Shop Now
          </button>
        </div>

        <div className="offer-card">
          <img src={exclusive_image3} alt="offer" />
          <h2>Under ₹999</h2>
          <p>Special festive deals</p>
          <button onClick={() => navigate("/product/3")}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
