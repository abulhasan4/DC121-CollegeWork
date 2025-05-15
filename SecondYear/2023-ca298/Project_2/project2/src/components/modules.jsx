import { ListGroup } from 'react-bootstrap';
import './components.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Modules() {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/`)
            .then(response => response.json())
            .then(data => {
                setModules(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className='Modules-Title'>
                <br /><h1>View All Modules Below</h1><br />
            </div>

            <div className='Modules-Card-Container'>
                {modules.map(module => (
                    <Link to={`/modules/${module.code}`} key={module.code} className='Modules-Link'>
                        <ListGroup.Item className='Modules-Card'>{module.code} - {module.full_name}</ListGroup.Item>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Modules;
