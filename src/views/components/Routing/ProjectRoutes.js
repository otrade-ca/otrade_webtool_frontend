import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Routing/PrivateRoute';
import ProjectScreen from '../../screens/project/ProjectScreen';
import UserProjects from '../../screens/project/UserProjects';

const ProjectRoutes = () => {
	return (
		<Switch>
			<PrivateRoute path="/projects/:id" component={UserProjects} />
			<PrivateRoute path="/project/:id" component={ProjectScreen} />
		</Switch>
	);
};

export default ProjectRoutes;
