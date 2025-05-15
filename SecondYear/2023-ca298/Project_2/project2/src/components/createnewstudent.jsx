import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreateNewStudent = () => {
    const [studentId, setStudentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cohort, setCohort] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/student/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ student_id: studentId, first_name: firstName, last_name: lastName, cohort: cohort, email })
            });

            if (response.ok) {
                setMessage('Student created successfully.');
                setStudentId('');
                setFirstName('');
                setLastName('');
                setCohort('');
                setEmail('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error creating student:', error);
            setMessage('An error occurred while creating the student.');
        }
    };

    return (
        <div className="container mt-5">
            <Card className="custom-card">
                <Card.Body>
                    <h2 className="card-title">Create a New Student</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="studentId">
                            <Form.Label>Student ID:</Form.Label>
                            <Form.Control type="text" maxLength={8} value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="cohort">
                            <Form.Label>Cohort:</Form.Label>
                            <Form.Control type="text" placeholder='http://127.0.0.1:8000/api/cohort/{Code}/' value={cohort} onChange={(e) => setCohort(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">Create Student</Button>
                    </Form>
                    {message && <p className="mt-3">{message}</p>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateNewStudent;
