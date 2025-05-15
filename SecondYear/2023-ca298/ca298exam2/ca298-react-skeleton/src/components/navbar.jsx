import './components.css';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Categories from './categories';
import HomePage from './home';
import OrdersByStatus from './OrdersByStatus';
import CustomerDetails from './CustomerDetails';
import OrderDetails from './OrderDetails'; // Import the OrderDetails component

function NavBar() {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/home">Abul's App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                            <Nav.Link as={Link} to="/orders-by-status">Orders by Status</Nav.Link>
                            <Nav.Link as={Link} to="/customer-details">Customer Details</Nav.Link>
                            <Nav.Link as={Link} to="/order-details">Order Details</Nav.Link> {/* Add Nav.Link for OrderDetails */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/orders-by-status" element={<OrdersByStatus />} />
                <Route path="/customer-details" element={<CustomerDetails />} />
                <Route path="/order-details" element={<OrderDetails />} /> {/* Route for OrderDetails */}
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default NavBar;

