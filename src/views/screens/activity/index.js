import { lazy } from 'react';
const Activities = lazy(() => import('./Activities'));
const ActivityAdd = lazy(() => import('./ActivityAdd'));
const ActivityView = lazy(() => import('./ActivityView'));
const ActivityEdit = lazy(() => import('./ActivityEdit'));

export { Activities, ActivityAdd, ActivityView, ActivityEdit };
