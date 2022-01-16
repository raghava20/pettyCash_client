import React from 'react'
import "../styles/ResetPassword.css"
import { TextField } from "@mui/material";
import image from "../images/img1.png";

export default function ResetPassword() {
    return (
        <>
            <div className="resetpassword">
                <div className="resetpassword-logo">
                    <img src={image} alt='' />
                </div>
                <form className="resetpassword-form">
                    <h2 className="title">Reset Your Password</h2>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <TextField type="Password" label="New Password" variant="standard" fullWidth />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <TextField type="password" label="Confirm Your Password" variant="standard" fullWidth />
                    </div>
                    <button type="submit" className="btn">Save Changes</button>
                </form>

            </div>
        </>
    )
}
