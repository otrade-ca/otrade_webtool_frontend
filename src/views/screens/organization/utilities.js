import { OrganizationView, OrganizationEdit, UploadPhoto } from './';
import { NewsView, NewsEdit, OrganizationNews } from '../news';
import { OrganizationDocuments, DocumentView, DocumentEdit } from '../document';

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
		component: ({ match }) => <OrganizationView match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <OrganizationView match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <OrganizationEdit match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <OrganizationEdit match={match} />,
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
	{
		path: '/documents',
		component: ({ match }) => <OrganizationDocuments match={match} />,
	},
	{
		path: '/documents/search/:keyword',
		component: ({ match }) => <OrganizationDocuments match={match} />,
	},
	{
		path: '/documents/page/:pageNumber',
		component: ({ match }) => <OrganizationDocuments match={match} />,
	},
	{
		path: '/documents/search/:keyword/page/:pageNumber',
		component: ({ match }) => <OrganizationDocuments match={match} />,
	},
	{
		path: '/documents/:documentId/view',
		component: ({ match }) => <DocumentView match={match} />,
	},
	{
		path: '/documents/:documensId/view/edit',
		component: ({ match }) => <DocumentEdit match={match} />,
	},
];
