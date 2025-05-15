import React, { useState } from 'react';

const SetModuleGrades = () => {
    const [formData, setFormData] = useState({
        module: '',
        ca_mark: '',
        exam_mark: '',
        cohort: '',
        student: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/grade/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage('Form submitted successfully.');
                setFormData({
                    module: '',
                    ca_mark: '',
                    exam_mark: '',
                    cohort: '',
                    student: ''
                });
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="custom-card">
                <h2 className="card-title">Set Module Grades</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="module">Module:</label>
                        <input
                            type="text"
                            id="module"
                            name="module"
                            value={formData.module}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="ca_mark">Ca mark:</label>
                        <input
                            type="number"
                            id="ca_mark"
                            name="ca_mark"
                            value={formData.ca_mark}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="form-control"
                        />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="exam_mark">Exam mark:</label>
                        <input
                            type="number"
                            id="exam_mark"
                            name="exam_mark"
                            value={formData.exam_mark}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="form-control"
                        />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="cohort">Cohort:</label>
                        <input
                            type="text"
                            id="cohort"
                            name="cohort"
                            value={formData.cohort}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="student">Student:</label>
                        <input
                            type="text"
                            id="student"
                            name="student"
                            value={formData.student}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div><br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form><br />
                {message && <p className="mt-3">{message}</p>}
            </div>
        </div>
    );
};

export default SetModuleGrades;
