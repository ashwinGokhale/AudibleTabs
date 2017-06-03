import React, { Component } from 'react';
import { Table, Button, Collapse } from 'react-bootstrap';
import BlacklistInput from './BlacklistInput';
import '../styles/Blacklist.css';

export default class Blacklist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    

    render(){
        return (
            <div id="blacklist" className="tab-pane fade in">
                <section>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Add</th>
                                <th>Remove</th>
                                <th>Page<Button bsStyle="primary" bsSize="xsmall" id="clear" >Clear</Button></th>
                            </tr>
                        </thead>
                        <tbody >
                        <tr>
                            <td><Button bsStyle="primary">Add</Button></td>
                            <td><Button bsStyle="primary">Remove</Button></td>
                            <td className="page" >
                                <span>
                                    <a onClick={ () => this.setState({ open: !this.state.open })}>Click here to add entry</a>
                                    {this.state.open ? <BlacklistInput/> : null}
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className="bottomBar">
                        <label id="status">Status Message</label>
                    </div>
                </section>
            </div>
        )
    }
}
