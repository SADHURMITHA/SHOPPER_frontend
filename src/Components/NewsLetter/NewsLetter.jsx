import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (email === "") {
      setMessage("❌ Please enter your email");
      return;
    }

    // simple email validation
    if (!email.includes("@")) {
      setMessage("❌ Please enter a valid email");
      return;
    }

    setMessage("✅ Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated.</p>

      <div className="newsletter-input">
        <input
          type="email"
          placeholder="Your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>

      {message && <p className="newsletter-message">{message}</p>}
    </div>
  );
};

export default NewsLetter;
