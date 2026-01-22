import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayNow = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    setPaymentSuccess(true);
  };

  return (
    <div className="cartitems">
      {/* CART HEADER */}
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* CART ITEMS */}
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img
                  className="cartitems-product-icon"
                  src={backend_url + e.image}
                  alt=""
                />
                <p>{e.name}</p>
                <p>{currency}{e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{currency}{e.new_price * cartItems[e.id]}</p>
                <img
                  src={cross_icon}
                  className="cartitems-remove-icon"
                  alt=""
                  onClick={() => removeFromCart(e.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      {/* TOTAL */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h2>Total: {currency}{getTotalCartAmount()}</h2>
          <button onClick={() => setShowPopup(true)}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      {/* PAYMENT POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            {!paymentSuccess ? (
              <>
                <h2>Select Payment Method</h2>

                <button
                  className={`payment-option ${
                    selectedPayment === "Card" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPayment("Card")}
                >
                  💳 Card Payment
                </button>

                <button
                  className={`payment-option ${
                    selectedPayment === "UPI" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPayment("UPI")}
                >
                  📱 UPI / GPay / PhonePe
                </button>

                <button
                  className={`payment-option ${
                    selectedPayment === "COD" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPayment("COD")}
                >
                  💵 Cash on Delivery
                </button>

                <button className="pay-now-btn" onClick={handlePayNow}>
                  PAY NOW
                </button>

                <button
                  className="close-btn"
                  onClick={() => {
                    setShowPopup(false);
                    setSelectedPayment("");
                    setPaymentSuccess(false);
                  }}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2>✅ Payment Successful</h2>
                <p>Payment Method: {selectedPayment}</p>

                <button
                  className="close-btn"
                  onClick={() => {
                    setShowPopup(false);
                    setSelectedPayment("");
                    setPaymentSuccess(false);
                  }}
                >
                  Done
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
