import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';

const Stakeholder = ({ entity, deleteHandler }) => {
	return (
		<div className="d-flex justify-content-between">
			<div>
				<p>
					Contact:{' '}   
					<strong>
						<Link to={`/stakeholder/${entity._id}`}>
							{entity.firstName} {entity.lastName}
						</Link>
					</strong>
					<br />
					Email: <em>{entity.email}</em>
					<br />
					Telephone: <em>{entity.telephone}</em>
					<br/>
					Registered: <strong><Moment format="MM-DD-YYYY">{entity.createdAt}</Moment></strong>
				</p>
			</div>
			<div className="d-flex align-items-center justify-content-end">
				<Button
					variant="danger"
					className="btn-md ml-3"
					onClick={() => deleteHandler(entity._id)}
				>
					<i className="fas fa-trash"></i> Delete
				</Button>
			</div>
		</div>
	);
};

export default Stakeholder;

