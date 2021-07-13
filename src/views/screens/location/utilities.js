import StepForm from '../landownership/StepForm';
import LandownershipList from '../landownership/LandownershipList';
import LocationOrganizations from '../organization/LocationOrganizations';
import LocationStakeholders from '../stakeholder/LocationStakeholders';
import LocationNews from '../news/LocationNews';
import NewsView from '../news/NewsView';
import NewsEdit from '../news/NewsEdit';
import { LocationEdit, LocationView, UploadPhoto } from './';

export const btnlinks = [
	{
		link: '/photo',
		class: 'btn btn-primary mr-3',
		icon: 'fas fa-edit',
		type: 'Photo',
	},
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
		component: ({ match }) => <LocationView match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <LocationEdit match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <LocationEdit match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <LocationView match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <LocationEdit match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <UploadPhoto match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <LocationOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword',
		component: ({ match }) => <LocationOrganizations match={match} />,
	},
	{
		path: '/organizations/page/:pageNumber',
		component: ({ match }) => <LocationOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword/page/:pageNumber',
		component: ({ match }) => <LocationOrganizations match={match} />,
	},
	{
		path: '/stakeholders',
		component: ({ match }) => <LocationStakeholders match={match} />,
	},
	{
		path: '/stakeholders/search/:keyword',
		component: ({ match }) => <LocationStakeholders match={match} />,
	},
	{
		path: '/stakeholders/page/:pageNumber',
		component: ({ match }) => <LocationStakeholders match={match} />,
	},
	{
		path: '/stakeholders/search/:keyword/page/:pageNumber',
		component: ({ match }) => <LocationStakeholders match={match} />,
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
	{
		path: '/news/:newsId/view',
		component: ({ match }) => <NewsView match={match} />,
	},
	{
		path: '/news/:newsId/view/edit',
		component: ({ match }) => <NewsEdit match={match} />,
	},
];
