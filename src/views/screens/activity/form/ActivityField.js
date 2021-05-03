// Activity Field contains the logic to handle an Activity Field Input
import React from 'react';

export default ({ input, label }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
		</div>
	);
};
