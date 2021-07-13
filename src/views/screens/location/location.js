import { lazy } from 'react';
const LocationAdd = lazy(() => import('./LocationAdd'));
const LocationEdit = lazy(() => import('./LocationEdit'));
const LocationView = lazy(() => import('./LocationView'));
const LandingPage = lazy(() => import('./LandingPage'));
const UploadPhoto = lazy(() => import('./UploadPhoto'));
const ProjectLocations = lazy(() => import('./ProjectLocations'));
const UserLocations = lazy(() => import('./UserLocations'));

export {
	LocationAdd,
	LocationEdit,
	LocationView,
	LandingPage,
	UploadPhoto,
	ProjectLocations,
	UserLocations,
};
