import React, { Component } from 'react';
import Button from 'react-uikit-button'
import { Collapse } from 'react-bootstrap';
import validUrl from 'valid-url';
import classNames from 'classnames';
import uuid from 'uuid';
import FontAwesome from 'react-fontawesome';
import '../../styles/BlacklistItem.css'

export default class BlacklistEdit extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			open: false,
			name: this.props.item ? this.props.item.name : '',
			url: this.props.item ? this.props.item.url : '',
			_id: this.props.item ? this.props.item._id : uuid.v4(),
			editing: false
		}
	}

	componentWillReceiveProps(nextProps) {
		this.state = {
			open: false,
			name: this.props.item ? this.props.item.name : '',
			url: this.props.item ? this.props.item.url : '',
			_id: this.props.item ? this.props.item._id : uuid.v4(),
			editing: false
		}
	}
	

	handleUpdate = () => {
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
			this.props.updateItem({
				name: this.state.name,
				url: this.state.url,
				_id: this.props.item._id
			});
			
			this.setState({open: false});
		}
	}

	handleDelete = () => {
		let item = {
			name: this.state.name,
			url: this.state.url,
			id: this.state._id
		}
		this.state = {};
		this.props.deleteItem(item);
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	renderInput = () => {
		return (
			<div className="block">
				<form>
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
				</form>
			</div>
		);
	}

	render() {
		let editing = this.state.editing;
		let element = null;
		if (this.state.open) {
			element = this.renderInput();
		}
		return (
			<tr>
				<td>
					<Button
						title="Delete"
						body={
							<FontAwesome 
								name='trash-o' 
								size='2x'
								style={{color:'#337ab7'}} 
							/>
						}
						onClick={this.handleDelete}
						ref={c => this.deleteButton = c}
						type="button"/>
				</td>

				<td>
					<Button
						title="Edit"
						body={
							<FontAwesome 
								name={this.state.open ? 'check' : 'pencil'}
								size='2x'
								style={{color:'#337ab7'}}
							/>
						}
						aria-label="Edit task"
						onClick={this.handleUpdate}
						ref={c => this.editButton = c}
						type="button"/>
				</td>
				<td className="page">
					<a onClick={() => this.setState({ open: !this.state.open })}>{this.props.item.name}</a>
					<Collapse in={this.state.open}>
						<div>
							{element}
						</div>
					</Collapse>
				</td>
			</tr>
		);
	}
}