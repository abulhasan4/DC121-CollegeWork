import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import HeadingComponent from './components/heading';
import Counter from './components/counter';
import CatFacts from './components/catfacts';
import Book from './components/book';
import BookList from './components/booklist';


function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/degrees">All Degrees</Link>
            </li>
            <li>
              <Link to="/create-degree">Create New Degree</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/degrees" component={DegreesList} />
          <Route path="/degrees/:id" component={DegreeDetail} />
          <Route path="/create-degree" component={DegreeCreate} />
        </Switch>
      </div>
      <div className="logos">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </Router>
  );
}

export default App;
