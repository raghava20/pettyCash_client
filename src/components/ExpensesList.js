import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import "../styles/ExpensesList.css"
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";


export default function ExpensesList() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [passData, setPassData] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true)
        setPassData(item)
        console.log(item)
    };

    useEffect(() => {
        getData();
    }, [])

    let getData = async () => {
        let data = await axios.get("http://localhost:3001/expenses-list")
        console.log(data)
        setData(data.data);
    }

    const handleDelete = async (id) => {
        await axios.delete("http://localhost:3001/expenses-list/" + id)
        setShow(false)
        getData();
    };
    return (
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
    )
}
