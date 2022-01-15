import React from 'react';
import "../styles/SignUp.css"
import { TextField } from "@mui/material"

function SignUp() {
    return (
        <>
            <div className="signup">
                <div className="logo">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/biztory-wordpress-img/wp-content/uploads/2020/04/17220543/petty-cash-malaysia-300x300.png" alt='' />
                </div>
                <form className="signup-form">
                    <h2 className="title">Sign In</h2>
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
