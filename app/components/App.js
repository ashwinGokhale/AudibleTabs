import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import logo from '../../chrome/assets/img/icon-128.png';
import 'bootstrap/dist/css/bootstrap.css'
import * as TodoActions from '../actions/todos';
import '../styles/App.css'

@connect(
  state => ({
    tabs: state.tabs
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
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