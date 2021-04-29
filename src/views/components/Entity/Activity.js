import React from 'react';
import { Link } from 'react-router-dom';
import {Button } from 'react-bootstrap';
import Moment from 'react-moment';

const Activity = ({ url, entity, deleteHandler, index }) => {
	return (
		<div className="d-flex justify-content-between">
			<div>
				<p className="mr-3">
					Activity: {' '}
					<strong><Link to={`${url}/${entity._id}/profile`}>{entity.activity}</Link></strong>
					<br />
					Created:{' '}
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

export default Activity;
