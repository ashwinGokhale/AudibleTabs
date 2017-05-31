import React from 'react';
import ReactDOM from 'react-dom';
//import Root from '../../app/containers/Root';
import App from '../../app/components/App';
import '../../app/styles/index.css';
//import './todoapp.css';

chrome.storage.local.get('state', (obj) => {
  // const { state } = obj;
  // const initialState = JSON.parse(state || '{}');

  // const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <App />,
    document.querySelector('#root')
  );

  // ReactDOM.render(
  //   <Root store={createStore(initialState)} />,
  //   document.querySelector('#root')
  // );
});
