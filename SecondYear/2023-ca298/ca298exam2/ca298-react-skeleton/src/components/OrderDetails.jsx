import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './components.css'; // Import your CSS file for styling

function OrderDetails() {
    const [groupedOrderItems, setGroupedOrderItems] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const groupOrderItems = (orderItems) => {
            const groupedItems = {};
            orderItems.forEach(orderItem => {
                const orderUrl = orderItem.order;
                const orderId = getOrderNumber(orderUrl);
                if (!groupedItems[orderId]) {
                    groupedItems[orderId] = [orderItem];
                } else {
                    groupedItems[orderId].push(orderItem);
                }
            });
            const groupedItemsArray = Object.values(groupedItems);
            setGroupedOrderItems(groupedItemsArray);
        };

        fetch('http://127.0.0.1:8000/api/orderitem/')
            .then(response => response.json())
            .then(data => groupOrderItems(data))
            .catch(err => console.log(err));

        fetch('http://127.0.0.1:8000/api/product/')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, []);

    const getOrderNumber = (orderUrl) => {
        const parts = orderUrl.split('/');
        return `Order ${parts[parts.length - 2]}`;
    };

    const calculateTotalPrice = (orderItems) => {
        let totalPrice = 0;
        orderItems.forEach(orderItem => {
            const product = products.find(prod => prod.url === orderItem.product);
            if (product) {
                totalPrice += product.price * orderItem.quantity;
            } else {
                console.log(`Product not found for order item with URL: ${orderItem.url}`);
            }
        });
        return totalPrice.toFixed(2);
    };

    return (
        <Container className="order-details-container"> {/* Added a class for styling */}
            <h1 className="order-details-title">Order Details</h1>
            {groupedOrderItems.map(group => (
                <Card key={group[0].order} className="order-card">
                    <Card.Body>
                        <p className="order-number">{getOrderNumber(group[0].order)}</p>
                        {group.map(orderItem => (
                            <div key={orderItem.url}>
                                <Row>
                                    {products
                                        .filter(product => product.url === orderItem.product)
                                        .map(filteredProduct => (
                                            <Col key={filteredProduct.url} sm={4}>
                                                <Card className="product-card">
                                                    <Card.Body>
                                                        <Card.Title>{filteredProduct.name}</Card.Title>
                                                        <Card.Text>Price: ${filteredProduct.price}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    <Col sm={4}>
                                        <Card className="quantity-card">
                                            <Card.Body>
                                                <Card.Text>Quantity: {orderItem.quantity}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                        <hr />
                        <Row>
                            <Col>
                                <h5 className="total-price">Total Price: ${calculateTotalPrice(group)}</h5>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default OrderDetails;
