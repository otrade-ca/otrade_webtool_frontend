import { lazy } from 'react';

const Actions = lazy(() => import('./Actions'));
const AdminProjects = lazy(() => import('./AdminProjects'));
const Landing = lazy(() => import('./Landing'));
const ProjectAdd = lazy(() => import('./ProjectAdd'));
const ProjectEdit = lazy(() => import('./ProjectEdit'));
const ProjectView = lazy(() => import('./ProjectView'));
const UploadPhoto = lazy(() => import('./UploadPhoto'));
const UserProjects = lazy(() => import('./UserProjects'));

export {
	Actions,
	AdminProjects,
	Landing,
	ProjectAdd,
	ProjectEdit,
	ProjectView,
	UploadPhoto,
	UserProjects,
};
