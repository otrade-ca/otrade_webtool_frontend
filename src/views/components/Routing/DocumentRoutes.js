import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { DocumentAdd } from '../../screens/document';

const DocumentRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/documents/register" component={DocumentAdd} />
		</Switch>
	);
};

export default DocumentRoutes;
