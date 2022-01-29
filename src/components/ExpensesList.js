import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import "../styles/ExpensesList.css"
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { format } from 'date-fns'
import moment from 'moment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import jwt from "jsonwebtoken";

export default function ExpensesList({ value }) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [passData, setPassData] = useState("");
    const [totalAmount, setTotalAmount] = useState("");

    let navigate = useNavigate();
    let refToken = useRef();

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true)
        setPassData(item)
        console.log(item)
    };

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

    let dateRangePicker = async () => {
        let formatDate1 = new Date(value[0]).getTime()
        let formatDate2 = new Date(value[1]).getTime()
        // let result = moment(formatDate).format('DD/MM/YYYY');
        if (!formatDate1 || !formatDate2) return
        console.log(formatDate2)
        console.log(formatDate1)
        let dbData = await axios.get("http://localhost:3001/expenses-list", {
            headers: {
                token: refToken.current
            }
        })
        let dates = dbData.data;
        console.log(dates)
        let result = dates.filter(data => {
            let value = new Date(data.date).getTime()
            console.log(value)
            return value >= formatDate1 && value <= formatDate2;
        })
        console.log(result)
        setData(result)
        let amount = result.map(item => item.amount).reduce((previousValue, currentValue) => {
            return previousValue + currentValue
        })
        setTotalAmount(amount)

    }

    let getData = async () => {
        let data = await axios.get("http://localhost:3001/expenses-list", {
            headers: {
                token: refToken.current
            }
        })
        console.log(data)
        setData(data.data);
        addingAmount(data.data)
    }

    const handleDelete = async (id) => {
        await axios.delete("http://localhost:3001/expenses-list/" + id, {
            headers: {
                token: refToken.current
            }
        })
        setShow(false)
        getData();
    };
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
        <>
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
                            <th>Expenses Category</th>
                            <th>Description</th>
                            <th>Amount(Rs.)</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td className="text-center">
                                <IconButton className="expensesList__delButton" onClick={handleDelete}>
                                    <CloseIcon />
                                </IconButton>
                            </td>
                        </tr> */}
                        {data.map((item, key) => {
                            return <tr>
                                <td>{key + 1}</td>
                                <td >{item.date}</td>
                                <td>{item.expensesCategory}</td>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td className="text-center">
                                    <IconButton className="expensesList__delButton" onClick={() => handleShow(item)}>
                                        <CloseIcon />
                                    </IconButton>
                                </td>
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
                <Modal show={show} size="lg" onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Do you want to delete this?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body fluid>
                        <Container>
                            <Row>
                                <Col >
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Date</th>
                                                <th>Expenses Category</th>
                                                <th>Description</th>
                                                <th>Amount(Rs.)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td>1</td>
                                                <td>{passData.date}</td>
                                                <td>{passData.expensesCategory}</td>
                                                <td>{passData.description}</td>
                                                <td>{passData.amount}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => handleDelete(passData._id)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </>
    )
}
