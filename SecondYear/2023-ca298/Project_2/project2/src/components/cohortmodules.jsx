import './components.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function CohortModules() {
    const { id } = useParams();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${id}`)
            .then(response => response.json())
            .then(data => {
                setModules(data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div>
            <div className='Cohort-Modules-Title'>
            <br /><h1>Modules For {id}</h1>
            </div>

            <div className='Cohort-Modules-Card-Container'>
                {modules.map(module => (
                    <Card key={module.code} style={{ width: '20rem' }} className="Cohort-Modules-Cards">
                        <Card.Header className="Card-Header">{module.code}</Card.Header>
                        <Card.Body className="Card-Body">
                            <Card.Title className="Card-Title">{module.full_name}</Card.Title><br />
                            <Card.Subtitle className="Card-Subtitle">CA Split: {module.ca_split}%</Card.Subtitle><br />
                            <Button as={Link} to={`/modules/${module.code}`} variant="primary">View Module</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CohortModules;
