import React from 'react';
import logo from './logo.svg';
import './App.css';
import bisection from './bisection'
import falseposition from './falseposition'
import onepointiteration from './onepointiteration'
import newtonraphson from './newtonraphson'
import secant from './secant'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'


function App() {
  return (
    <div>
      <Navbar bg="dark" variant="" sticky="top">
        <h1></h1>
        <Nav.Link href="/"><h3>NUMERICAL</h3></Nav.Link>
        <h1></h1>
        <Nav className="mr-auto">
          <h1></h1>
          <NavDropdown title="ROOT OF EQUATION" id="basic-nav-dropdown">
            <Nav.Link href="/bisection">bisection</Nav.Link>
            <Nav.Link href="/falseposition">false position</Nav.Link>
            <Nav.Link href="/onepointiteration">one-point iteration</Nav.Link>
            <Nav.Link href="/newtonraphson">newton raphson</Nav.Link>
            <Nav.Link href="/secant">secant</Nav.Link>
          </NavDropdown>
        </Nav>
      </Navbar>
      <div>
      
      </div>
      {/* <h1><a href="/bisection">B</a></h1>
      <h1><a href="/falseposition">F</a></h1>
      <h1><a href="/onepointiteration">O</a></h1>
      <h1><a href="/newtonraphson">N</a></h1>
      <h1><a href="/secant">S</a></h1> */}
      {/* <Route path="/bisection" exact component={bisection}/>
        <Route path="/falseposition" exact component={falseposition}/>
        <Route path="/onepointiteration" exact component={onepointiteration}/>
        <Route path="/newtonraphson" exact component={newtonraphson}/>
        <Route path="/secant" exact component={secant}/> */}
    </div>
  );
}

export default App;
