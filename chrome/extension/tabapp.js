import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../app/components/App';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import '../../app/styles/tabapp.css';

const createStore = require('../../app/store/configureStore');

ReactDOM.render(
  <Provider store={createStore({})}>
    <App />
  </Provider>,
  document.querySelector('#root')
);


