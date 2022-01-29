import React, { useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
import { PrintContext } from "../App"
import jwt from "jsonwebtoken"

export default function PrintDetails() {
    const [showModal, setShowModal] = useState(false)       //hook to handle add details modal
    const [companyName, setCompanyName] = useState("")      //hook to handle store company name
    const [address, setAddress] = useState("")              //hook to handle store address
    const [email, setEmail] = useState("")                  //hook to handle store email
    const [contact, setContact] = useState("")              //hook to handle store contact
    const [enableButton, setEnableButton] = useState(false) //hook to handle disable button on input

    let context = useContext(PrintContext)      //getting data from context api
    let navigate = useNavigate();               //for changing the route
    let refToken = useRef();                    //useRef hook - here using for storing token

    useEffect(() => {
        const localToken = localStorage.getItem('token');   //getting token from localStorage
        var decodedToken = jwt.decode(localToken);          //decode the token from localStorage
        if (decodedToken.exp * 1000 <= Date.now()) {        //check if token is expired or not
            navigate('/login');
        }
        else {
            refToken.current = localToken;          //store token in useRef hook to manipulate through request
            getDataFromDB();
        }
    }, [])

    // getting data from database
    const getDataFromDB = async () => {
        let { data: [{ companyName, address, email, contact }] } = await axios.get("http://localhost:3001/dashboard/print-details", {       //Destructured the data
            headers: {
                token: refToken.current     //passing token in header to process request
            }
        })
        setCompanyName(companyName)         //setting company name
        setAddress(address)                 //setting address
        setEmail(email)                     //setting email
        setContact(contact)                 //setting contact
        const dataToContext = () => {
            context.setData({
                companyName: companyName,
                address: address,
                email: email,
                contact: contact
            })
        }
        dataToContext();           //pushing current details to context api to share data with multiple components
    }

    // function will run after submit button is clicked
    const handleSave = async (e) => {
        e.preventDefault();                 //to prevent page reload of form's default behavior
        await axios.put("http://localhost:3001/dashboard/print-details",
            {
                companyName: companyName,
                address: address,
                email: email,
                contact: parseInt(contact)          //parsing the contact to a number
            },
            {
                headers: {
                    token: refToken.current         //store token in useRef hook to manipulate through request
                }
            })
        setEnableButton(true)               //once input gets added, trigger the disable attribute 
        setShowModal(false)                 //close print details modal
        navigate('/dashboard')              //after all done, changing route to dashboard
    }
    const handleReset = async (e) => {
        e.preventDefault()              //to prevent page reload of form's default behavior
        setEnableButton(false)          //triggered to enable the input to edit
        navigate('/dashboard')          //after all done, changing route to dashboard
    }

    return (
        <div className="printDetails__addDetails-btn">
            <Link to={"/dashboard/print-details"}>
                <Button size="sm" variant="outline-success" onClick={() => setShowModal(true)}>Add Details</Button>
            </Link>

            {/* for adding print details */}
            <Modal show={showModal} onHide={() => {
                navigate('/dashboard')
                setShowModal(false)
            }} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title >
                        Do you want to add print details?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body fluid="true">
                    <form className="dashboard-form">
                        <div >
                            <FloatingLabel className="dashboard-amount p-1 mb-1" label="Company Name">
                                <Form.Control className="dashboard-amount" type="text" name="company name" placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={enableButton} />
                            </FloatingLabel>
                        </div>
                        <div className="dashboard-middle">
                            <div >
                                <FloatingLabel className="dashboard-amount p-1 mb-1" label="Address">
                                    <Form.Control className="dashboard-amount" type="text" name="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} disabled={enableButton} />
                                </FloatingLabel>
                            </div>
                            <div >
                                <FloatingLabel className="p-1 mb-1" label="Email">
                                    <Form.Control className="dashboard-date" type="email" name="date" placeholder="Enter date" value={email} onChange={(e) => setEmail(e.target.value)} disabled={enableButton} />
                                </FloatingLabel>
                            </div>
                        </div>
                        <div >
                            <FloatingLabel className="dashboard-amount p-1 mb-1" label="Contact No.">
                                <Form.Control className="dashboard-amount" type="number" name="contact" placeholder="Enter contact" value={contact} onChange={(e) => setContact(e.target.value)} disabled={enableButton} />
                            </FloatingLabel>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button type="submit" variant="outline-primary" onClick={handleSave} size="sm">Submit</Button>
                            <Button type="submit" variant="outline-danger" onClick={handleReset} size="sm">Reset</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>

    )
}
