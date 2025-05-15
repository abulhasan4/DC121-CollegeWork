import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreateNewDegree = () => {
    const [fullName, setFullName] = useState('');
    const [shortcode, setShortcode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/degree/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ full_name: fullName, shortcode: shortcode })
            });

            if (response.ok) {
                setMessage('Degree created successfully.');
                setFullName('');
                setShortcode('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error creating degree:', error);
            setMessage('An error occurred while creating the degree.');
        }
    };

    return (
        <div className="container mt-5">
            <Card className="custom-card">
                <Card.Body>
                    <h2 className="card-title">Create a New Degree</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullName"><br />
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="shortcode"><br />
                            <Form.Label>Shortcode:</Form.Label>
                            <Form.Control type="text" value={shortcode} onChange={(e) => setShortcode(e.target.value)} />
                        </Form.Group><br />
                        <Button variant="primary" type="submit">Create Degree</Button>
                    </Form>
                    {message && <p className="mt-3">{message}</p>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateNewDegree;

