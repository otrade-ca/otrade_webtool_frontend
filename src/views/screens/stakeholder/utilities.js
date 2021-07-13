import StakeholderEdit from './StakeholderEdit';
import StakeholderOrganizations from '../organization/StakeholderOrganizations';
import Activities from '../activity/Activities';
import ActivityView from '../activity/ActivityView';
import ActivityEdit from '../activity/ActivityEdit';
import StakeholderView from '../stakeholder/StakeholderView';
import CommitmentEdit from '../commitment/CommitmentEdit';
import Influences from '../influence/Influences';
import Profile from './Profile';
import StakeholderNews from '../news/StakeholderNews';
import NewsView from '../news/NewsView';
import NewsEdit from '../news/NewsEdit';
import UploadPhoto from './UploadPhoto';

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
		component: ({ match }) => <Profile match={match} />,
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
];
