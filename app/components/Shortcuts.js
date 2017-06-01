/**
 * Created by ashwin on 5/29/17.
 */

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
//import '../styles/Shortcuts.css'

export default class Shortcuts extends Component {

    render() {
        return (
            <div id="shortcuts">
                <h3 >Suggested Shortcuts</h3>
                <div className="shortcuts">
                    <Table >
                        <tbody>
                            <tr>
                                <td className="left"><h5><kbd>Ctrl+Shift+S</kbd> : Show audible tabs</h5></td>
                                <td className="right"><h5><kbd>Ctrl+Shift+C</kbd> : Close all audible tabs</h5></td>
                            </tr>


                            <tr>
                                <td className="left"><h5><kbd>Ctrl+Shift+M</kbd> : Mute current tab  </h5></td>
                                <td className="right"><h5><kbd>Ctrl+Shift+A</kbd> : Mute all audible tabs</h5></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}