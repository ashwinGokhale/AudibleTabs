import React, { Component } from 'react';
import { Table, Button, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	fetchBlacklist,
	addBlacklist,
	removeBlacklist,
	clearBlacklist,
	updateBlacklist
} from '../../actions/blacklistActions';
import BlacklistAdd from './BlacklistAdd';
import BlacklistEdit from './BlacklistEdit';
import '../../styles/Blacklist.css';

class Blacklist extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			status: ''
		};
		chrome.storage.onChanged.addListener(() => this.props.fetchBlacklist());
	}

	componentDidMount() {
		this.props.fetchBlacklist();
	}

	updateStatus = msg => {
		this.setState({ status: msg });
		setTimeout(() => this.setState({ status: '' }), 3000);
	};

	handleClear = () => {
		this.props.clearBlacklist();
		this.updateStatus('Items Cleared');
	};

	addItem = item => {
		this.props.addBlacklist(item);
		this.updateStatus('Item Added');
	};

	updateItem = item => {
		this.props.updateBlacklist(item);
		this.updateStatus('Item updated');
	};

	deleteItem = item => {
		this.props.removeBlacklist(item);
		this.updateStatus('Item Deleted');
	};

	renderItems = () =>
		this.props.blacklist.map(item => (
			<BlacklistEdit
				key={item._id}
				item={item}
				updateStatus={this.updateStatus}
				updateItem={this.updateItem}
				deleteItem={this.deleteItem}
			/>
		));

	render() {
		return (
			<div id="blacklist" className="tab-pane fade in">
				<table className="uk-table uk-table-striped uk-box-shadow-small">
					<tbody>
						<BlacklistAdd
							updateStatus={this.updateStatus}
							addItem={this.addItem}
							deleteItem={this.deleteItem}
						/>
						{this.renderItems()}
					</tbody>
				</table>
				<div className="bottom-bar">
					<label id="status">{this.state.status}</label>
					<Button bsStyle="primary" bsSize="xsmall" id="clear" onClick={this.handleClear}>
						Clear
					</Button>
				</div>
			</div>
		);
	}
}

Blacklist.propTypes = {
	blacklist: PropTypes.array.isRequired,
	fetchBlacklist: PropTypes.func.isRequired,
	addBlacklist: PropTypes.func.isRequired,
	removeBlacklist: PropTypes.func.isRequired,
	updateBlacklist: PropTypes.func.isRequired,
	clearBlacklist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	blacklist: state.blacklist
});
export default connect(
	mapStateToProps,
	{ fetchBlacklist, addBlacklist, removeBlacklist, updateBlacklist, clearBlacklist }
)(Blacklist);
