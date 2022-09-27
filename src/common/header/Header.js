import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg"

function Header() {
    return (
        <div className="header">
            <img src={logo} alt="Logo" className="logo"></img>
        </div>
    )
}

export default Header;