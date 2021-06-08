import EditStakeholderScreen from './EditStakeholderScreen';
import ListStakeholderOrganizations from '../organization/ListStakeholderOrganizations';
import Activities from '../activity/Activities';
import ActivityView from '../activity/ActivityView';
import ActivityEdit from '../activity/ActivityEdit';
import ViewStakeholderScreen from '../stakeholder/ViewStakeholderScreen';
import OrganizationScreen from '../organization/OrganizationScreen';
import ViewOrganization from '../organization/ViewOrganization';
import FormDetails from '../commitment/FormDetails';
import StakeholderInfluences from '../influence/StakeholderInfluences';

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
	{
		link: '/assessments',
		type: 'Assessments',
	},
];

export const routes = [
	{
		path: '/',
		component: ({ match }) => <ViewStakeholderScreen match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <EditStakeholderScreen match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <ViewStakeholderScreen match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <EditStakeholderScreen match={match} />,
	},
	{
		path: '/organizations/search/:keyword',
		component: ({ match }) => <ListStakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations/page/:pageNumber',
		component: ({ match }) => <ListStakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword/page/:pageNumber',
		component: ({ match }) => <ListStakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <ListStakeholderOrganizations match={match} />,
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
		path: '/activities',
		component: ({ match }) => <Activities match={match} />,
	},
	{
		path: '/activities/:activityId/view',
		component: ({ match }) => <ActivityView match={match} />,
	},
	{
		path: '/activities/:activityId/view/edit',
		component: ({ match }) => <ActivityEdit match={match} />,
	},
	{
		path: '/activities/:activityId/commitment',
		component: ({ match }) => <FormDetails match={match} />,
	},
	{
		path: '/assessments',
		component: ({ match }) => <StakeholderInfluences match={match} />,
	},
];
