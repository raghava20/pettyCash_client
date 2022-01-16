import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/SideBar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import image from "../images/img1.png"
import Dashboard from './Dashboard';
import AddExpenses from './AddExpenses';
import ListOfExpenses from './ListOfExpenses';

export default function SideBar() {
    let [show, setShow] = useState()

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

        // setShow()
    })



    let toggleHandler = () => {
        //Menu toggle
        let navigation = document.querySelector(".sidebar__navigation");
        let header = document.querySelector(".sidebar__header");

        navigation.classList.toggle("active");
        header.classList.toggle("active");

    }


    return (
        <>
            <div className="sidebar">
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
                            <Link to={"/list-expenses"} className="sidebar__links" onClick={() => setShow("list-expenses")}>
                                <span className="sidebar__icons"><ListAltIcon /></span>
                                <span className="sidebar__title">List Of Expenses </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"} className="sidebar__links">
                                <span className="sidebar__icons"><LogoutIcon /></span>
                                <span className="sidebar__title">Log Out </span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="sidebar__header">
                <div className="sidebar__topbox">
                    <div className="sidebar__toggle" onClick={toggleHandler}>
                        <MenuIcon fontSize="large" />
                    </div>
                    <div className="sidebar__image">
                        <IconButton><PersonIcon fontSize="medium" /></IconButton>
                    </div>
                </div>
                <>
                    {show === "dashboard" ? <Dashboard /> : ""}
                    {show === "add-expenses" ? <AddExpenses /> : ""}
                    {show === "list-expenses" ? <ListOfExpenses /> : ""}
                </>
            </div>

        </>
    )
}
