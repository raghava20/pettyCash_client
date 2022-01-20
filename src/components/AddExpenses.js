import React, { useState } from 'react'
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

export default function AddExpenses() {
    let [open, setOpen] = useState(false)
    let [expensesCategory, setExpensesCategory] = useState()
    let [date, setDate] = useState()
    let [description, setDescription] = useState()
    let [amount, setAmount] = useState()

    //Alert box
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            // invoiceNumber: "",
            expensesCategory: "",
            date: "",
            amount: "",
            description: ""
        },
        validationSchema: yup.object({
            // invoiceNumber: yup.string().required("Please enter Invoice no."),
            expensesCategory: yup.string().required("Please select anyone of the following Expenses!"),
            date: yup.date().required("Please add date!"),
            amount: yup.number().min(1).required("Please enter amount!"),
            description: yup.string().required("Please add a description!")
        }),
        onSubmit: values => {
            handleSave(values)
            setOpen(true)
            setExpensesCategory("")
            setDescription("")
            setAmount("")
            setDate("")
        }
    })
    let handleSave = async (data) => {
        let addUserData = await axios.post("http://localhost:3001/add-expenses", data)
        console.log(addUserData)
        console.log(addUserData.data)
    }
    return (
        <div className="addExpensesPage">
            <div className="d-flex justify-content-between p-1 mb-3">
                <h1 className="addExpenses-title">Add Expenses</h1>
                {/* <span>
                    <button class="btn btn-outline-dark" type="button" >
                        <BorderColorIcon /> Total Exp
                        <span class="badge bg-dark text-white ms-1 rounded-pill">amt</span>
                    </button>
                </span> */}
            </div>
            <div></div>
            <form onSubmit={formik.handleSubmit} className="addExpenses-form">

                {/* <FloatingLabel className="p-1 mb-1" label="Invoice Number">
                    <Form.Control style={{ "max-width": '600px' }} type="text" name="invoiceNumber" placeholder="Enter Invoice no." onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.invoiceNumber} />
                </FloatingLabel>
                {formik.touched.invoiceNumber && formik.errors.invoiceNumber ? (<div style={{ color: "#dd1818" }}>{formik.errors.invoiceNumber}</div>) : null} */}
                <div >
                    <FloatingLabel className="p-1 mb-1" label="Expenses Category" >
                        <Form.Select className="addExpenses-expensesCategory" name="expensesCategory" onBlur={formik.handleBlur} onChange={formik.handleChange} value={expensesCategory} >
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
                            <Form.Control className="addExpenses-amount" type="number" name="amount" placeholder="Enter amount" onBlur={formik.handleBlur} onChange={formik.handleChange} value={amount} />
                        </FloatingLabel>

                        {formik.touched.amount && formik.errors.amount ? <ErrorMessage>{formik.errors.amount}</ErrorMessage> : null}
                    </div>

                    <div >
                        <FloatingLabel className="p-1 mb-1" label="Date">
                            <Form.Control className="addExpenses-date" type="date" name="date" placeholder="Enter amount" onBlur={formik.handleBlur} onChange={formik.handleChange} value={date} />
                        </FloatingLabel>

                        {formik.touched.date && formik.errors.date ? <ErrorMessage>{formik.errors.date}</ErrorMessage> : null}
                    </div>
                </div>
                <FloatingLabel className="p-1 mb-1" label="Description" >
                    <Form.Control className="addExpenses-description" name="description" as="textarea" placeholder="Leave a comment here" onBlur={formik.handleBlur} onChange={formik.handleChange} value={description} />
                </FloatingLabel>
                {formik.touched.description && formik.errors.description ? <ErrorMessage>{formik.errors.description}</ErrorMessage> : null}

                <button type="submit" onClick={handleSave} className="btn btn-primary addExpensesBtn addExpenses-submit" >Submit</button>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} key={"top" + "right"}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Added Expenses!
                    </Alert>
                </Snackbar>
            </form>

        </div>
    )
}
