import StepForm from '../landownership/StepForm';
import LandownershipList from '../landownership/LandownershipList';
import ListOrganizations from '../organization/ListOrganizations';
import OrganizationScreen from '../organization/OrganizationScreen';
import StakeholdersList from '../stakeholder/StakeholdersList';
import FormEdit from './FormEdit';
import PhotoEdit from './PhotoEdit';
import FormView from './FormView';
import ViewOrganization from '../organization/ViewOrganization';

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
		link: '/stakeholders',
		type: 'Stakeholders',
	},
];

export const routes = [
	{
		path: '/',
		component: ({ match }) => <FormView match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <FormEdit match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <FormEdit match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <FormView match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <FormEdit match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <PhotoEdit match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <ListOrganizations match={match} />,
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
		path: '/stakeholders',
		component: ({ match }) => <StakeholdersList match={match} />,
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
