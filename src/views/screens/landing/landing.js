import { lazy } from 'react';
const HomePage = lazy(() => import('./HomePage'));
const LoginPage = lazy(() => import('./LoginPage'));

export { HomePage, LoginPage };
