import React, { useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
import { PrintContext } from "../App"
import jwt from "jsonwebtoken"

export default function PrintDetails() {
    const [showModal, setShowModal] = useState(false)
    const [companyName, setCompanyName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [enableButton, setEnableButton] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        var decodedToken = jwt.decode(localToken);
        if (decodedToken.exp * 1000 <= Date.now()) {
            console.log("print logout")
            navigate('/login');
        }
        else {
            refToken.current = localToken;
            console.log("local token", localToken)
            getDataFromDB();
        }

    }, [])

    let context = useContext(PrintContext)
    let navigate = useNavigate();
    let refToken = useRef();

    const getDataFromDB = async () => {
        let { data: [{ companyName, address, email, contact }] } = await axios.get("http://localhost:3001/dashboard/print-details", {
            headers: {
                token: refToken.current
            }
        })
        console.log(data)
        setCompanyName(companyName)
        setAddress(address)
        setEmail(email)
        setContact(contact)
        console.log(companyName, email, contact, address)
        const dataToContext = () => {
            context.setData({
                companyName: companyName,
                address: address,
                email: email,
                contact: contact
            })
        }
        dataToContext();
    }


    const handleSave = async (e) => {
        e.preventDefault();
        let dbData = await axios.put("http://localhost:3001/dashboard/print-details",
            {
                companyName: companyName,
                address: address,
                email: email,
                contact: parseInt(contact)
            },
            {
                headers: {
                    token: refToken.current
                }
            })
        setEnableButton(true)
        console.log(dbData.data)
        setShowModal(false)
        setData(dbData.data)
        navigate('/dashboard')
    }
    const handleReset = async (e) => {
        e.preventDefault()
        setEnableButton(false)
        navigate('/dashboard')
    }

    return (

        <div className="printDetails__addDetails-btn">
            <Link to={"/dashboard/print-details"}>
                <Button size="sm" variant="outline-success" onClick={() => setShowModal(true)}>Add Details</Button>
            </Link>
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
