import React, { Component } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import TabContent from './TabContent'
import Shortcuts from './Shortcuts';
import Blacklist from './Blacklist';

export default class Navigation extends Component {

    render() {
        return (
        	<div>
				<Tabs defaultActiveKey={1} id="toast-container">
					<Tab eventKey={1} title="Tabs" ><TabContent /></Tab>
					<Tab eventKey={2} title="Shortcuts"> <Shortcuts/> </Tab>
					<Tab eventKey={3} title="Blacklist"><Blacklist/></Tab>
				</Tabs>
			</div>
        );
    }

}