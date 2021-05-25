import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

// localStorages
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const stakeholderListInfoFromStorage = localStorage.getItem(
	'stakeholderListInfo'
)
	? JSON.parse(localStorage.getItem('stakeholderListInfo'))
	: null;

const organizationsListInfoFromStorage = localStorage.getItem(
	'organizationsListInfo'
)
	? JSON.parse(localStorage.getItem('organizationsListInfo'))
	: null;

// persistedState for overriding initial reducer states
const persistedState = {
	// saves login to userLogin reducer
	userLogin: { userInfo: userInfoFromStorage },

	// saves organizations to organizationList reducer
	organizationList: { organizations: organizationsListInfoFromStorage },

	// saves stakeholders to stakeholderList reducer
	stakeholderList: { stakeholders: stakeholderListInfoFromStorage },
};

const middleware = [thunk];

// create store with reducer and persistedState
const store = createStore(
	rootReducer,
	// persistedState,
	composeWithDevTools(applyMiddleware(...middleware))
);

// create persisted version of store
const persistor = persistStore(store);

export { store, persistor };
