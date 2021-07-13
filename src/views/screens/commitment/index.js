import { lazy } from 'react';

const CommitmentAdd = lazy(() => import('./CommitmentAdd'));
const CommitmentEdit = lazy(() => import('./CommitmentEdit'));
const CommitmentView = lazy(() => import('./CommitmentView'));

export { CommitmentAdd, CommitmentEdit, CommitmentView };
