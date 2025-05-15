import './components.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function SingleStudent() {
    const { id } = useParams();
    const [student, setStudents] = useState(null);
    const [grades, setGrades] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}/`)
            .then(response => response.json())
            .then(data => {
                setStudents(data);
            })
            .catch(err => console.log(err));

        fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
            .then(response => response.json())
            .then(data => {
                setGrades(data);
                const moduleURLs = data.map(grade => grade.module);
                Promise.all(moduleURLs.map(url => fetch(url).then(response => response.json())))
                    .then(moduleData => {
                        setModules(moduleData);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="Single-Student-Title">
                <h1>{student.first_name} {student.last_name}</h1><br />
            </div>
            <div className="Single-Student-Subtitle">
                <h3>View Student Grades Below</h3><br />
            </div>

            <div className="Cohorts-Card-Container">
                {modules.map((module, index) => {
                    const grade = grades[index];
                    return (
                        <Card key={module.code} style={{ width: '20rem' }} className="Cohorts-Cards">
                            <Card.Header>{module.code}</Card.Header>
                            <Card.Body>
                                <Card.Title>{module.full_name}</Card.Title>
                                <Card.Text>CA Mark: {grade.ca_mark}</Card.Text>
                                <Card.Text>Exam Mark: {grade.exam_mark}</Card.Text>
                                <Card.Subtitle>Module Grade: {grade.total_grade}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default SingleStudent;
