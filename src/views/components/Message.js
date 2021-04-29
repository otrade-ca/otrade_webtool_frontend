import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	return (
		<Alert variant={variant} className="my-5">
			<div className="text-xl-center alert-box">{children}</div>
		</Alert>
	);
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
