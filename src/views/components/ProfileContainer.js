import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const BorderContainer = ({ title, link, children }) => {
	const { url } = useRouteMatch();
	return (
		<div className="border-container">
			<div className="border-container-header">
				<div className="title">{title}</div>
				<div className="link">
					{link && (
						<Link to={`${url}/${link}`} className="btn btn-light ml-2 mb-3">
							<i className="fas fa-edit"></i> Edit
						</Link>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};

export default BorderContainer;
