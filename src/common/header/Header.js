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

function Header() {

    const [open, setOpen] = React.useState(false);
    const [tabvalue, setTabValue] = React.useState(0);

    const onLoginClicked = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    }

    return (
        <div className="header">
            <Modal 
                open={open} 
                onClose={handleModalClose}
                >
                <div className="modal-div">
                    <Tabs value={tabvalue} onChange={handleTabChange}>
                        <Tab label="LOGIN" />
                        <Tab label="REGISTER"/>
                    </Tabs>
                    <div>
                        {tabvalue === 0 && (
                            <div className="form-div">
                                <FormControl>
                                    <InputLabel htmlFor="loginUsername">Username *</InputLabel>
                                    <Input id="loginUsername" />
                                </FormControl><br></br>
                                <FormControl>
                                    <InputLabel htmlFor="loginPassword">Password *</InputLabel>
                                    <Input id="loginPassword" />
                                </FormControl><br/><br/>
                                <Button id="formLoginButton" variant="contained" color="primary">Login</Button>
                            </div>
                            
                        )}
                        {tabvalue === 1 && (
                            <div className="form-div">
                                <FormControl>
                                    <InputLabel htmlFor="registerFirstName">First Name *</InputLabel>
                                    <Input id="registerFirstName" />
                                </FormControl><br/>
                                <FormControl>
                                    <InputLabel htmlFor="registerLastName">Last Name *</InputLabel>
                                    <Input id="registerLastName" />
                                </FormControl><br/>
                                <FormControl>
                                    <InputLabel htmlFor="registerEmail">Email *</InputLabel>
                                    <Input id="registerEmail" />
                                </FormControl><br/>
                                <FormControl>
                                    <InputLabel htmlFor="registerPassword">Password *</InputLabel>
                                    <Input id="registerPassword" />
                                </FormControl><br />
                                <FormControl>
                                    <InputLabel htmlFor="registerContactNo">Contact No. *</InputLabel>
                                    <Input id="registerContactNo" />
                                </FormControl>
                                <br/><br/>
                                <label style={{display: 'none'}}>Registration Successful. Please Login!</label>
                                <br/>
                                <Button id="formRegisterButton" variant="contained" color="primary">Register</Button>
                            </div>
                        )}
                    </div>
                
                </div>
            </Modal>

            <img src={logo} alt="Logo" className="logo"></img>
            <div className="header-buttons-div">
                <Button id="bookShowButton" variant="contained" color="primary">Book Show</Button>
                <Button id="loginButton" variant="contained" onClick={onLoginClicked}>Login</Button>
                <Button id="logoutButton" variant="contained">Logout</Button>
            </div>
        </div>
    )
}

export default Header;