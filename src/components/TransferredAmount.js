import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import "../styles/ExpensesList.css"
import axios from "axios";


export default function TransferredAmount() {
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState("");

    useEffect(() => {
        getData();
    }, [])

    let getData = async () => {
        let data = await axios.get("http://localhost:3001/transferred-amount")
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

    return (
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
    )
}
