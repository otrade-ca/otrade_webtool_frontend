import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import { UserProjects, Landing } from '../../screens/project';

const ProjectRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/projects/:id" component={UserProjects} />
			<PrivateRoute path="/project/:id" component={Landing} />
		</Switch>
	);
};

export default ProjectRoutes;
