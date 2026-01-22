import React from "react";
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
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Cart</li>
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
