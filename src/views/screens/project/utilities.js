import Dashboard from '../../components/Dashboard';
import { UploadPhoto, ProjectView, Actions } from '../project';
import { ProjectLocations } from '../location';
import { ProjectStakeholders } from '../stakeholder';
import { ProjectOrganizations } from '../organization';
import { NewsView, NewsEdit, ProjectNews } from '../news';
import { ProjectDocuments, DocumentAdd } from '../document';

export const btnlinks = [
	{
		link: '/photo',
		class: 'btn btn-primary mr-3',
		icon: 'fas fa-edit',
		type: 'Photo',
	},
	// {
	// 	link: '/actions',
	// 	class: 'btn btn-primary',
	// 	icon: 'fas fa-edit',
	// 	type: 'Actions',
	// },
];

export const navbarlinks = [
	{
		link: '/about',
		type: 'About',
	},
	{
		link: '/communities',
		type: 'Communities',
	},
	// {
	// 	link: '/stakeholders',
	// 	type: 'Stakeholders',
	// },
	// {
	// 	link: '/organizations',
	// 	type: 'Organizations',
	// },
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
		path: '',
		component: ({ match }) => <ProjectView match={match} />,
	},
	// {
	// 	path: '/actions',
	// 	component: ({ match }) => <Actions match={match} />,
	// },
	{
		path: '/dashboard',
		component: ({ match }) => <Dashboard match={match} />,
	},
	{
		path: '/about',
		component: ({ match }) => <ProjectView match={match} />,
	},
	{
		path: '/communities',
		component: ({ match }) => <ProjectLocations match={match} />,
	},
	{
		path: '/communities/search/:keyword',
		component: ({ match }) => <ProjectLocations match={match} />,
	},
	{
		path: '/communities/page/:pageNumber',
		component: ({ match }) => <ProjectLocations match={match} />,
	},
	{
		path: '/communities/search/:keyword/page/:pageNumber',
		component: ({ match }) => <ProjectLocations match={match} />,
	},
	{
		path: '/stakeholders',
		component: ({ match }) => <ProjectStakeholders match={match} />,
	},
	{
		path: '/stakeholders/search/:keyword',
		component: ({ match }) => <ProjectStakeholders match={match} />,
	},
	{
		path: '/stakeholders/page/:pageNumber',
		component: ({ match }) => <ProjectStakeholders match={match} />,
	},
	{
		path: '/stakeholders/search/:keyword/page/:pageNumber',
		component: ({ match }) => <ProjectStakeholders match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <ProjectOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword',
		component: ({ match }) => <ProjectOrganizations match={match} />,
	},
	{
		path: '/organizations/page/:pageNumber',
		component: ({ match }) => <ProjectOrganizations match={match} />,
	},
	{
		path: '/organizations/search/:keyword/page/:pageNumber',
		component: ({ match }) => <ProjectOrganizations match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <UploadPhoto match={match} />,
	},
	{
		path: '/news',
		component: ({ match }) => <ProjectNews match={match} />,
	},
	{
		path: '/news/search/:keyword',
		component: ({ match }) => <ProjectNews match={match} />,
	},
	{
		path: '/news/page/:pageNumber',
		component: ({ match }) => <ProjectNews match={match} />,
	},
	{
		path: '/news/search/:keyword/page/:pageNumber',
		component: ({ match }) => <ProjectNews match={match} />,
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
		component: ({ match }) => <ProjectDocuments match={match} />,
	},
	{
		path: '/documents/upload',
		component: ({ match }) => <DocumentAdd match={match} />,
	},
	{
		path: '/documents/search/:keyword',
		component: ({ match }) => <ProjectDocuments match={match} />,
	},
	{
		path: '/documents/page/:pageNumber',
		component: ({ match }) => <ProjectDocuments match={match} />,
	},
	{
		path: '/documents/search/:keyword/page/:pageNumber',
		component: ({ match }) => <ProjectDocuments match={match} />,
	},
	{
		path: '/documents/:newsId/view',
		component: ({ match }) => <NewsView match={match} />,
	},
	// {
	// 	path: '/documents/:newsId/view/edit',
	// 	component: ({ match }) => <NewsEdit match={match} />,
	// },
];
