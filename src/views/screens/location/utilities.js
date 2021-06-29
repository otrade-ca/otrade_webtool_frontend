import StepForm from '../landownership/StepForm';
import LandownershipList from '../landownership/LandownershipList';
import ListOrganizations from '../organization/ListOrganizations';
import OrganizationScreen from '../organization/OrganizationScreen';
import StakeholdersList from '../stakeholder/StakeholdersList';
import FormEdit from './FormEdit';
import PhotoEdit from './PhotoEdit';
import FormView from './FormView';
import ViewOrganization from '../organization/ViewOrganization';
import LocationNews from '../news/LocationNews';

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
	{
		link: '/news',
		type: 'News',
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
		path: '/organizations/search/:keyword',
		component: ({ match }) => <ListOrganizations match={match} />,
	},
	{
		path: '/organizations/page/:pageNumber',
		component: ({ match }) => <ListOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword/page/:pageNumber',
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
		path: '/stakeholders/search/:keyword',
		component: ({ match }) => <StakeholdersList match={match} />,
	},
	{
		path: '/stakeholders/page/:pageNumber',
		component: ({ match }) => <StakeholdersList match={match} />,
	},
	{
		path: '/stakeholders/search/:keyword/page/:pageNumber',
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
	{
		path: '/news',
		component: ({ match }) => <LocationNews match={match} />,
	},
	{
		path: '/news/search/:keyword',
		component: ({ match }) => <LocationNews match={match} />,
	},
	{
		path: '/news/page/:pageNumber',
		component: ({ match }) => <LocationNews match={match} />,
	},
	{
		path: '/news/search/:keyword/page/:pageNumber',
		component: ({ match }) => <LocationNews match={match} />,
	},
];
