import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const CardContainer = ({ title, link, children, searchWord }) => {
	const { url } = useRouteMatch();
	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				{title && <h4>{title}</h4>}

				{link && (
					<Link to={`${url}/${link}`} className="btn btn-light ml-2">
						<i className="fas fa-edit"></i> Edit
					</Link>
				)}
			</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card>
	);
};

export default CardContainer;
