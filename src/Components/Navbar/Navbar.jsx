import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
    window.location.replace('/SHOPPER_frontend/#/');
  };

  return (
    <div className="nav">
      {/* Logo */}
      <Link
        to="/"
        onClick={() => setMenu('shop')}
        style={{ textDecoration: 'none' }}
        className="nav-logo"
      >
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </Link>

      {/* Dropdown for mobile */}
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt="dropdown"
      />

      {/* Menu */}
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            Shop
          </Link>
          {menu === 'shop' && <hr />}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link to="/mens" style={{ textDecoration: 'none' }}>
            Men
          </Link>
          {menu === 'mens' && <hr />}
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link to="/womens" style={{ textDecoration: 'none' }}>
            Women
          </Link>
          {menu === 'womens' && <hr />}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link to="/kids" style={{ textDecoration: 'none' }}>
            Kids
          </Link>
          {menu === 'kids' && <hr />}
        </li>
      </ul>

      {/* Login / Logout / My Orders / Cart */}
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <>
            <button onClick={handleLogout}>Logout</button>

            {/* My Orders button */}
            <Link to="/myorders" style={{ textDecoration: 'none' }}>
              <button>My Orders</button>
            </Link>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
        )}

        {/* Cart */}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
