import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import './styles/tabapp.css';

const createStore = require('./store/configureStore');

ReactDOM.render(
	<Provider store={createStore()}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
