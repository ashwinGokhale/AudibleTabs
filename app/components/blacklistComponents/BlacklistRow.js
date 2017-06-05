import React, { Component } from 'react';
import { Table, Button, Collapse } from 'react-bootstrap';
import BlacklistInput from './BlacklistInput';

class BlacklistRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}
	

	render() {
		return (
			<tr>
				<td><Button bsStyle="primary">Add</Button></td>
				<td><Button bsStyle="primary">Delete</Button></td>
				<td className="page">
					<a onClick={ () => this.setState({ open: !this.state.open })}>{this.props.item ? this.props.item.name : 'Click to add new item'}</a>
					<Collapse in={this.state.open}>
						<div>
							{this.state.open ? 
								<BlacklistInput 
									item={this.props.item} 
									updateStatus={this.props.updateStatus} 
									addItem={this.props.addItem}
								/> : null}
						</div>
					</Collapse>
				</td>
			</tr>
		);
	}
}

export default BlacklistRow;