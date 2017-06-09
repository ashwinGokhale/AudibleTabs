import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class VolumeButton extends Component {
	constructor(props) {
		super(props);
		this.state = {muted: false};
	}

	handleVolume = (e) => {
		this.setState({muted: !this.state.muted});
		this.props.handleMute(e);
	}
	

	render() {
		return (
			<button
				className="uk-button"
				id={this.props.id}
				title="Close"
				onClick={this.handleVolume}
				ref={c => this.closeButton = c}
			>
				<FontAwesome id={this.props.id} name={this.state.muted ? 'volume-off': 'volume-up'} style={{color:'#337ab7'}} size='2x'/>
			</button>
		);
	}
}