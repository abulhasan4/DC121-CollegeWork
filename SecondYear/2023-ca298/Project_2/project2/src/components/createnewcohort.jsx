import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreateNewCohort = () => {
    const [id, setId] = useState('');
    const [year, setYear] = useState('');
    const [degree, setDegree] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cohort/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, year: parseInt(year), degree, name })
            });

            if (response.ok) {
                setMessage('Cohort created successfully.');
                setId('');
                setYear('');
                setDegree('');
                setName('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error creating cohort:', error);
            setMessage('An error occurred while creating the cohort.');
        }
    };

    return (
        <div className="container mt-5">
            <Card className="custom-card">
                <Card.Body>
                    <h2 className="card-title">Create a New Cohort</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="id">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control type="text" value={id} onChange={(e) => setId(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="year"><br />
                            <Form.Label>Year:</Form.Label>
                            <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="degree"><br />
                            <Form.Label>Degree:</Form.Label>
                            <Form.Control type="text" value={degree} placeholder="http://127.0.0.1:8000/api/degree/{CODE}/" onChange={(e) => setDegree(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="name"><br />
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group><br />
                        <Button variant="primary" type="submit">Create Cohort</Button>
                    </Form>
                    {message && <p className="mt-3">{message}</p>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateNewCohort;
