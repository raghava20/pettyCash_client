import React from 'react';
import "../styles/Login.css";
import { TextField } from "@mui/material"

function Login() {
    return (
        <>
            <div className="login">
                <div className="logo">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/biztory-wordpress-img/wp-content/uploads/2020/04/17220543/petty-cash-malaysia-300x300.png" alt='' />
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
                    <button type="submit" className="btn">Login</button>
                </form>
                <div className="footer1"><a href="/forgot-password">Forgot password?</a></div>
                <div className="footer">Don't have an account yet? <a href="/signup">Sign Up</a></div>
            </div>
        </>
    )
}

export default Login
