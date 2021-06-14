import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

const middleware = [thunk];

// create store with reducer and persistedState
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

// create persisted version of store
const persistor = persistStore(store);

export { store, persistor };
