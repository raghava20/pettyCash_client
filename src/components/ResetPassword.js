import React from 'react'
import "../styles/ResetPassword.css"
import { TextField } from "@mui/material"

export default function ResetPassword() {
    return (
        <>
            <div className="resetpassword">
                <div className="logo">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/biztory-wordpress-img/wp-content/uploads/2020/04/17220543/petty-cash-malaysia-300x300.png" alt='' />
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
