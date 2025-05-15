import './components.css';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Cohorts() {
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(cohort => cohort.id !== '3')
                setCohorts(filteredData)
            })
            .catch(err => console.log())
    }, [])

    return (
        <div>
            <div className='Cohorts-Title'>
            <br /><h1>View All Cohorts Below</h1>
            </div>
            <div className="Cohorts-Card-Container">
                {cohorts.map(cohort => (
                    <Card key={cohort.id} style={{ width: '20rem' }} className="Cohorts-Cards">
                        <Card.Header>{cohort.id}</Card.Header>
                        <Card.Body>
                            <Card.Title>{cohort.name}</Card.Title>
                            <Button as={Link} to={`/cohorts/${cohort.id}`} variant="primary">View Cohort</Button>
                            <Button as={Link} to={`/cohorts/${cohort.id}/modules`} variant="secondary">View Cohort's Modules</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Cohorts;
