import React, { useEffect, useState } from "react";
import "./ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortType, setSortType] = useState("");

  const fetchInfo = () => {
    fetch("https://shopper-backend-q43b.onrender.com/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

 
  const sortedProducts = [...allproducts]
    .filter((item) => props.category === item.category)
    .sort((a, b) => {
      if (sortType === "low-high") return a.new_price - b.new_price;
      if (sortType === "high-low") return b.new_price - a.new_price;
      if (sortType === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1 - {sortedProducts.length}</span> Products
        </p>

       
        <div className="shopcategory-sort">
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sort by   </option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
          <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      
      <div className="shopcategory-loadmore">
        <Link to="/offers" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ShopCategory;
