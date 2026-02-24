import React, { useEffect, useState } from "react";
import { backend_url, currency } from "../App";
import "./CSS/MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("auth-token");

  const fetchOrders = async () => {
    const response = await fetch(`${backend_url}/myorders`, {
      headers: {
        "auth-token": token,
      },
    });

    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();

    // 🔁 Poll every 5 seconds
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty">No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">

            <div className="order-header">
              <span><b>Order ID:</b> {order.orderId}</span>
              <span className={`status ${order.status.toLowerCase().replace(/\s/g, "-")}`}>
                {order.status}
              </span>
            </div>

            <div className="order-info">
              <p><b>Payment:</b> {order.paymentMethod}</p>
              <p><b>Total:</b> {currency}{order.totalAmount}</p>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">
                      Qty: {item.quantity} × {currency}{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;