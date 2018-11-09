import React, { Component } from 'react';
import { Tabs } from 'antd';
import TabContent from './TabContent';
import Shortcuts from './Shortcuts';
import Blacklist from './blacklistComponents/Blacklist';
import logo from '../../chrome/assets/img/icon-128.png';

const TabPane = Tabs.TabPane;

let switchers = {
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
		// UIkit.switcher($('#' + switchers._id + '> .uk-tab'), {
		// 	connect: '#' + switchers._id + '> div > .uk-switcher',
		// 	animation: switchers.options.animation,
		// 	active: 1
		// });
	}

	render() {
		return (
			// <div id={switchers._id} className="uk-flex uk-flex-column">
			// 	<ul className="uk-tab">
			// 		<li className="uk-disabled">
			// 			<img className="App-logo" src={logo} alt="Logo" />
			// 		</li>
			// 		{switchers.data.map((data, i) => (
			// 			<li key={i}>
			// 				<a href="#">{data.title}</a>
			// 			</li>
			// 		))}
			// 	</ul>
			// 	<div className="">
			// 		<ul className="uk-switcher">
			// 			<li />
			// 			{switchers.data.map((data, i) => (
			// 				<li key={i}>{data.content}</li>
			// 			))}
			// 		</ul>
			// 	</div>
			// </div>
			<Tabs animated={false} defaultActiveKey="2">
				<TabPane
					tab={<img className="App-logo" src={logo} />}
					disabled
					key="1"
				/>
				<TabPane tab="Tabs" key="2">
					<TabContent />
				</TabPane>
				<TabPane tab="Blacklist" key="3">
					<Blacklist />
				</TabPane>
				<TabPane tab="Shortcuts" key="4">
					<Shortcuts />
				</TabPane>
			</Tabs>
		);
	}
}
