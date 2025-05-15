import React, { useState } from 'react';

const CreateNewModule = () => {
    const [code, setCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [deliveredTo, setDeliveredTo] = useState([]);
    const [caSplit, setCaSplit] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/module/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code, full_name: fullName, delivered_to: deliveredTo, ca_split: parseInt(caSplit) })
            });

            if (response.ok) {
                setMessage('Module created successfully.');
                setCode('');
                setFullName('');
                setDeliveredTo('');
                setCaSplit('');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error creating module:', error);
            setMessage('An error occurred while creating the module.');
        }
    };

    const handleDeliveredToChange = (e) => {
        const values = e.target.value.split(',').map(value => value.trim());
        setDeliveredTo(values);
    };

    return (
        <div>
            <div className="container custom-box single-box">
                <h2>Create a New Module</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={5}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deliveredTo">Delivered To:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="deliveredTo"
                            value={deliveredTo}
                            onChange={handleDeliveredToChange}
                            placeholder="http://127.0.0.1:8000/api/cohort/{Code}/"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="caSplit">CA Split:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="caSplit"
                            value={caSplit}
                            onChange={(e) => setCaSplit(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Module</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default CreateNewModule;
