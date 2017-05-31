import React, { Component } from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../../chrome/assets/img/icon-128.png';
import '../styles/App.css'

class App extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <img className="App-logo" src={logo} alt="Logo" />
                    <Navigation />
                </div>

            </div>
        );
    }
}

export default App;