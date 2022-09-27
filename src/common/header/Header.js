import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from '@material-ui/core/Button';

function Header() {
    return (
        <div className="header">
            <img src={logo} alt="Logo" className="logo"></img>
            <div className="header-buttons-div">
                <Button id="bookShowButton" variant="contained" color="primary">Book Show</Button>
                <Button id="loginLogoutButton" variant="contained">Login</Button>
            </div>
            
        </div>
    )
}

export default Header;