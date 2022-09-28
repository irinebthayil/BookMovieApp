import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

function Header(props) {

    // to control opening and closing of Login/Register Modal
    const [open, setOpen] = React.useState(false);

    // to keep track of Login/Register tabs
    const [tabvalue, setTabValue] = React.useState(0);

    // state to store details of user to be registered
    const [registerUser, setRegisteredUser] = React.useState({
        first_name: "",
        last_name: "",
        email_address: "",
        password: "",
        mobile_number: ""
    });

    // keeps track of access token to determin if user is logged in
    const [access_token, setAccessToken] = React.useState(window.sessionStorage.getItem("access-token"));

    // change display of login and logout button depending on access token
    React.useEffect(() => {
        if (access_token === null) {
            document.getElementById('loginButton').style.display = "block";
            document.getElementById('logoutButton').style.display = "none";
        }
        else {
            document.getElementById('loginButton').style.display = "none";
            document.getElementById('logoutButton').style.display = "block";
        }
    }, [access_token])

    React.useEffect(() => {
        if (props.source == "detailsPage") {
            document.getElementById('bookShowButton').style.display = "block";
        }
        else
        {
            document.getElementById('bookShowButton').style.display = "none";
        }

    }, [props.source])

    const onLoginClicked = () => {
        setOpen(true);
    };

    const onLogoutClicked = () => {
        window.sessionStorage.removeItem('access-token');
        setAccessToken(window.sessionStorage.getItem("access-token"));
    }

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newTabValue) => {
        // clear registration fields on tab change
        setRegisteredUser({
            first_name: "",
            last_name: "",
            email_address: "",
            password: "",
            mobile_number: ""
        });
        setTabValue(newTabValue);
    }

    function inputChangedHandler(e) {
        const state = registerUser;
        state[e.target.id] = e.target.value;
        setRegisteredUser({ ...state });
    }

    async function onFormRegisterClicked() {
        let requiredFilled = true;
        if (registerUser.first_name.trim() === "") {
            document.getElementById('first_name-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('first_name-required').style.display = "none";
        }
        if (registerUser.last_name.trim() === "") {
            document.getElementById('last_name-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('last_name-required').style.display = "none";
        }
        if (registerUser.email_address.trim() === "") {
            document.getElementById('email_address-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('email_address-required').style.display = "none";
        }
        if (registerUser.password.trim() === "") {
            document.getElementById('password-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('password-required').style.display = "none";
        }
        if (registerUser.mobile_number.trim() === "") {
            document.getElementById('mobile_number-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('mobile_number-required').style.display = "none";
        }

        if (requiredFilled) {
            console.log(registerUser);
            try {
                const rawResponse = await fetch('/api/v1/signup', {
                    body: JSON.stringify(registerUser),
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                });

                const result = await rawResponse.json();
                console.log(rawResponse);
                if (rawResponse.ok) {
                    document.getElementById('registration-success-message').style.display = "block";
                } else {
                    const error = new Error();
                    error.message = result.message || 'Something went wrong.';
                    throw error;
                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }
        }
    }

    async function onFormLoginClicked() {
        let requiredFilled = true;
        let username = document.getElementById('username').value;
        let pwd = document.getElementById('loginPassword').value;
        if (username.trim() === "") {
            document.getElementById('username-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('username-required').style.display = "none";
        }

        if (pwd.trim() === "") {
            document.getElementById('loginPassword-required').style.display = "block";
            requiredFilled = false;
        }
        else {
            document.getElementById('loginPassword-required').style.display = "none";
        }

        if (requiredFilled) {
            const auth = window.btoa(`${username}:${pwd}`);
            try {
                const rawResponse = await fetch('/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                        authorization: `Basic ${auth}`
                    }
                });

                const result = await rawResponse.json();
                if (rawResponse.ok) {
                    window.sessionStorage.setItem('user-details', JSON.stringify(result));
                    window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                    setAccessToken(window.sessionStorage.getItem("access-token"));
                    handleModalClose();
                } else {
                    const error = new Error();
                    error.message = result.message || 'Something went wrong.';
                }
            } catch (e) {
                alert(`Error: ${e.message}`);
            }

        }
    }

    const { first_name, last_name, email_address, password, mobile_number } = registerUser;
    return (
        <div className="header">
            <Modal
                open={open}
                onClose={handleModalClose}>
                <div className="modal-div">
                    <Tabs value={tabvalue} onChange={handleTabChange}>
                        <Tab label="LOGIN" />
                        <Tab label="REGISTER" />
                    </Tabs>
                    <div>
                        {tabvalue === 0 && (
                            <div className="form-div">
                                <FormControl required>
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input id="username" />
                                    <FormHelperText id="username-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl><br></br>
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" />
                                    <FormHelperText id="loginPassword-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl><br /><br />
                                <Button id="formLoginButton" variant="contained" color="primary" onClick={onFormLoginClicked}>Login</Button>
                            </div>

                        )}
                        {tabvalue === 1 && (
                            <div className="form-div">
                                <FormControl required>
                                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                                    <Input id="first_name" value={first_name} onChange={inputChangedHandler} />
                                    <FormHelperText id="first_name-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl><br />
                                <FormControl required>
                                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                                    <Input id="last_name" value={last_name} onChange={inputChangedHandler} />
                                    <FormHelperText id="last_name-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl><br />
                                <FormControl required>
                                    <InputLabel htmlFor="email_address">Email</InputLabel>
                                    <Input id="email_address" value={email_address} onChange={inputChangedHandler} />
                                    <FormHelperText id="email_address-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl><br />
                                <FormControl required>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" value={password} onChange={inputChangedHandler} />
                                    <FormHelperText id="password-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl><br />
                                <FormControl required>
                                    <InputLabel htmlFor="mobile_number">Contact No.</InputLabel>
                                    <Input id="mobile_number" value={mobile_number} onChange={inputChangedHandler} />
                                    <FormHelperText id="mobile_number-required" error className="required-error-text">Required</FormHelperText>
                                </FormControl>
                                <br /><br />
                                <label id="registration-success-message" style={{ display: 'none', color: '#000', opacity: "70%" }}>Registration Successful. Please Login!</label>
                                <br />
                                <Button id="formRegisterButton" variant="contained" color="primary" onClick={onFormRegisterClicked}>Register</Button>
                            </div>
                        )}
                    </div>

                </div>
            </Modal>

            <img src={logo} alt="Logo" className="logo"></img>
            <div className="header-buttons-div">
                <Link to={"/bookshow/" + props.id }><Button id="bookShowButton" variant="contained" color="primary">Book Show</Button></Link>
                <Button id="loginButton" variant="contained" onClick={onLoginClicked}>Login</Button>
                <Button id="logoutButton" variant="contained" onClick={onLogoutClicked}>Logout</Button>
            </div>
        </div>
    )
}

export default Header;