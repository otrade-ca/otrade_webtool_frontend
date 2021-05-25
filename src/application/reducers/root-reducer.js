import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
} from './projectReducers';
import {
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
	userDeleteReducer,
} from './userReducer';
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
	stakeholderProjectListReducer,
} from './stakeholderReducer';
import {
	organizationAddReducer,
	organizationDetailsReducer,
	organizationUpdateReducer,
	organizationDeleteReducer,
	organizationListReducer,
	organizationStakeholderListReducer,
	organizationAssignmentReducer,
} from './organizationReducer';
import {
	activityAddReducer,
	activityDetailsReducer,
	activityUpdateReducer,
	activityDeleteReducer,
	activityListReducer,
	activitySaveReducer,
	activityStakeholderListReducer,
} from './activityReducer';
import {
	commentAddReducer,
	commentDetailsReducer,
	commentUpdateReducer,
	commentDeleteReducer,
	commentListReducer,
} from './commentReducer';
import {
	influenceAddReducer,
	influenceDeleteReducer,
	influenceDetailsReducer,
	influenceListReducer,
} from './influenceReducer';
import {
	commitmentAddReducer,
	commitmentDetailsReducer,
	commitmentUpdateReducer,
	commitmentDeleteReducer,
	commitmentListReducer,
} from './commitmentReducer';
import {
	communityAddReducer,
	communityDetailsReducer,
	communityUpdateReducer,
	communityDeleteReducer,
	communityListReducer,
} from './communityReducer';
import {
	landownershipAddReducer,
	landownershipDetailsReducer,
	landownershipUpdateReducer,
	landownershipDeleteReducer,
	landownershipListReducer,
} from './landownershipReducer';
import {
	locationAddReducer,
	locationDetailsReducer,
	locationUpdateReducer,
	locationDeleteReducer,
	locationListReducer,
	locationUserListReducer,
} from './locationReducer';

import { alertReducer } from './alertReducer';
import { geocodeFetchReducer } from './geocodeReducer';

// reducers
const rootReducer = combineReducers({
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
	stakeholderProjectList: stakeholderProjectListReducer,
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

	// reduxForm
	form: reduxForm,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [
		'userLogin',
		'stakeholderList',
		'stakeholderLocationList',
		'organizationList',
	],
};

export default persistReducer(persistConfig, rootReducer);