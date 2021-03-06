import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Tab, Tabs } from 'react-bootstrap';

import TabContent from './TabContent';
import Shortcuts from './Shortcuts';
import Blacklist from './blacklistComponents/Blacklist';
import logo from '../../chrome/assets/img/icon-128.png';

const UIkit = require('uikit');

const switchers = {
	_id: 'navigation-header',
	options: {
		tabPosition: 'top',
		animation: ''
	},
	data: [
		{
			title: 'Tabs',
			content: <TabContent />
		},
		{
			title: 'Blacklist',
			content: <Blacklist />
		},
		{
			title: 'Shortcuts',
			content: <Shortcuts />
		}
	]
};

export default class Navigation extends Component {
	componentDidMount() {
		UIkit.switcher($(`#${switchers._id}> .uk-tab`), {
			connect: `#${switchers._id}> div > .uk-switcher`,
			animation: switchers.options.animation,
			active: 1
		});
	}

	render() {
		return (
			<div id={switchers._id} className="uk-flex uk-flex-column">
				<ul className="uk-tab">
					<li className="uk-disabled">
						<img className="App-logo" src={logo} alt="Logo" />
					</li>
					{switchers.data.map((data, i) => (
						<li key={i}>
							<a href="#">{data.title}</a>
						</li>
					))}
				</ul>
				<div className="">
					<ul className="uk-switcher">
						<li />
						{switchers.data.map((data, i) => (
							<li key={i}>{data.content}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
