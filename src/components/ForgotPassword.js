import React from 'react'
import "../styles/ForgotPassword.css";
import { TextField } from "@mui/material";
import image from "../images/img1.png";

export default function ForgotPassword() {
    return (
        <>
            <div className="forgotpassword">
                <div className="forgotpassword-logo">
                    <img src={image} alt='' />
                </div>
                <form className="forgotpassword-form">
                    <h2 className="title">Forgot Password</h2>
                    <p>Please enter your email address and we'll send you a link to reset your password!</p>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <TextField type="text" label="Email" variant="standard" fullWidth />
                    </div>
                    <button type="submit" className="btn">Send Link</button>
                </form>
            </div>
        </>
    )
}
