import EditStakeholderScreen from './EditStakeholderScreen';
import ListStakeholderOrganizations from '../organization/ListStakeholderOrganizations';
import Activities from '../activity/Activities';
import ActivityView from '../activity/ActivityView';
import ActivityEdit from '../activity/ActivityEdit';
import ViewStakeholderScreen from '../stakeholder/ViewStakeholderScreen';
import FormDetails from '../commitment/FormDetails';
import StakeholderInfluences from '../influence/StakeholderInfluences';
import Profile from './Profile';
import StakeholderNews from '../news/StakeholderNews';
import NewsView from '../news/NewsView';
import NewsEdit from '../news/NewsEdit';

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
	{
		link: '/news',
		type: 'News',
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
		component: ({ match }) => <Profile match={match} />,
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
		component: ({ match }) => <FormDetails match={match} />,
	},
	{
		path: '/assessments',
		component: ({ match }) => <StakeholderInfluences match={match} />,
	},
	{
		path: '/assessments/search/:keyword',
		component: ({ match }) => <StakeholderInfluences match={match} />,
	},
	{
		path: '/assessments/page/:pageNumber',
		component: ({ match }) => <StakeholderInfluences match={match} />,
	},
	{
		path: '/assessments/search/:keyword/page/:pageNumber',
		component: ({ match }) => <StakeholderInfluences match={match} />,
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
];
