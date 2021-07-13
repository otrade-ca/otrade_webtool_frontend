import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import AdminPrivateRoute from '../Routing/AdminPrivateRoute';
import { AdminProjects, ProjectEdit, ProjectAdd } from '../../screens/project';

const UserListScreen = lazy(() => import('../../screens/user/UserListScreen'));
const AdminEditUserProfileScreen = lazy(() =>
	import('../../screens/user/AdminEditUserProfileScreen')
);
const UserAddScreen = lazy(() => import('../../screens/user/UserAddScreen'));
const Assignment = lazy(() => import('../Assignment'));

const AdminRoutes = () => {
	return (
		<Switch>
			{/* USER PATHS */}
			<AdminPrivateRoute
				exact
				path="/admin/userlist"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/search/:keyword"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/page/:pageNumber"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/search/:keyword/page/:pageNumber"
				component={UserListScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/userlist/add"
				component={UserAddScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/user/:id/edit"
				component={AdminEditUserProfileScreen}
			/>

			{/*PROJECT PATHS */}
			<AdminPrivateRoute
				exact
				path="/admin/projects"
				component={AdminProjects}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/search/:keyword"
				component={AdminProjects}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/page/:pageNumber"
				component={AdminProjects}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/search/:keyword/page/:pageNumber"
				component={AdminProjects}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/add"
				component={ProjectAdd}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/project/:id/edit"
				component={ProjectEdit}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/project/:id/assign"
				component={Assignment}
			/>
		</Switch>
	);
};

export default AdminRoutes;
