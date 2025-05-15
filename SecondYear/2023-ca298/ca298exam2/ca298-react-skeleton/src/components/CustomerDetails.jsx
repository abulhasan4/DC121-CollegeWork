import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './components.css'; // Import your CSS file for styling

function CustomerDetails() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/customer/")
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(err => console.log(err));
    }, []);

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        const customerId = customer.url.split('/').slice(-2, -1)[0];
        fetch(`http://127.0.0.1:8000/api/order/?customer_id=${customerId}`)
            .then(response => response.json())
            .then(data => {
                // Filter orders for the selected customer
                const customerOrders = data.filter(order => order.customer === customer.url);
                setCustomerOrders(customerOrders);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="CustomerDetails-Container"> {/* Added a wrapper div with a class for styling */}
            <div className='Categories-Title'>
                <h1>View Customers and Their Orders</h1>
            </div>
            <div className="CustomerDetails-Cards">
                {customers.map(customer => (
                    <Card key={customer.url} style={{ width: '20rem', marginBottom: '1rem' }} className="CustomerDetails-Card">
                        <Card.Body>
                            <Card.Title>{customer.name}</Card.Title>
                            <Card.Text>Email: {customer.email}</Card.Text>
                            <Card.Text>Address: {customer.address}</Card.Text>
                            <Button variant="primary" onClick={() => handleCustomerClick(customer)}>View Orders</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {selectedCustomer && customerOrders.length > 0 && (
                <div>
                    <h2>Customer Orders</h2>
                    <div className="CustomerDetails-Orders">
                        {customerOrders.map(order => (
                            <Card key={order.url} style={{ width: '20rem', marginBottom: '1rem' }} className="CustomerDetails-Order">
                                <Card.Body>
                                    <Card.Text>Order ID: {order.url.split('/').slice(-2, -1)}</Card.Text>
                                    <Card.Text>Date Ordered: {order.date_ordered}</Card.Text>
                                    <Card.Text>Status: {order.status}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerDetails;
