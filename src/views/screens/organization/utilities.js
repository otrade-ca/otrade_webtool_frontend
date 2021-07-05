import FormView from './FormView';
import FormEdit from './FormEdit';
import UploadPhoto from './UploadPhoto';
import OrganizationNews from '../news/OrganizationNews';
import NewsEdit from '../news/NewsEdit';
import NewsView from '../news/NewsView';

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
		path: '/profile',
		component: ({ match }) => <FormView match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <FormEdit match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <FormEdit match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <UploadPhoto match={match} />,
	},
	{
		path: '/news',
		component: ({ match }) => <OrganizationNews match={match} />,
	},
	{
		path: '/news/search/:keyword',
		component: ({ match }) => <OrganizationNews match={match} />,
	},
	{
		path: '/news/page/:pageNumber',
		component: ({ match }) => <OrganizationNews match={match} />,
	},
	{
		path: '/news/search/:keyword/page/:pageNumber',
		component: ({ match }) => <OrganizationNews match={match} />,
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
