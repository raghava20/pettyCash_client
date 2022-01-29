import React, { useState, useEffect, useRef } from 'react';
import "../styles/Dashboard.css";
import { format } from 'date-fns';
import { ProgressBar, Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { currencyFormatter } from './Utils';
import axios from 'axios';
import { IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import { useFormik } from "formik";
import * as yup from "yup";
import { ErrorMessage } from "./Utils";
import { useNavigate } from 'react-router-dom';
import jwt from "jsonwebtoken";

export default function Dashboard() {
    const [month, setMonth] = useState("")
    const [updateAmt, setUpdateAmt] = useState("")
    const [getVariant, setGetVariant] = useState("")
    const [changeColor, setChangeColor] = useState("")
    const [removeModalOpen, setremoveModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [creditModalOpen, setCreditModalOpen] = useState(false)
    let [getValuesFromInputModal, setValuesFromInputModal] = useState("")
    const [dbAddValue, setDbAddValue] = useState("")

    let navigate = useNavigate();
    let refToken = useRef();

    useEffect(() => {
        const localToken = localStorage.getItem('token');

        var decodedToken = jwt.decode(localToken);
        if (decodedToken.exp * 1000 <= Date.now()) {
            navigate('/login');
        }
        else {
            console.log("dahsboard token", localToken);
            refToken.current = localToken;
            console.log("useref", refToken.current)
            getDataFromDB()
            setMonth(getMonth())
        }

    }, [])
    //displaying the month on total expenses card
    let getMonth = () => {
        var date = new Date();
        var month = date.getMonth()
        return new Intl.DateTimeFormat('usd', { month: "long" }).format(month)
    }

    const formik = useFormik({
        initialValues: {
            bankName: "",
            accountNumber: "",
            date: "",
            amount: "",
        },
        validationSchema: yup.object({
            bankName: yup.string().required("Please add bank name!"),
            accountNumber: yup.number().test('len', 'Enter a valid bank Account Number!', (val) => { if (val) return val.toString().length >= 6; }).required("Please add account number!"),
            date: yup.date().required("Please add date!"),
            amount: yup.number().min(1).required("Please enter amount!")
        }),
        onSubmit: (values) => {
            handleSave(values)
            console.log(values)
            formik.resetForm();
        }
    })

    const handleSave = async (data) => {
        console.log(data)
        let addUserData = await axios.post("http://localhost:3001/transferred-amount", {
            bankName: data.bankName,
            accountNumber: data.accountNumber,
            date: format(new Date(data.date), 'dd/MM/yyyy'),
            // date: (moment(data.date, "dd/MM/yyyy").format("LT")),
            amount: data.amount,
        }, {
            // headers: {
            //     token: tokenHandler
            // }
        })
        console.log(addUserData)
        console.log(addUserData.data)

        setCreditModalOpen(false)
    }

    //getting data from db by adding amount from add amount button
    let getDataFromDB = async () => {
        let data = await axios.get("http://localhost:3001/expenses-list", {
            headers: {
                token: refToken.current
            }
        })
        console.log(data.data)
        addingTotalAmt(data.data)
    }
    //filtering data per month
    let addingTotalAmt = (item) => {
        console.log("Adding is working")
        let data = item;
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        data = data.filter(item => {
            let value = Date.parse(item.createdAt)
            return value >= new Date(firstDay).getTime() && value <= new Date(lastDay).getTime()
        })
        if (!data) {
            getProgressBarVariant(0)
            changeBgColor(0)
            return 0
        };
        let result = data.map(item => item.amount).reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        }, 0)
        setUpdateAmt(result)
        getAmtFromDB(result)
        console.log("updateamout working?", result);
    }
    const resetAmtHandler = async () => {
        let data = await axios.delete("http://localhost:3001/dashboard", {
            headers: {
                token: refToken.current
            }
        })
        console.log(data)
        getAmtFromDB();

    }
    const addAmtHandler = async () => {
        setAddModalOpen(false)
        let data = await axios.post("http://localhost:3001/dashboard", { amount: getValuesFromInputModal }, {
            headers: {
                token: refToken.current
            }
        })
        console.log(data)
        setValuesFromInputModal("")
        getAmtFromDB()
    }
    const getAmtFromDB = async (amount) => {
        let data = await axios.get("http://localhost:3001/dashboard", {
            headers: {
                token: refToken.current
            }
        })
        let result = await data.data.map(data => data.amount).reduce((prev, cur) => {
            return prev + cur
        }, 0)
        setDbAddValue(result)
        console.log("zero", result)
        console.log("check for first come", dbAddValue)
        getProgressBarVariant(amount, result)
        changeBgColor(amount, result)
    }
    //for changing card color by comparing total expenses / total amount added
    let getProgressBarVariant = (amount, result) => {
        console.log(" variant is working")
        if (!updateAmt || !dbAddValue) {
            let ratio = amount / result;
            console.log("ratio of the value", ratio);
            if (ratio < 0.5) return setGetVariant("primary")
            if (ratio < 0.75) return setGetVariant("warning")
            return setGetVariant("danger")
        }
        var ratio = updateAmt / dbAddValue;
        console.log("updateamtuuu", updateAmt)
        console.log("resutuuu", result)
        console.log("ratio of the value", ratio);

        if (ratio < 0.5) return setGetVariant("primary")
        if (ratio < 0.75) return setGetVariant("warning")
        return setGetVariant("danger")
    }
    //changing background color for total expenses card
    let changeBgColor = (amount, result) => {
        console.log("change colr is working?")
        if (!dbAddValue) {
            if (amount < result) return setChangeColor("")
            if (amount > result) return setChangeColor("bg-danger bg-opacity-10")
        }
        if (updateAmt < dbAddValue) {
            setChangeColor("")
        }
        else if (updateAmt > dbAddValue) {
            console.log("color change")
            setChangeColor("bg-danger bg-opacity-10")
            console.log(changeColor)
        }
    }

    return (
        <div className="dashboardPage">
            <Container fluid>
                <Row className="mt-2 justify-content-around overflow-auto" >
                    <Col className="d-flex justify-content-center gap-2 mb-2 " xl={6} lg="auto" md="auto" >
                        <Card className={`dashboard__card ${changeColor}`} style={{ "width": "26rem" }} >
                            <Card.Body>
                                <Card.Title class="d-flex justify-content-between align-items-baseline fw-normal mb-4">
                                    <div className="fw-bold me-2 p-2">
                                        Total Expenses
                                    </div>

                                    <div className="p-2">
                                        ₹{currencyFormatter.format(updateAmt)}
                                        <span className="text-muted "> / ₹{currencyFormatter.format(dbAddValue)}</span>
                                    </div>
                                </Card.Title>

                                <ProgressBar min={0} max={dbAddValue} now={updateAmt} variant={getVariant} className="rounded-pill" />

                                <div className="dashboard__addAmt">
                                    <span className="text-muted fw-normal fs-10 ms-1">{month}</span>
                                    <div>
                                        <Button variant="outline-primary" onClick={() => setAddModalOpen(true)} size="sm">Add Amount</Button>
                                        <Button className="ms-2" variant="outline-danger" size="sm" onClick={() => setremoveModalOpen(true)}>Reset</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col className="d-flex justify-content-center gap-2 mb-2" xl={4} lg="auto" md="auto">
                        <Card className="dashboard__card" style={{ "width": "18rem" }} >
                            <Card.Body>
                                <Card.Title class="d-flex justify-content-between align-items-baseline fw-normal mb-4">
                                    <div className="fw-bold me-2 p-2"></div>
                                    <Button variant="outline-primary" onClick={creditAmountHandler} size="sm">Add Amount</Button>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col className="d-flex justify-content-center align-items-start gap-2 mb-2" xl={4} lg="auto" md="auto">
                        <Card className="dashboard__card" style={{ "width": "26rem" }}>
                            <Card.Body>
                                <Card.Title class="d-flex justify-content-between align-items-baseline fw-normal mb-4">
                                    <div className="fw-bold me-2 p-2">Credit Amount</div>
                                    <Button variant="outline-primary" onClick={() => setCreditModalOpen(true)} size="sm">Add Amount</Button>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >

            {/* for resetting amount in dashboard */}

            <Modal show={removeModalOpen} onHide={() => setremoveModalOpen(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        Do you want to delete amount?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body fluid>
                    <div class="d-flex justify-content-between align-items-baseline ms-2 me-2">
                        <div>Total credit =</div>
                        <div>
                            ₹{currencyFormatter.format(dbAddValue)}
                            <span>
                                <IconButton className="dashboard__deleteBtn ms-3" onClick={resetAmtHandler}>
                                    <RestartAltIcon />
                                </IconButton>
                            </span>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={() => setremoveModalOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={addModalOpen} onHide={() => setAddModalOpen(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        Do you want to Add amount?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body fluid>
                    <div class="d-flex justify-content-between align-items-baseline ms-2 me-2">
                        <div>Add amount =</div>
                        <div>₹ <input type="number" placeholder="Enter credit" onChange={(e) => setValuesFromInputModal(e.target.value)} /></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={addAmtHandler}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={creditModalOpen} onHide={() => setCreditModalOpen(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        Do you want to Credit amount?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body fluid="true">
                    <form onSubmit={formik.handleSubmit} className="dashboard-form">
                        <div >
                            <FloatingLabel className="dashboard-amount p-1 mb-1" label="Bank Name">
                                <Form.Control className="dashboard-amount" type="text" name="bankName" placeholder="Enter Bank Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.bankName} />
                            </FloatingLabel>

                            {formik.touched.bankName && formik.errors.bankName ? <ErrorMessage>{formik.errors.bankName}</ErrorMessage> : null}
                        </div>

                        <div className="dashboard-middle">
                            <div >
                                <FloatingLabel className="dashboard-amount p-1 mb-1" label="Account No.">
                                    <Form.Control className="dashboard-amount" type="number" name="accountNumber" placeholder="Enter account number" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.accountNumber} />
                                </FloatingLabel>

                                {formik.touched.accountNumber && formik.errors.accountNumber ? <ErrorMessage>{formik.errors.accountNumber}</ErrorMessage> : null}
                            </div>

                            <div >
                                <FloatingLabel className="p-1 mb-1" label="Date">
                                    <Form.Control className="dashboard-date" type="date" name="date" placeholder="Enter date" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} />
                                </FloatingLabel>

                                {formik.touched.date && formik.errors.date ? <ErrorMessage>{formik.errors.date}</ErrorMessage> : null}
                            </div>
                        </div>
                        <div >
                            <FloatingLabel className="dashboard-amount p-1 mb-1" label="Amount(Rs.)">
                                <Form.Control className="dashboard-amount" type="number" name="amount" placeholder="Enter amount" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} />
                            </FloatingLabel>

                            {formik.touched.amount && formik.errors.amount ? <ErrorMessage>{formik.errors.amount}</ErrorMessage> : null}
                        </div>
                        <div>
                            <button type="submit" onClick={handleSave} className="btn btn-primary" >Submit</button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>
        </div >
    )
}
