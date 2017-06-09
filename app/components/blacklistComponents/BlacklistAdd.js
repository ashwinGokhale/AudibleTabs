import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import Button from 'react-uikit-button';
import FontAwesome from 'react-fontawesome';
import validUrl from 'valid-url';
import uuid from 'uuid'
import '../../styles/BlacklistItem.css'

export default class BlacklistAdd extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			open: false,
			name: '',
			url: ''
		}
	}

	handleAdd = () => {
		if(!this.state.open)
			this.setState({open: true});

		else if (!this.state.name)
			this.props.updateStatus('Name is required');

		else if (!this.state.url)
			this.props.updateStatus('Url is required');

		else if (!validUrl.isUri(this.state.url)) {
			this.props.updateStatus('Invalid Url');
		}

		else {
			this.props.addItem({
				name: this.state.name,
				url: this.state.url,
				_id : uuid.v4()
			});
			
			this.state = {};
		}
	}

	handleDelete = () => {
		this.setState({
			name: '',
			url: ''
		});
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	renderInput = () => {
		return (
			<div className="block">
				<label>Name: </label>
				<input
					placeholder="Name"
					name="name" 
					type="text"
					onChange={this.handleChange}
					value={this.state.name}
				/>
				<label>Url: </label>
				<input
					placeholder="Url"
					name="url" 
					type="url"
					onChange={this.handleChange}
					value={this.state.url}
				/>
			</div>
		);
	}

	render() {
		return (
			<tr>
				<td>
					<button
						className="uk-button"
						title="Close"
						onClick={this.handleDelete}
						ref={c => this.deleteButton = c}>
						<FontAwesome name='trash-o' style={{color:'#337ab7'}} size='2x'/>
					</button>
				</td>
				<td>
					<button
						className="uk-button"
						title="Add"
						onClick={this.handleAdd}
						ref={c => this.addButton = c}>
						<FontAwesome name={this.state.open ? 'check' : 'plus'} style={{color:'#337ab7'}} size='2x'/>
					</button>
					
					</td>
				<td className="page">
					<a onClick={() => this.setState({ open: !this.state.open })}>Click to add new item</a>
					<Collapse in={this.state.open}>
						<div>
							{this.state.open ? this.renderInput() : null}
						</div>
					</Collapse>
				</td>
			</tr>
		);
	}
}