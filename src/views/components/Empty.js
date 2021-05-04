import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';

const Empty = ({ itemLink, type, url, group = '' }) => {
	return (
		<>
			<Card.Header className="my-card-header">
				<h4>{type}</h4>
				{itemLink && (
					<Link to={`${url}/${itemLink}`} className="btn btn-primary">
						<IconContext.Provider value={{ color: '#fff', size: '1em' }}>
							<IoIcons.IoMdAdd />
						</IconContext.Provider>
						{type}
					</Link>
				)}
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
