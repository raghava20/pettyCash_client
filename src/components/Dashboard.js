import React from 'react';
import "../styles/Dashboard.css"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { ProgressBar, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { months } from './Utils'

export default function Dashboard() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Yearly Expenses ',
            },
        },
    };

    // let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = months({ count: 12 });
    const data = {
        labels,
        datasets: [
            {
                label: 'Conveyance',
                data: labels.map(() => 100),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Cartage',
                data: labels.map(() => 50),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'General',
                data: labels.map(() => 40),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Fuel',
                data: labels.map(() => 60),
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgba(255, 205, 86, 0.5)',
            },
            {
                label: 'Food',
                data: labels.map(() => 150),
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
            {
                label: 'Postage and Telegrams',
                data: labels.map(() => 20),
                borderColor: 'rgb(201, 203, 207)',
                backgroundColor: 'rgba(201, 203, 207, 0.5)',
            },
            {
                label: 'Shop Maintenance',
                data: labels.map(() => 250),
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
            {
                label: 'Stationery',
                data: labels.map(() => 120),
                borderColor: 'rgb(157, 143, 19)',
                backgroundColor: 'rgba(157, 143, 19, 0.5)',
            },
            {
                label: 'Wages',
                data: labels.map(() => 10),
                borderColor: 'rgb(180, 53, 185)',
                backgroundColor: 'rgb(180, 53, 185,0.5)',
            },
        ],
    };


    return (
        <div className="dashboardPage">
            <Container fluid>
                <Row className="mt-2 justify-content-around overflow-auto" >
                    <Col className="d-flex justify-content-center gap-2 mb-2 " xl={4} lg="auto" md="auto" >
                        <Card className="dashboard__card" style={{ "width": "22rem" }} >
                            <Card.Body>
                                <Card.Title class="d-flex justify-content-between align-items-baseline fw-normal mb-4">
                                    <div className="fw-bold me-2 p-2">Total Credit</div>
                                    <div className="p-2">Amount</div>
                                </Card.Title>

                                <ProgressBar now={60} className="rounded-pill" />
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* <Col className="d-flex justify-content-center gap-2 mb-2" xl={4} lg="auto" md="auto">
                        <Card className="dashboard__card" style={{ "width": "22rem" }} >
                            <Card.Body>
                                <Card.Title class="d-flex justify-content-between align-items-baseline fw-normal mb-4">
                                    <div className="fw-bold me-2 p-2">Last Month Expenses</div>
                                    <div className="p-2">Amount</div>
                                </Card.Title>
                                <ProgressBar now={60} className="rounded-pill" />
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col className="d-flex justify-content-center gap-2 mb-2" xl={4} lg="auto" md="auto">
                        <Card className="dashboard__card" style={{ "width": "22rem" }}>
                            <Card.Body>
                                <Card.Title class="d-flex justify-content-between align-items-baseline fw-normal mb-4">
                                    <div className="fw-bold me-2 p-2">Today's Expenses</div>
                                    <div className="p-2">Amount</div>
                                </Card.Title>
                                <ProgressBar now={60} className="rounded-pill" />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >
            <div className="dashboard__lineChart">
                <Line className="overflow-auto" options={options} data={data} />
            </div>
        </div>
    )
}
