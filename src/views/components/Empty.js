import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Empty = ({ itemLink, type, url, group = '' }) => {
	return (
		<>
			<Card.Header className="my-card-header">
				<h4>{type}</h4>
				<Link to={`${url}/${itemLink}`} className="btn btn-primary">
					<i className="fas fa-plus"></i> {type}
				</Link>
			</Card.Header>
			<Card.Body>
				<Card.Text className="message-container">
					<strong>There are no {group} registered.</strong>
				</Card.Text>
			</Card.Body>
		</>
	);
};

export default Empty;
