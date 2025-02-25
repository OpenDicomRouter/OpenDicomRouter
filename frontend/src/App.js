import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import MyPolicies from './components/MyPolicies';
import PolicyManager from './components/policy-manager/PolicyManager';
import ActionObjects from './components/ActionObjects'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={MyPolicies} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/myPolicies" component={MyPolicies} />
            <Route exact path="/actionObjects" component={ActionObjects} />
            <Route path="/policies/" component={PolicyManager} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;