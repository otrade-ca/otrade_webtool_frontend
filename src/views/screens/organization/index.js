import { lazy } from 'react';

const OrganizationAdd = lazy(() => import('./OrganizationAdd'));
const OrganizationEdit = lazy(() => import('./OrganizationEdit'));
const OrganizationView = lazy(() => import('./OrganizationView'));
const Landing = lazy(() => import('./Landing'));
const LocationOrganizations = lazy(() => import('./LocationOrganizations'));
const ProjectOrganizations = lazy(() => import('./ProjectOrganizations'));
const StakeholderOrganizations = lazy(() =>
	import('./StakeholderOrganizations')
);
const UploadPhoto = lazy(() => import('./UploadPhoto'));

export {
	OrganizationAdd,
	OrganizationEdit,
	OrganizationView,
	Landing,
	LocationOrganizations,
	ProjectOrganizations,
	StakeholderOrganizations,
	UploadPhoto,
};
