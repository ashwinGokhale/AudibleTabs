import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { fetchTabs, closeTab, muteTab, highlightTab } from '../actions/tabActions';
import VolumeButton from './VolumeButton';
import '../styles/TabContent.css';

class TabContent extends Component {
	constructor(props, context) {
		super(props, context);
		chrome.tabs.onUpdated.addListener(() => this.props.fetchTabs());
		chrome.tabs.onRemoved.addListener(() => this.props.fetchTabs());
		chrome.tabs.onCreated.addListener(() => this.props.fetchTabs());
	}

	componentDidMount() {
		this.props.fetchTabs();
	}

	handleMute = e => {
		this.props.muteTab(e.target.id);
	};

	handleClose = e => {
		this.props.closeTab(e.target.id);
	};

	handleHighlight = e => {
		this.props.highlightTab(e.target.id);
	};

	renderTable() {
		return (
			<table className="uk-table uk-table-striped uk-box-shadow-small">
				<tbody id="audible-table">
					{this.props.tabs.map((tab, i) => (
						<tr key={i}>
							<td>
								<button
									className="uk-button"
									id={tab.id}
									title="Close"
									onClick={this.handleClose}
									ref={c => (this.closeButton = c)}
								>
									<FontAwesome
										id={tab.id}
										name="trash-o"
										style={{ color: '#337ab7' }}
										size="2x"
									/>
								</button>
							</td>
							<td>
								<VolumeButton
									id={tab.id}
									muted={tab.mutedInfo.muted}
									handleMute={this.handleMute}
								/>
							</td>
							<td className="tab">
								<a onClick={this.handleHighlight} id={tab.index}>
									{tab.title}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div id="tabs" className="tab-pane fade in active">
				{this.props.tabs.length ? (
					this.renderTable()
				) : (
					<h4>There are currently no tabs playing audio</h4>
				)}
			</div>
		);
	}
}

TabContent.propTypes = {
	tabs: PropTypes.array.isRequired,
	fetchTabs: PropTypes.func.isRequired,
	closeTab: PropTypes.func.isRequired,
	muteTab: PropTypes.func.isRequired,
	highlightTab: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
	tabs: state.tabs
});
export default connect(
	mapStateToProps,
	{ fetchTabs, closeTab, muteTab, highlightTab }
)(TabContent);
