import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/SideBar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import IconButton from '@mui/material/IconButton';
import image from "../images/img1.png"
import Dashboard from './Dashboard';
import AddExpenses from './AddExpenses';
import ExpensesList from './ExpensesList';
import Form from 'react-bootstrap/Form'
import { Modal, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from "axios";
import TransferredAmount from './TransferredAmount';
import PaidIcon from '@mui/icons-material/Paid';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PrintDetails from "./PrintDetails"
import { PrintContext } from "../App"

export default function SideBar() {
    let [show, setShow] = useState()
    let [showAccModal, setShowAccModal] = useState(false)
    let [create, setCreate] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)
    let [getAccountName, setAccountName] = useState("")
    const [value, setValue] = useState([null, null]);


    let navigate = useNavigate();
    let context = useContext(PrintContext)
    const handleClose = () => setShowAccModal(false);
    const handleSave = async () => {
        let tempValues = getAccountName;
        setShowAccModal(false);
        console.log(tempValues);
        return await axios.post("http://localhost:3001/dashboard", {
            accountName: tempValues
        })
    }
    useEffect(() => {
        //hovering effect on the links
        let list = document.querySelectorAll(".sidebar__navigation li");
        function activeLink() {
            list.forEach((item) => {
                item.classList.remove("hovered");
                this.classList.add("hovered");
            })
        }
        list.forEach(item => {
            item.addEventListener("mouseover", activeLink)
        })

        setShow("dashboard")
        console.log(context)
        console.log(context.companyName)
        // navigate("/dashboard")

    }, [])


    let navigation = document.querySelector(".sidebar__navigation");
    let header = document.querySelector(".sidebar__header");

    let toggleHandler = () => {
        //Menu toggle

        navigation.classList.toggle("active");
        header.classList.toggle("active");
        navigation.classList.remove("mbScreen")
        header.classList.remove("mbScreen")
        navigation.classList.toggle("tabScreen")
        header.classList.toggle("tabScreen")

    }
    let mobileScreenHandler = () => {
        navigation.classList.toggle("mbScreen");
        header.classList.toggle("mbScreen");
        navigation.classList.remove("active");
        header.classList.remove("active");
        navigation.classList.remove("tabScreen")
        header.classList.remove("tabScreen")
    }
    let createAccountHandler = () => {
        setCreate(true)
        setShowAccModal(true)
    }

    return (
        <>
            <div className="sidebarPage">
                <div className="sidebar__navigation">

                    <ul>
                        <li>
                            <Link to={"#"} className="sidebar__links">
                                <span className="sidebar__icons"> <img className="sidebar__logo" src={image} alt="logo" /></span>
                                <span className="sidebar__title">Petty Cash Manager</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/dashboard"} className="sidebar__links" onClick={() => {
                                setShow("dashboard")
                                return mobileScreenHandler()
                            }} >
                                <span className="sidebar__icons"><DashboardIcon /> </span>
                                <span className="sidebar__title">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/add-expenses"} className="sidebar__links" onClick={() => {
                                setShow("add-expenses")
                                return mobileScreenHandler()
                            }}>
                                <span className="sidebar__icons"><AddShoppingCartIcon /> </span>
                                <span className="sidebar__title">Add Expenses </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/expenses-list"} className="sidebar__links" onClick={() => {
                                setShow("expenses-list")
                                setValue([null, null])
                                return mobileScreenHandler()
                            }}>
                                <span className="sidebar__icons"><ListAltIcon /></span>
                                <span className="sidebar__title">Expenses List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/transferred-amount"} className="sidebar__links" onClick={() => {
                                setShow("transferred-amount")
                                setValue([null, null])
                                return mobileScreenHandler()
                            }}>
                                <span className="sidebar__icons"><PaidIcon /></span>
                                <span className="sidebar__title">Transferred Amount</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"} onClick={() => setModelOpen(true)} className="sidebar__links">
                                <span className="sidebar__icons"><LogoutIcon /></span>
                                <span className="sidebar__title">Log Out </span>

                            </Link>
                        </li>

                        {/* LogOut Page */}
                        <Modal show={modelOpen} onHide={() => setModelOpen(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>LOG OUT</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Do you want to Log Out?

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModelOpen(false)} >
                                    NO
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate("/login")
                                }}>
                                    YES
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </ul>
                </div>
            </div>
            <div className="sidebar__header">
                <div className="sidebar__topbox">
                    <div className="sidebar__toggle" onClick={toggleHandler}>
                        <MenuIcon fontSize="large" />
                    </div>
                    <div className="sidebar__toggle2" >
                        {show === "dashboard" ? <PrintDetails /> : ""}
                    </div>

                    {show === "transferred-amount" || show === "expenses-list" ?
                        <div className="date-range-picker me-4">

                            <LocalizationProvider size="sm" dateAdapter={AdapterDateFns}>
                                <Stack size="sm">
                                    <DateRangePicker size="sm" value={value} onChange={newvalue => setValue(newvalue)} renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} size="sm" />
                                            <TextField {...endProps} className="ms-1" size="sm" />
                                        </React.Fragment>
                                    )} />
                                </Stack>
                            </LocalizationProvider>
                        </div> : ""}
                    {/* <div className="d-flex">
                        <Form.Select style={{ "max-width": '113px' }} size="sm" name="expensesCategory" >
                            <option value="">Accounts</option>


                            {create ? (<Modal show={showAccModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Account</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FloatingLabel className="p-1 mb-1" label="Account Name">
                                        <Form.Control type="text" name="Account Name" placeholder="Enter amount" required onChange={(e) => setAccountName(e.target.value)} />
                                    </FloatingLabel>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>) : null}
                        </Form.Select>

                        <IconButton className="sidebar__image " onClick={createAccountHandler}>
                            <PersonAddAlt1Icon fontSize="medium" />
                        </IconButton>

                    </div> */}
                </div >
                {/* Printing the company details */}
                <div className="sidebar__printDetails">
                    <h6>{context.data.companyName}</h6>
                    <p>Address: {context.data.address}</p>
                    <p>Email: {context.data.email}</p>
                    <p>Contact No: {context.data.contact}</p>
                </div>
                <>
                    {show === "dashboard" ? <Dashboard /> : ""}
                    {show === "add-expenses" ? <AddExpenses /> : ""}
                    {show === "expenses-list" ? <ExpensesList value={value} /> : ""}
                    {show === "transferred-amount" ? <TransferredAmount value={value} /> : ""}
                </>
            </div>

        </>
    )
}
