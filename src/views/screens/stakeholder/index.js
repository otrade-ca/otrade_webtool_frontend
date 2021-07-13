import { lazy } from 'react';

const Landing = lazy(() => import('./Landing'));
const LocationStakeholders = lazy(() => import('./LocationStakeholders'));
const Profile = lazy(() => import('./Profile'));
const ProjectStakeholders = lazy(() => import('./ProjectStakeholders'));
const StakeholderAdd = lazy(() => import('./StakeholderAdd'));
const StakeholderEdit = lazy(() => import('./StakeholderEdit'));
const StakeholderView = lazy(() => import('./StakeholderView'));
const UploadPhoto = lazy(() => import('./UploadPhoto'));
const UserStakeholders = lazy(() => import('./UserStakeholders'));

export {
	Landing,
	LocationStakeholders,
	Profile,
	ProjectStakeholders,
	StakeholderAdd,
	StakeholderEdit,
	StakeholderView,
	UploadPhoto,
	UserStakeholders,
};
