/**
 * Created by ashwin on 5/29/17.
 */

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Shortcuts.css';

export default class Shortcuts extends Component {
	render() {
		return (
			<div id="shortcuts">
				<h4>Suggested Shortcuts</h4>
				<div className="shortcuts">
					<Table>
						<tbody>
							<tr className="uk-card">
								<td>
									<h6>
										<kbd>Ctrl+Shift+S</kbd> : Show audible tabs
									</h6>
								</td>
								<td>
									<h6>
										<kbd>Ctrl+Shift+C</kbd> : Close all audible tabs
									</h6>
								</td>
							</tr>
							<tr>
								<td>
									<h6>
										<kbd>Ctrl+Shift+M</kbd> : Mute current tab{' '}
									</h6>
								</td>
								<td>
									<h6>
										<kbd>Ctrl+Shift+A</kbd> : Mute all audible tabs
									</h6>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}
