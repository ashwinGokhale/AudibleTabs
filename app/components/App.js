import React, { Component } from 'react';
import Navigation from './Navigation';
import logo from '../../chrome/assets/img/icon-128.png';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/App.css'

export default class App extends Component {

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