import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { getAllTabs } from '../../actions/tabActions'
import '../../styles/BlacklistInput.css';

class BlacklistInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
        	name: this.props.item ? this.props.item.name : '',
			url: this.props.item ? this.props.item.url : '',
			id: this.props.item ? this.props.item.id : ''
      	}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		if (!this.state.name) {
			this.props.updateStatus('Name is required');
		}

		else if (!this.state.url) {
			this.props.updateStatus('Url is required');
		}

		if (this.state.name && this.state.url) {
			this.props.addItem(this.state);
		}
	}
	

	render() {
		return (
			<div className="block">
				<label>Name: </label>
				<input 
					name="name" 
					type="text"
					value={this.state.name} 
					onChange={this.handleChange}
				/>
				<label>Url: </label>
				<input 
					name="url" 
					type="text"
					value={this.state.url} 
					onChange={this.handleChange}
				/>
				<Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
			</div>
		);
	}
}

export default BlacklistInput;