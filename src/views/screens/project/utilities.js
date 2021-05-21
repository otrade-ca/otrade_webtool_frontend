import Dashboard from '../../components/Dashboard';
import EditProjectPhoto from '../project/EditProjectPhoto';
import ProjectDetailsScreen from '../project/ProjectDetailsScreen';
import LocationList from '../location/LocationList';
import StakeholdersProjectList from '../stakeholder/StakeholdersProjectList';
import OrganizationsProjectList from '../organization/OrganizationsProjectList';
import ViewOrganization from '../organization/ViewOrganization';
import OrganizationScreen from '../organization/OrganizationScreen';

export const btnlinks = [
	// {
	// 	link: '/photo',
	// 	class: 'btn btn-primary',
	// 	icon: 'fas fa-edit',
	// 	type: 'Photo',
	// },
];

export const navbarlinks = [
	{
		link: '/communities',
		type: 'Communities',
	},
	{
		link: '/stakeholders',
		type: 'Stakeholders',
	},
	{
		link: '/organizations',
		type: 'Organizations',
	},
];

export const routes = [
	{
		path: '',
		component: ({ match }) => <ProjectDetailsScreen match={match} />,
	},
	{
		path: '/dashboard',
		component: ({ match }) => <Dashboard match={match} />,
	},
	{
		path: '/about',
		component: ({ match }) => <ProjectDetailsScreen match={match} />,
	},
	{
		path: '/communities',
		component: ({ match }) => <LocationList match={match} />,
	},
	{
		path: '/stakeholders',
		component: ({ match }) => <StakeholdersProjectList match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <OrganizationsProjectList match={match} />,
	},
	{
		path: '/organizations/:organizationId/view',
		component: ({ match }) => <ViewOrganization match={match} />,
	},
	{
		path: '/organizations/:organizationId/view/edit',
		component: ({ match }) => <OrganizationScreen match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <EditProjectPhoto match={match} />,
	},
];
