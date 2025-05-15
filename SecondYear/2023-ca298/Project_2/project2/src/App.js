import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import Footer from './components/footer';

function App() {
    return (
        <div className="App">
            <NavBar />
        <div className="Content">
        </div>
            <Footer />
        </div>
    );
}

export default App;
