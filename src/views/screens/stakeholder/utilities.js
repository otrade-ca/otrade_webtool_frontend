import { StakeholderEdit, StakeholderView, Profile, UploadPhoto } from './';
import { StakeholderOrganizations } from '../organization';
import { Activities, ActivityEdit, ActivityView } from '../activity';
import { CommitmentEdit } from '../commitment';
import { Influences } from '../influence';
import { NewsView, NewsEdit, StakeholderNews } from '../news';
import { DocumentEdit, DocumentView, StakeholderDocuments } from '../document';

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
		link: '/activities',
		type: 'Activities',
	},
	{
		link: '/assessments',
		type: 'Assessments',
	},
	{
		link: '/news',
		type: 'News',
	},
	{
		link: '/documents',
		type: 'Documents',
	},
];

export const routes = [
	{
		path: '/',
		component: ({ match }) => <StakeholderView match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <StakeholderEdit match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <UploadPhoto match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <StakeholderView match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <StakeholderEdit match={match} />,
	},
	{
		path: '/organizations/search/:keyword',
		component: ({ match }) => <StakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations/page/:pageNumber',
		component: ({ match }) => <StakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword/page/:pageNumber',
		component: ({ match }) => <StakeholderOrganizations match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <StakeholderOrganizations match={match} />,
	},
	{
		path: '/activities',
		component: ({ match }) => <Activities match={match} />,
	},
	{
		path: '/activities/search/:keyword',
		component: ({ match }) => <Activities match={match} />,
	},
	{
		path: '/activities/page/:pageNumber',
		component: ({ match }) => <Activities match={match} />,
	},
	{
		path: '/activities/search/:keyword/page/:pageNumber',
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
		component: ({ match }) => <CommitmentEdit match={match} />,
	},
	{
		path: '/assessments',
		component: ({ match }) => <Influences match={match} />,
	},
	{
		path: '/assessments/search/:keyword',
		component: ({ match }) => <Influences match={match} />,
	},
	{
		path: '/assessments/page/:pageNumber',
		component: ({ match }) => <Influences match={match} />,
	},
	{
		path: '/assessments/search/:keyword/page/:pageNumber',
		component: ({ match }) => <Influences match={match} />,
	},
	{
		path: '/news',
		component: ({ match }) => <StakeholderNews match={match} />,
	},
	{
		path: '/news/search/:keyword',
		component: ({ match }) => <StakeholderNews match={match} />,
	},
	{
		path: '/news/page/:pageNumber',
		component: ({ match }) => <StakeholderNews match={match} />,
	},
	{
		path: '/news/search/:keyword/page/:pageNumber',
		component: ({ match }) => <StakeholderNews match={match} />,
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
		component: ({ match }) => <StakeholderDocuments match={match} />,
	},
	// {
	// 	path: '/documents/search/:keyword',
	// 	component: ({ match }) => <StakeholderDocuments match={match} />,
	// },
	// {
	// 	path: '/documents/page/:pageNumber',
	// 	component: ({ match }) => <StakeholderDocuments match={match} />,
	// },
	// {
	// 	path: '/documents/search/:keyword/page/:pageNumber',
	// 	component: ({ match }) => <StakeholderDocuments match={match} />,
	// },
	// {
	// 	path: '/documents/:documentId/view',
	// 	component: ({ match }) => <DocumentView match={match} />,
	// },
	// {
	// 	path: '/documents/:documentId/view/edit',
	// 	component: ({ match }) => <DocumentEdit match={match} />,
	// },
];
