import React from "react";
import { Link } from "react-router-dom";
import { logoUrl } from "../../utils/constant";
import "./header.scss";
const Header = () => {
  const [lognBtnName, setLoginBtnName] = React.useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logoUrl} alt="logo" className="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <button
              className="login-btn"
              onClick={() => {
                lognBtnName === "logout"
                  ? setLoginBtnName("Login")
                  : setLoginBtnName("logout");
              }}
            >
              {lognBtnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
