import React from 'react';
import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      
      <Router>
      <>
        <Switch>
          <Route path="/" exact >
            <Header/>
          </Route>
        </Switch>
      </>
    </Router>
    </div>
  );
}

export default App;
