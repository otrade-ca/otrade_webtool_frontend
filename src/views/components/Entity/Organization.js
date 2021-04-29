import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';

const Organization = ({ url, entity, deleteHandler }) => {
	return (
		<div className="d-flex justify-content-between">
			<div>
				<p>
					Organization: {' '}
					<strong>
						<Link to={`${url}/${entity._id}/edit`}>{entity.name}</Link>
					</strong>
					<br />
					Registered: {' '}
					<strong>
						<Moment format="MM-DD-YYYY">{entity.createdAt}</Moment>
					</strong>
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

export default Organization;
