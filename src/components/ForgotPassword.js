import React from 'react'
import "../styles/ForgotPassword.css";
import { TextField } from "@mui/material"

export default function ForgotPassword() {
    return (
        <>
            <div className="forgotpassword">
                <div className="logo">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/biztory-wordpress-img/wp-content/uploads/2020/04/17220543/petty-cash-malaysia-300x300.png" alt='' />
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
