import React from 'react';

const ProfileContainer = ({ title, children }) => {
	return (
		<div className="border-container">
			<div className="title">{title}</div>
			{children}
		</div>
	);
};

export default ProfileContainer;
