import React, { Component } from 'react';
import Navigation from './Navigation';
import logo from '../../chrome/assets/img/icon-128.png';

window.$ = window.jQuery = require('jquery');

import '../styles/App.css';

export default class App extends Component {
	render() {
		return (
			<div>
				<Navigation />
			</div>
		);
	}
}
