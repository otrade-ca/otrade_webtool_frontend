import { lazy } from 'react';
const Dashboard = lazy(() => import('./Dashboard'));
const FormAdd = lazy(() => import('./FormAdd'));
const FormEdit = lazy(() => import('./FormEdit'));
const FormView = lazy(() => import('./FormView'));
const LandingPage = lazy(() => import('./LandingPage'));
const PhotoEdit = lazy(() => import('./PhotoEdit'));
const ProjectLocations = lazy(() => import('./ProjectLocations'));
const UserLocations = lazy(() => import('./UserLocations'));

export {
	Dashboard,
	FormAdd,
	FormEdit,
	FormView,
	LandingPage,
	PhotoEdit,
	ProjectLocations,
	UserLocations,
};
