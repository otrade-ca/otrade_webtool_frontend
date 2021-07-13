import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import Landing from '../../screens/project/Landing';
import UserProjects from '../../screens/project/UserProjects';

const ProjectRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/projects/:id" component={UserProjects} />
			<PrivateRoute path="/project/:id" component={Landing} />
		</Switch>
	);
};

export default ProjectRoutes;
