import React, { Component } from 'react';
import { Table, Button, Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchBlacklist, addBlacklist, removeBlacklist } from '../../actions/blacklistActions';
import BlacklistRow from './BlacklistRow';
import '../../styles/Blacklist.css';

class Blacklist extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			open: false,
			status: 'Status'
		};
	}

	componentDidMount() {
		this.props.fetchBlacklist();
	}

	updateStatus = (msg) => {
		this.setState({status: msg})
	}

	addItem = (item) => {
		chrome.tabs.query({audible: true}, (tabs) => {
			tabs.forEach((tab) => {
				if (tab.url == item.url) {
					chrome.tabs.update(tab.id, {muted: true}, () => {
						this.props.addBlacklist(item);
						this.setState({open: false});
					});	
				}
			});
		});
	}

	render(){
		return (
			<div id="blacklist" className="tab-pane fade in">
				<section>
					<Table hover>
						<thead>
							<tr>
								<th>Add</th>
								<th>Delete</th>
								<th>Page<Button bsStyle="primary" bsSize="xsmall" id="clear" >Clear</Button></th>
							</tr>
						</thead>
						<tbody >
							{this.props.blacklist.map((item, i) => 
								<BlacklistRow 
									key={i} 
									item={item}
									updateStatus={this.updateStatus} 
									addItem={this.addItem}
								/>)}
							<BlacklistRow 
								updateStatus={this.updateStatus} 
								addItem={this.addItem}
							/>
						</tbody>
					</Table>
					<div>
						<label id="status">{this.state.status}</label>
					</div>
				</section>
			</div>
		)
	}
}

Blacklist.propTypes = {
	blacklist: React.PropTypes.array.isRequired,
	fetchBlacklist: React.PropTypes.func.isRequired,
	addBlacklist: React.PropTypes.func.isRequired,
	removeBlacklist: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
	return {
		blacklist: state.blacklist
	}
}
export default connect(mapStateToProps, { fetchBlacklist, addBlacklist, removeBlacklist })(Blacklist);