import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import "../styles/AddExpenses.css";
import { ErrorMessage } from "./Utils";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { format } from 'date-fns'
import jwt from "jsonwebtoken";

export default function AddExpenses() {
    let [open, setOpen] = useState(false)       //for handling alert box 
    let navigate = useNavigate();               //for changing the route
    let refToken = useRef();                    //useRef hook - here using for storing token

    useEffect(() => {
        const localToken = localStorage.getItem('token');  //getting token from localStorage
        var decodedToken = jwt.decode(localToken);         //decode the token from localStorage
        if (decodedToken.exp * 1000 <= Date.now()) {       //check if token is expired or not
            navigate('/login');
        }
        else {
            refToken.current = localToken;      //store token in useRef hook to manipulate through request
        }

    }, [])

    //Alert box will run once the request has finished
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //formik for handling form validation
    const formik = useFormik({
        initialValues: {
            expensesCategory: "",
            date: "",
            amount: "",
            description: ""
        },
        validationSchema: yup.object({
            expensesCategory: yup.string().required("Please select anyone of the following Expenses!"),
            date: yup.date().required("Please add date!"),
            amount: yup.number().min(1).required("Please enter amount!"),
            description: yup.string().required("Please add a description!")
        }),
        onSubmit: (values) => {
            handleSave(values)
            formik.resetForm();     //resetform function clear the values in the form after validation is passed
        }
    })

    let handleSave = async (data) => {
        await axios.post("http://localhost:3001/add-expenses", {
            expensesCategory: data.expensesCategory,
            date: format(new Date(data.date), 'MM/dd/yyyy'),        //formatting date using date-fns package
            amount: data.amount,
            description: data.description
        }, {
            headers: {
                token: refToken.current             //passing token in header to process request
            }
        })
        setOpen(true)       //trigger alert box
    }
    return (
        <div className="addExpensesPage">
            <div className="d-flex justify-content-between p-1 mb-3">
                <h1 className="addExpenses-title">Add Expenses</h1>
            </div>
            <form onSubmit={formik.handleSubmit} className="addExpenses-form">
                <div >
                    <FloatingLabel className="p-1 mb-1" label="Expenses Category" >
                        <Form.Select className="addExpenses-expensesCategory" name="expensesCategory" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.expensesCategory} >
                            <option value="">Select</option>
                            <option value="Conveyance">Conveyance Expenses</option>
                            <option value="Cartage">Cartage Expenses</option>
                            <option value="General Expenses">General Expenses</option>
                            <option value="Fuel">Fuel Expenses</option>
                            <option value="Food">Food Expenses</option>
                            <option value="Postage and Telegrams">Postage and Telegrams</option>
                            <option value="Shop Maintenance">Shop Maintenance</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Wages">Wages</option>
                        </Form.Select>
                    </FloatingLabel>
                    {formik.touched.expensesCategory && formik.errors.expensesCategory ? <ErrorMessage>{formik.errors.expensesCategory}</ErrorMessage> : null}
                </div>

                <div className="addExpenses-middle">
                    <div >
                        <FloatingLabel className="addExpenses-amount p-1 mb-1" label="Amount(Rs.)">
                            <Form.Control className="addExpenses-amount" type="number" name="amount" placeholder="Enter amount" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} />
                        </FloatingLabel>
                        {formik.touched.amount && formik.errors.amount ? <ErrorMessage>{formik.errors.amount}</ErrorMessage> : null}
                    </div>

                    <div >
                        <FloatingLabel className="p-1 mb-1" label="Date">
                            <Form.Control className="addExpenses-date" type="date" name="date" placeholder="Enter amount" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} />
                        </FloatingLabel>
                        {formik.touched.date && formik.errors.date ? <ErrorMessage>{formik.errors.date}</ErrorMessage> : null}
                    </div>
                </div>
                <FloatingLabel className="p-1 mb-1" label="Description" >
                    <Form.Control className="addExpenses-description" name="description" as="textarea" placeholder="Leave a comment here" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description} />
                </FloatingLabel>
                {formik.touched.description && formik.errors.description ? <ErrorMessage>{formik.errors.description}</ErrorMessage> : null}

                <button type="submit" onClick={handleSave} className="btn btn-primary addExpensesBtn addExpenses-submit" >Submit</button>

                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} key={{ vertical: "top", horizontal: "right" }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Added Expenses!
                    </Alert>
                </Snackbar>
            </form>

        </div >
    )
}
