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
	stakeholderUserListReducer,
	stakeholderLocationListReducer,
	stakeholderSaveReducer,
	stakeholderAssignReducer,
	stakeholderProjectListReducer,
	stakeholderListDropdownReducer,
} from './stakeholderReducer';
import {
	organizationAddReducer,
	organizationDetailsReducer,
	organizationUpdateReducer,
	organizationDeleteReducer,
	organizationProjectListReducer,
	organizationLocationListReducer,
	organizationStakeholderListReducer,
	organizationAssignmentReducer,
	organizationDropdownReducer,
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
	locationListDropdownReducer,
	locationDropdownReducer,
	locationsAssignReducer,
	locationAssignReducer,
} from './locationReducer';
import {
	newsAddReducer,
	newsDeleteReducer,
	newsDetailsReducer,
	newsUpdateReducer,
	newsListLocationReducer,
	newsListOrganizationReducer,
	newsListProjectReducer,
	newsListStakeholderReducer,
} from './newsReducer';
import {
	documentAddReducer,
	documentDetailsReducer,
	documentDeleteReducer,
	documentUpdateReducer,
	documentListProjectReducer,
	documentListLocationReducer,
	documentListOrganizationReducer,
	documentListStakeholderReducer,
} from './documentReducer';

import { routeSaveReducer, breadCrumbSaveReducer } from './routeReducer';
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
	stakeholderUserList: stakeholderUserListReducer,
	stakeholderLocationList: stakeholderLocationListReducer,
	stakeholderProjectList: stakeholderProjectListReducer,
	stakeholderSave: stakeholderSaveReducer,
	stakeholderAssign: stakeholderAssignReducer,
	stakeholderListDropdown: stakeholderListDropdownReducer,

	// organization reducers
	organizationAdd: organizationAddReducer,
	organizationDetails: organizationDetailsReducer,
	organizationUpdate: organizationUpdateReducer,
	organizationDelete: organizationDeleteReducer,
	organizationProjectList: organizationProjectListReducer,
	organizationLocationList: organizationLocationListReducer,
	organizationStakeholderList: organizationStakeholderListReducer,
	organizationAssignment: organizationAssignmentReducer,
	organizationDropdown: organizationDropdownReducer,

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
	locationAssign: locationAssignReducer,
	locationsAssign: locationsAssignReducer,
	locationListDropdown: locationListDropdownReducer,
	locationDropdown: locationDropdownReducer,

	// news reducers
	newsAdd: newsAddReducer,
	newsDelete: newsDeleteReducer,
	newsDetails: newsDetailsReducer,
	newsUpdate: newsUpdateReducer,
	newsListLocation: newsListLocationReducer,
	newsListOrganization: newsListOrganizationReducer,
	newsListProject: newsListProjectReducer,
	newsListStakeholder: newsListStakeholderReducer,

	// document reducers
	documentAdd: documentAddReducer,
	documentDetails: documentDetailsReducer,
	documentDelete: documentDeleteReducer,
	documentUpdate: documentUpdateReducer,
	documentListProject: documentListProjectReducer,
	documentListLocation: documentListLocationReducer,
	documentListOrganization: documentListOrganizationReducer,
	documentListStakeholder: documentListStakeholderReducer,

	// route reducer
	routeSave: routeSaveReducer,

	// breadcrumb reducer
	breadCrumbSave: breadCrumbSaveReducer,

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
		'stakeholderListDropdown',
		'locationListDropdown',
		'organizationDropdown',
		'routeSave',
	],
};

export default persistReducer(persistConfig, rootReducer);
