import React from 'react';
import "../styles/Login.css";
import { TextField } from "@mui/material";
import image from "../images/img1.png";

function Login() {
    return (
        <>
            <div className="loginPage">
                <div className="login-logo">
                    <img src={image} alt='' />
                </div>
                <form className="login-form">
                    <h2 className="title">Log In</h2>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <TextField type="text" label="Email" variant="standard" fullWidth />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <TextField type="password" label="Password" variant="standard" fullWidth />
                    </div>
                    <button type="submit" className="btns">Login</button>
                </form>
                <div className="footer1"><a href="/forgot-password" className="links">Forgot password?</a></div>
                <div className="footer">Don't have an account yet? <a className="links" href="/signup">Sign Up</a></div>
            </div>
        </>
    )
}

export default Login
