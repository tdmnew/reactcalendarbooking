import React, { Component } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/dashboard/Login.js';
import './App.css';

import jwt_decode from 'jwt-decode';


class App extends Component {
  render() {
    let loggedIn; 

    if(localStorage.jwtToken && localStorage.jwtToken !== 'undefined'){
        try {
            const decoded = jwt_decode(localStorage.jwtToken)
            const localTime = Date.now() / 1000
            if(decoded.exp > localTime) {
                loggedIn = true
            }
        }
        catch(error) {
            console.log(error)
        }
    } else {
        loggedIn = false;
    }

    return (
      <div className="App">
		{ loggedIn ? <Dashboard/> : <Login/> }
      </div>
    );
  }
}

export default App;
