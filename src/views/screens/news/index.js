import { lazy } from 'react';

const NewsEdit = lazy(() => import('./NewsEdit'));
const NewsForm = lazy(() => import('./NewsForm'));
const NewsView = lazy(() => import('./NewsView'));
const LocationNews = lazy(() => import('./LocationNews'));
const OrganizationNews = lazy(() => import('./OrganizationNews'));
const ProjectNews = lazy(() => import('./ProjectNews'));
const StakeholderNews = lazy(() => import('./StakeholderNews'));

export {
	NewsEdit,
	NewsForm,
	NewsView,
	LocationNews,
	OrganizationNews,
	ProjectNews,
	StakeholderNews,
};
