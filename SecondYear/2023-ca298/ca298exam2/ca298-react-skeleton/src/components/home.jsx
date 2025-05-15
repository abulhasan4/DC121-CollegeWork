import React from 'react';
import { Card } from 'react-bootstrap';
import './components.css';

function HomePage() {
    const fullName = 'Abul Hasan Sheik Madhar Ali';
    const studentNumber = '22390436';
    const moduleNumber = 'CA 298 - Fullstack';
    const course = 'COMSCI2';

    return (
        <div className="Home">
            <div className="Home-Container">
                <Card className="Home-Card" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Welcome to my React Exam</Card.Title>
                        <Card.Text>
                            <p>Full Name: {fullName}</p>
                            <p>Student Number: {studentNumber}</p>
                            <p>Module Number: {moduleNumber}</p>
                            <p>Course: {course}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default HomePage;
