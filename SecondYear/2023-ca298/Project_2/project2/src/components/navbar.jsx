import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Degrees from './degrees';
import HomePage from './home';
import Cohorts from './cohorts';
import Modules from './modules';
import SingleDegree from './singledegree';
import SingleCohort from './singlecohort';
import SingleModule from './singlemodule';
import CohortModules from './cohortmodules';
import SingleStudent from './singlestudent';
import CreateNewDegree from './createnewdegree';
import CreateNewCohort from './createnewcohort';
import CreateNewModule from './createnewmodule';
import CreateNewStudent from './createnewstudent';
import SetStudentGrade from './setstudentgrade';

function NavBar() {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/home">Abul's App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/degrees">Degrees</Nav.Link>
                            <Nav.Link as={Link} to="/cohorts">Cohorts</Nav.Link>
                            <Nav.Link as={Link} to="/modules">Modules</Nav.Link>
                            <Nav.Link as={Link} to="/create-degree">Create Degree</Nav.Link>
                            <Nav.Link as={Link} to="/create-cohort">Create Cohort</Nav.Link>
                            <Nav.Link as={Link} to="/create-module">Create Module</Nav.Link>
                            <Nav.Link as={Link} to="/create-student">Create Student</Nav.Link>
                            <Nav.Link as={Link} to="/set-grade">Set Student Grade</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/degrees" element={<Degrees />} />
                <Route path="/degrees/:shortcode" element={<SingleDegree />} />
                <Route path="/cohorts" element={<Cohorts />} />
                <Route path="/cohorts/:id" element={<SingleCohort />} />
                <Route path="/modules" element={<Modules />} />
                <Route path="/modules/:code" element={<SingleModule />} />
                <Route path="/cohorts/:id/modules" element={<CohortModules />} />
                <Route path="/students/:id" element={<SingleStudent />} />
                <Route path="/create-degree" element={<CreateNewDegree />} />
                <Route path="/create-cohort" element={<CreateNewCohort />} />
                <Route path="/create-module" element={<CreateNewModule />} />
                <Route path="/create-student" element={<CreateNewStudent />} />
                <Route path="/set-grade" element={<SetStudentGrade />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default NavBar;
