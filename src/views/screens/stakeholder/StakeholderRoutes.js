import EditStakeholderScreen from './EditStakeholderScreen';
import EditStakeholderPhoto from './EditStakeholderPhoto';
import ListStakeholderOrganizations from '../organization/ListStakeholderOrganizations';
import ListStakeholderActivities from '../activity/ListStakeholderActivities';
import ActivityScreen from '../activity/ActivityScreen';
import LandownershipList from '../landownership/LandownershipList';
import Dashboard from '../../screens/stakeholder/Dashboard';
import AddOrganizationScreen from '../organization/AddOrganizationScreen';
import ViewStakeholderScreen from '../stakeholder/ViewStakeholderScreen';
import StepForm from '../landownership/StepForm';
import OrganizationScreen from '../organization/OrganizationScreen';
import ViewOrganization from '../organization/ViewOrganization';
import CommitmentDetails from '../commitment/CommitmentDetails';

export const btnlinks = [
	// {
	// 	link: '/photo',
	// 	class: 'btn btn-primary mr-3',
	// 	icon: 'fas fa-edit',
	// 	type: 'Photo',
	// },
	{
		link: '/profile',
		class: 'btn btn-primary',
		icon: 'fas fa-edit',
		type: 'Profile',
	},
];

export const navbarlinks = [
	{
		link: '/organizations',
		type: 'Organizations',
	},
	{
		link: '/activities',
		type: 'Activities',
	},
	// {
	// 	link: '/landownerships',
	// 	type: 'Landownership',
	// },
];

export const routes = [
	{
		path: '',
		component: ({ match }) => <Dashboard match={match} />,
	},
	// {
	// 	path: '/',
	// 	component: ({ match }) => <ViewStakeholderScreen match={match} />,
	// },
	{
		path: '/profile',
		component: ({ match }) => <ViewStakeholderScreen match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <EditStakeholderScreen match={match} />,
	},
	// {
	// 	path: '/photo',
	// 	component: ({ match }) => <EditStakeholderPhoto match={match} />,
	// },
	{
		path: '/organizations',
		component: ({ match }) => <ListStakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations/register',
		component: ({ match }) => <AddOrganizationScreen match={match} />,
	},
	{
		path: '/organizations/:organizationId/profile/view',
		component: ({ match }) => <ViewOrganization match={match} />,
	},
	{
		path: '/organizations/:organizationId/profile/edit',
		component: ({ match }) => <OrganizationScreen match={match} />,
	},
	{
		path: '/activities',
		component: ({ match }) => <ListStakeholderActivities match={match} />,
	},
	{
		path: '/activities/:activityId/profile/view',
		component: ({ match }) => <ActivityScreen match={match} />,
	},
	{
		path: '/activities/:activityId/profile/edit',
		component: ({ match }) => <ListStakeholderActivities match={match} />,
	},
	{
		path: '/activities/:activityId/commitment',
		component: ({ match }) => <CommitmentDetails match={match} />,
	},
	{
		path: '/landownerships',
		component: ({ match }) => <LandownershipList match={match} />,
	},
	{
		path: '/landownerships/register',
		component: ({ match }) => <StepForm match={match} />,
	},
];
