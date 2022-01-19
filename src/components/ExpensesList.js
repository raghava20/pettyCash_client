import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import "../styles/ExpensesList.css"
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap'

export default function ExpensesList() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => { setShow(false) };


    return (
        <div className="expensesListPage">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Company Name</th>
                        <th>Expenses Category</th>
                        <th>Description</th>
                        <th>Amount(Rs.)</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody><tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td >Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td className="text-center"><IconButton className="expensesList__delButton" onClick={handleShow}>
                            <CloseIcon />
                        </IconButton></td>

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
                                                        <th>Company Name</th>
                                                        <th>Expenses Category</th>
                                                        <th >Description</th>
                                                        <th>Amount(Rs.)</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>

                                                <tbody><tr >
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                    <td >@mdodflasjdfl;kasjxxm.,cvvicjkvn,xcjhlknmv,jxzchvlksd.nflskj</td>
                                                    <td>@mdo</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </Col>

                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                            </Modal.Footer>
                        </Modal>
                    </tr>
                    {/* {data.map((item, i) => {
                        <tr>
                            <td>3</td>
                            <td >Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td><button onClick={() => handleDelete(e.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    })} */}
                </tbody>
            </Table>
        </div>
    )
}
