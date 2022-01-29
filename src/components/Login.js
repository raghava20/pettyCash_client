import React, { useState } from 'react';
import "../styles/Login.css";
import { TextField } from "@mui/material";
import image from "../images/img1.png";
import { useFormik } from "formik";
import { ErrorMessage } from "./Utils";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from "./GlobalConstant"

function Login() {
    let navigate = useNavigate();               //for changing the route
    const [error, setError] = useState(null)      //hook to display error message from the server

    const validateForm = (values) => {
        const errors = {};                      //setting errors initially with empty object
        if (values.email.length < 3) {
            errors.email = "Please provide a valid email!"
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid Email address";
        }
        if (values.password.length < 1) {
            errors.password = "Please provide a password!"
        }
        else if (values.password.length < 6) {
            errors.password = "Invalid Password!"
        }
        if (values.password.length > 18) {
            errors.password = "Password is too long!";
        }
        return errors;              //return errors if any of the errors are triggered
    }

    // function will run after validation get passed
    const onSubmit = async (values) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: values.email,
                password: values.password
            })
            setError(response.message)          //setting the error message from the database
            if (response.data) {
                await localStorage.setItem('token', response.data);         //storing the token in localStorage
                navigate('/dashboard')                                      //if data is available it will navigate to dashboard
            }
        }
        catch (error) {
            console.warn(error)             //instead of logging the error we just warn the user on console
        }
    }

    // formik for handling form validation
    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = useFormik({  //Destructured the formik attribute
        initialValues: { email: '', password: '' },
        validate: validateForm,
        onSubmit,

    });

    return (
        <>
            <div className="loginPage">
                <div className="login-logo">
                    <img src={image} alt='Logo' />
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="title">Log In</h2>
                    <div className="error__message">{error ? (<ErrorMessage>{error}</ErrorMessage>) : ""}</div>

                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <TextField type="text" label="Email" name="email" variant="standard" size="sm" fullWidth value={values.email} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                    <div className="error__message"><ErrorMessage>{errors.email && touched.email && errors.email}</ErrorMessage></div>

                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <TextField type="password" label="Password" name="password" variant="standard" fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                    <div className="error__message"><ErrorMessage>{errors.password && touched.password && errors.password}</ErrorMessage></div>

                    <button type="submit" className="btns" >Login</button>
                </form>

                <div className="footer1">
                    <Link to="/forgot-password" className="links">Forgot password?</Link>
                </div>
                <div className="footer">
                    Don't have an account yet? <Link to="/signup" className="links">Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default Login
