import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
const UserListScreen = lazy(() => import('../../screens/user/UserListScreen'));
const ListProjectScreen = lazy(() =>
	import('../../screens/project/ListProjectScreen')
);
const ProjectEditScreen = lazy(() =>
	import('../../screens/project/ProjectEditScreen')
);
const AdminEditUserProfileScreen = lazy(() =>
	import('../../screens/user/AdminEditUserProfileScreen')
);
const UserAddScreen = lazy(() => import('../../screens/user/UserAddScreen'));
const ProjectAddScreen = lazy(() =>
	import('../../screens/project/ProjectAddScreen')
);
const AdminPrivateRoute = lazy(() => import('../Routing/AdminPrivateRoute'));
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
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/search/:keyword"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/page/:pageNumber"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/search/:keyword/page/:pageNumber"
				component={ListProjectScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/projects/add"
				component={ProjectAddScreen}
			/>
			<AdminPrivateRoute
				exact
				path="/admin/project/:id/edit"
				component={ProjectEditScreen}
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
