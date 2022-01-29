import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import "../styles/ExpensesList.css"
import axios from "axios";
import { IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import jwt from "jsonwebtoken";

export default function TransferredAmount({ value }) {
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState("");

    let navigate = useNavigate();
    let refToken = useRef();

    useEffect(() => {
        const localToken = localStorage.getItem('token');

        var decodedToken = jwt.decode(localToken);
        if (decodedToken.exp * 1000 <= Date.now()) {
            navigate('/login');
        }
        else {
            refToken.current = localToken;
            getData();
        }

    }, [])

    let getData = async () => {
        let data = await axios.get("http://localhost:3001/transferred-amount", {
            headers: {
                token: refToken.current
            }
        })
        console.log(data)
        setData(data.data);
        addingAmount(data.data)
    }
    let addingAmount = async (item) => {
        console.log("Adding is working")
        let data = item;
        let result = await data.map(item => item.amount).reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        })
        if (result === 0 || isNaN(result) || result === null) return setTotalAmount(0)
        return setTotalAmount(result)
    }

    let dateRangePicker = async () => {
        let formatDate1 = new Date(value[0]).getTime()
        let formatDate2 = new Date(value[1]).getTime()
        if (!formatDate1 || !formatDate2) return
        let dbData = await axios.get("http://localhost:3001/transferred-amount", {
            headers: {
                token: refToken.current
            }
        })
        let dates = dbData.data;
        let result = dates.filter(data => {
            let value = new Date(data.date).getTime()
            console.log(value)
            return value >= formatDate1 && value <= formatDate2;
        })
        setData(result)
        let amount = result.map(item => item.amount).reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        })
        setTotalAmount(amount)

    }

    return (
        <div>
            <div className="expensesList-date-picker-btn">
                <IconButton className="expensesList-dp-btn" onClick={() => dateRangePicker()}>
                    <CheckCircleOutlineIcon />
                </IconButton>
            </div>
            <div className="expensesListPage">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Amount(Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => {
                            return <tr>
                                <td>{key + 1}</td>
                                <td >{item.date}</td>
                                <td>{item.bankName}</td>
                                <td>{item.accountNumber}</td>
                                <td>{item.amount}</td>
                                {/* <td className="text-center">
                                    <IconButton className="expensesList__delButton" onClick={() => handleShow(item)}>
                                        <CloseIcon />
                                    </IconButton>
                                </td> */}
                            </tr>
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-end text-muted">Total Amount(Rs.): </td>
                            <td>{totalAmount}</td>
                        </tr>
                    </tbody>
                </Table>
            </div >
        </div>
    )
}
