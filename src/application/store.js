import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import {
	projectListReducer,
	projectDetailsReducer,
	projectUpdateReducer,
	projectAddReducer,
	projectDeleteReducer,
	projectUserReducer,
	projectUserAssignmentReducer,
	projectSaveReducer,
} from './reducers/projectReducers';
import {
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
	userDeleteReducer,
} from './reducers/userReducer';
import {
	stakeholderAddReducer,
	stakeholderDetailsReducer,
	stakeholderUpdateReducer,
	stakeholderDeleteReducer,
	stakeholderListReducer,
	stakeholderUserListReducer,
	stakeholderLocationListReducer,
	stakeholderSaveReducer,
	stakeholderAssignReducer,
} from './reducers/stakeholderReducer';
import {
	organizationAddReducer,
	organizationDetailsReducer,
	organizationUpdateReducer,
	organizationDeleteReducer,
	organizationListReducer,
	organizationStakeholderListReducer,
	organizationAssignmentReducer,
} from './reducers/organizationReducer';
import {
	activityAddReducer,
	activityDetailsReducer,
	activityUpdateReducer,
	activityDeleteReducer,
	activityListReducer,
	activitySaveReducer,
	activityStakeholderListReducer,
} from './reducers/activityReducer';
import {
	commentAddReducer,
	commentDetailsReducer,
	commentUpdateReducer,
	commentDeleteReducer,
	commentListReducer,
} from './reducers/commentReducer';
import {
	influenceAddReducer,
	influenceDeleteReducer,
	influenceDetailsReducer,
	influenceListReducer,
} from './reducers/influenceReducer';
import {
	commitmentAddReducer,
	commitmentDetailsReducer,
	commitmentUpdateReducer,
	commitmentDeleteReducer,
	commitmentListReducer,
} from './reducers/commitmentReducer';
import {
	communityAddReducer,
	communityDetailsReducer,
	communityUpdateReducer,
	communityDeleteReducer,
	communityListReducer,
} from './reducers/communityReducer';
import {
	landownershipAddReducer,
	landownershipDetailsReducer,
	landownershipUpdateReducer,
	landownershipDeleteReducer,
	landownershipListReducer,
} from './reducers/landownershipReducer';
import {
	locationAddReducer,
	locationDetailsReducer,
	locationUpdateReducer,
	locationDeleteReducer,
	locationListReducer,
	locationUserListReducer,
} from './reducers/locationReducer';

import { alertReducer } from './reducers/alertReducer';
import { geocodeFetchReducer } from './reducers/geocodeReducer';

// reducers
const reducer = combineReducers({
	// user reducers
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,

	// project reducers
	projectAdd: projectAddReducer,
	projectDetails: projectDetailsReducer,
	projectUpdate: projectUpdateReducer,
	projectDelete: projectDeleteReducer,
	projectList: projectListReducer,
	projectUser: projectUserReducer,
	projectUserAssignment: projectUserAssignmentReducer,
	projectSave: projectSaveReducer,

	// stakeholder reducers
	stakeholderAdd: stakeholderAddReducer,
	stakeholderDetails: stakeholderDetailsReducer,
	stakeholderUpdate: stakeholderUpdateReducer,
	stakeholderDelete: stakeholderDeleteReducer,
	stakeholderList: stakeholderListReducer,
	stakeholderUserList: stakeholderUserListReducer,
	stakeholderLocationList: stakeholderLocationListReducer,
	stakeholderSave: stakeholderSaveReducer,
	stakeholderAssign: stakeholderAssignReducer,

	// organization reducers
	organizationAdd: organizationAddReducer,
	organizationDetails: organizationDetailsReducer,
	organizationUpdate: organizationUpdateReducer,
	organizationDelete: organizationDeleteReducer,
	organizationList: organizationListReducer,
	organizationStakeholderList: organizationStakeholderListReducer,
	organizationAssignment: organizationAssignmentReducer,

	// activity reducers
	activityAdd: activityAddReducer,
	activityDetails: activityDetailsReducer,
	activityUpdate: activityUpdateReducer,
	activityDelete: activityDeleteReducer,
	activityList: activityListReducer,
	activitySave: activitySaveReducer,
	activityStakeholderList: activityStakeholderListReducer,

	// comment reducers
	commentAdd: commentAddReducer,
	commentDetails: commentDetailsReducer,
	commentUpdate: commentUpdateReducer,
	commentDelete: commentDeleteReducer,
	commentList: commentListReducer,

	// commitment reducers
	commitmentAdd: commitmentAddReducer,
	commitmentDetails: commitmentDetailsReducer,
	commitmentUpdate: commitmentUpdateReducer,
	commitmentDelete: commitmentDeleteReducer,
	commitmentList: commitmentListReducer,

	// community reducers
	communityAdd: communityAddReducer,
	communityDetails: communityDetailsReducer,
	communityUpdate: communityUpdateReducer,
	communityDelete: communityDeleteReducer,
	communityList: communityListReducer,

	// influence reducers
	influenceAdd: influenceAddReducer,
	influenceDelete: influenceDeleteReducer,
	influenceDetails: influenceDetailsReducer,
	influenceList: influenceListReducer,

	// landownership reducers
	landownershipAdd: landownershipAddReducer,
	landownershipDetails: landownershipDetailsReducer,
	landownershipUpdate: landownershipUpdateReducer,
	landownershipDelete: landownershipDeleteReducer,
	landownershipList: landownershipListReducer,

	// location reducers
	locationAdd: locationAddReducer,
	locationDetails: locationDetailsReducer,
	locationUpdate: locationUpdateReducer,
	locationDelete: locationDeleteReducer,
	locationList: locationListReducer,
	locationUserList: locationUserListReducer,

	// alert reducer
	alertReducer,

	// geocode reducer
	geocodeFetch: geocodeFetchReducer,
});

// localStorages
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const projectInfoFromStorage = localStorage.getItem('projectDetailsInfo')
	? JSON.parse(localStorage.getItem('projectDetailsInfo'))
	: null;

const stakeholderListInfoFromStorage = localStorage.getItem(
	'stakeholderListInfo'
)
	? JSON.parse(localStorage.get('stakeholderListInfo'))
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

	// saves project to projectDetails reducer
	projectDetails: { project: projectInfoFromStorage },

	// saves organizations to organizationList reducer
	organizationList: { organizations: organizationsListInfoFromStorage },

	// saves stakeholders to stakeholderList reducer
	stakeholderList: { stakeholders: stakeholderListInfoFromStorage },
};

const middleware = [thunk];

// create store with reducer and persistedState
const store = createStore(
	reducer,
	persistedState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
