import React, { Component } from 'react';
import logo from './logo.svg';

import { Login } from './Login';
import { RegisterApplicant } from './RegisterApplicant';
import './App.css';

class App extends Component {
    render() {
        return (
            // <Login />
            <RegisterApplicant />
        );
    }
}

export default App;
