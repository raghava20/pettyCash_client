import React, { useEffect, useState, } from 'react';
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


export default function SideBar() {
    let [show, setShow] = useState()
    let [showAccModal, setShowAccModal] = useState(false)
    let [create, setCreate] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)

    let navigate = useNavigate()

    const handleClose = () => setShowAccModal(false);
    const handleSave = (input) => setShowAccModal(false);

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
        navigate("/dashboard")

    }, [])



    let toggleHandler = () => {
        //Menu toggle
        let navigation = document.querySelector(".sidebar__navigation");
        let header = document.querySelector(".sidebar__header");

        navigation.classList.toggle("active");
        header.classList.toggle("active");

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
                                <span className="sidebar__icons"> <img className="sidebar__logo" src={image} /></span>
                                <span className="sidebar__title">Petty Cash Manager</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/dashboard"} className="sidebar__links" onClick={() => setShow("dashboard")} >
                                <span className="sidebar__icons"><DashboardIcon /> </span>
                                <span className="sidebar__title">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/add-expenses"} className="sidebar__links" onClick={() => setShow("add-expenses")}>
                                <span className="sidebar__icons"><AddShoppingCartIcon /> </span>
                                <span className="sidebar__title">Add Expenses </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/expenses-list"} className="sidebar__links" onClick={() => setShow("list-expenses")}>
                                <span className="sidebar__icons"><ListAltIcon /></span>
                                <span className="sidebar__title">Expenses List</span>
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
                                <Button variant="primary" onClick={() => setModelOpen(false)}>
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
                    <div className="d-flex">
                        <Form.Select style={{ "max-width": '113px' }} size="sm" name="expensesCategory" >
                            <option value="">Accounts</option>
                            <option value="Conveyance">Conveyance Expenses</option>
                            {create ? (<Modal show={showAccModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Account</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FloatingLabel className="p-1 mb-1" label="Account Name">
                                        <Form.Control type="text" name="Account Name" placeholder="Enter amount" required />
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

                        <IconButton className="sidebar__image " onClick={createAccountHandler}><PersonAddAlt1Icon fontSize="medium" /></IconButton>

                    </div>
                </div>
                <>
                    {show === "dashboard" ? <Dashboard /> : ""}
                    {show === "add-expenses" ? <AddExpenses /> : ""}
                    {show === "list-expenses" ? <ExpensesList /> : ""}
                </>
            </div>

        </>
    )
}
