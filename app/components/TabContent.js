import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchTabs, closeTab, muteTab, highlightTab } from '../actions/tabActions'
import '../styles/TabContent.css';

class TabContent extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleMute.bind(this);
        this.handleClose.bind(this);
        this.handleHighlight.bind(this);
    }

    handleMute = (e) => {
        e.preventDefault();
        chrome.tabs.get(parseInt(e.target.id), (tab) => {
            chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
        });
    }

    handleClose = (e) => {
        e.preventDefault();
        chrome.tabs.remove(parseInt(e.target.id), () => {
            this.props.fetchTabs();
        });
        //this.props.closeTab(e.target.id);
        //this.props.fetchTabs();
    }

    handleHighlight = (e) => {
        e.preventDefault();
        //chrome.tabs.highlight({'tabs': parseInt(e.target.id)}, () => {});
        this.props.highlightTab(e.target.id);
    }

    renderTable(){
        return(
            <section id="whole-audible-table">
                <Table hover>
                    <thead>
                    <tr>
                        <th>Close</th>
                        <th>Mute</th>
                        <th>Tab</th>
                    </tr>
                    </thead>
                    <tbody id="audible-table">
                        {this.props.tabs.map((tab, i) => 
                            (<tr key={i}>
                                <td><Button onClick={this.handleClose} bsStyle="primary" id={tab.id}>Close</Button></td>
                                <td><Button onClick={this.handleMute} bsStyle="primary" id={tab.id}>Mute</Button></td>
                                <td><a onClick={this.handleHighlight} id={tab.index}>{tab.title}</a></td>
                            </tr>)    
                        )}
                    </tbody>
                </Table>
            </section>
        );
    }

    render() {

        return(
            <div id="tabs" className="tab-pane fade in active">
                {this.props.tabs.length ? this.renderTable() : <h4>There are currently no tabs playing audio</h4>}
            </div>
        )
    }
}

TabContent.propTypes = {
    tabs: React.PropTypes.array.isRequired,
    closeTab: React.PropTypes.func.isRequired,
    muteTab: React.PropTypes.func.isRequired,
    highlightTab: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        tabs: state.tabs
    }
}
export default connect(mapStateToProps, { fetchTabs, closeTab, muteTab, highlightTab })(TabContent);
