import './components.css'; // Import your CSS file for styling
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function OrdersByStatus() {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        // Fetch orders based on selected status
        if (selectedStatus) {
            fetch(`http://127.0.0.1:8000/api/order/?status=${selectedStatus}`)
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(err => console.log(err));
        }
    }, [selectedStatus]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div>
            <div className='OrdersByStatus-Title'>
                <h1>View Orders by Status</h1>
            </div>
            <div className="status-select-container">
                <label htmlFor="statusSelect">Select Status:</label>
                <select id="statusSelect" onChange={handleStatusChange} value={selectedStatus}>
                    <option value="">--Select Status--</option>
                    <option value="O">Ordered</option>
                    <option value="P">Processing</option>
                    <option value="S">Shipped</option>
                    <option value="D">Delivered</option>
                </select>
            </div>
            {selectedStatus && (
                <div>
                    <h2>Orders with Status: {selectedStatus}</h2>
                    {orders.length > 0 ? (
                        <div className="orders-status-card-container">
                            {orders.map(order => (
                                <Card key={order.id} className="orders-status-card">
                                    <Card.Header>Order ID: {order.id}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>Date Ordered: {order.date_ordered}</Card.Text>
                                        <Card.Text>Shipping Address: {order.shipping_addr}</Card.Text>
                                        <Card.Text>Status: {order.status}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p>No orders found with this status.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrdersByStatus;
