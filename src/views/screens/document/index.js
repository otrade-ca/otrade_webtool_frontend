import { lazy } from 'react';

const DocumentAdd = lazy(() => import('./DocumentAdd'));
const DocumentEdit = lazy(() => import('./DocumentEdit'));
const DocumentView = lazy(() => import('./DocumentView'));
const ProjectDocuments = lazy(() => import('./ProjectDocuments'));
const StakeholderDocuments = lazy(() => import('./StakeholderDocuments'));
const OrganizationDocuments = lazy(() => import('./OrganizationDocuments'));
const CommunityDocuments = lazy(() => import('./CommunityDocuments'));

export {
	DocumentAdd,
	DocumentEdit,
	DocumentView,
	ProjectDocuments,
	StakeholderDocuments,
	OrganizationDocuments,
	CommunityDocuments,
};
