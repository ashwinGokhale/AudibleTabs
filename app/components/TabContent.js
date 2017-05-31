/**
 * Created by ashwin on 5/29/17.
 */

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class TabContent extends Component {
    render() {
        return(
            <div id="tabs" className="tab-pane fade in active">
                <section id="whole-audible-table">
                    <Table hover >
                        <thead>
                        <tr>
                            <th>Close</th>
                            <th>Mute</th>
                            <th>Tab</th>
                        </tr>
                        </thead>
                        <tbody id="audible-table">
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </Table>

                </section>
            </div>
        )
    }
}
