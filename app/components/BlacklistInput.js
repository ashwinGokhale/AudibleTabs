import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import '../styles/BlacklistInput.css';

class BlacklistInput extends Component {
	render() {
		return (
			<div>
				<Table>
					<tbody>
						<Form>
							<label>Name: </label>
							<input type="text" name="name" required/>
							<label>URL: </label>
							<input type="text" name="name" required/>
							<input className="btn btn-primary" type="submit" value="Submit"/>
						</Form>
					</tbody>
					
				</Table>
			
			</div>
		);
	}
}

export default BlacklistInput;