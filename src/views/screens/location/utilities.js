import Dashboard from '../../components/Dashboard';
import StepForm from '../landownership/StepForm';
import LandownershipList from '../landownership/LandownershipList';
import AddOrganizationScreen from '../organization/AddOrganizationScreen';
import ListOrganizations from '../organization/ListOrganizations';
import OrganizationScreen from '../organization/OrganizationScreen';
import StakeholderForm from '../stakeholder/StakeholderForm';
import StakeholdersList from '../stakeholder/StakeholdersList';
import EditLocation from './EditLocation';
import EditLocationPhoto from './EditLocationPhoto';
import ViewLocation from './ViewLocation';
import ViewOrganization from '../organization/ViewOrganization';
import StakeholderContactInfo from '../stakeholder/StakeHolderContactInfo';
import InfluenceForm from '../influence/InfluenceForm';

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
		link: '/landownerships',
		type: 'Landownership',
	},
];

export const routes = [
	{
		path: '',
		component: ({ match }) => <ViewLocation match={match} />,
	},
	{
		path: '/edit',
		component: ({ match }) => <EditLocation match={match} />,
	},
	{
		path: '/profile',
		component: ({ match }) => <ViewLocation match={match} />,
	},
	{
		path: '/profile/edit',
		component: ({ match }) => <EditLocation match={match} />,
	},
	{
		path: '/photo',
		component: ({ match }) => <EditLocationPhoto match={match} />,
	},
	{
		path: '/organizations',
		component: ({ match }) => <ListOrganizations match={match} />,
	},
	{
		path: '/organizations/register',
		component: ({ match }) => <AddOrganizationScreen match={match} />,
	},
	{
		path: '/influences/register',
		component: ({ match }) => <InfluenceForm match={match} />,
	},
	{
		path: '/organizations/:id/profile',
		component: ({ match }) => <ViewOrganization match={match} />,
	},
	{
		path: '/organizations/:id/profile/edit',
		component: ({ match }) => <OrganizationScreen match={match} />,
	},
	{
		path: '/stakeholders',
		component: ({ match }) => <StakeholdersList match={match} />,
	},
	{
		path: '/stakeholders/register',
		component: ({ match }) => <StakeholderContactInfo match={match} />,
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
