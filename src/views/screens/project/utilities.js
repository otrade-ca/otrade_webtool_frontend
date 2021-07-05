import Dashboard from '../../components/Dashboard';
import EditProjectPhoto from '../project/EditProjectPhoto';
import ProjectDetailsScreen from '../project/ProjectDetailsScreen';
import ProjectLocations from '../location/ProjectLocations';
import ProjectStakeholders from '../stakeholder/ProjectStakeholders';
import OrganizationsProjectList from '../organization/OrganizationsProjectList';
import ProjectNews from '../news/ProjectNews';
import NewsView from '../news/NewsView';
import NewsEdit from '../news/NewsEdit';

export const btnlinks = [
	{
		link: '/photo',
		class: 'btn btn-primary',
		icon: 'fas fa-edit',
		type: 'Photo',
	},
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
	{
		link: '/news',
		type: 'News',
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
		component: ({ match }) => <OrganizationsProjectList match={match} />,
	},
	{
		path: '/organizations/search/:keyword',
		component: ({ match }) => <OrganizationsProjectList match={match} />,
	},
	{
		path: '/organizations/page/:pageNumber',
		component: ({ match }) => <OrganizationsProjectList match={match} />,
	},
	{
		path: '/organizations/search/:keyword/page/:pageNumber',
		component: ({ match }) => <OrganizationsProjectList match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <EditProjectPhoto match={match} />,
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
];
