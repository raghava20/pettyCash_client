import React from 'react';
import "../styles/SignUp.css"
import { TextField } from "@mui/material";
import image from "../images/img1.png";

function SignUp() {
    return (
        <>
            <div className="signup">
                <div className="signup-logo">
                    <img src={image} alt='' />
                </div>
                <form className="signup-form">
                    <h2 className="title">Sign Up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <TextField type="text" label="Name" variant="standard" fullWidth />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <TextField type="text" label="Email" variant="standard" fullWidth />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <TextField type="text" label="Password" variant="standard" fullWidth />

                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <TextField type="text" label="Confirm Password" variant="standard" fullWidth />

                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                <div className="footer">Already have an account? <a href='/'>Sign In</a></div>
            </div>
        </>
    )
}

export default SignUp
