import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import {
	filterProjects,
	clearProjectsFilter,
} from '../../application/actions/projectActions';
import {
	filterProjectStakeholders,
	clearProjectStakeholdersFilter,
	filterUserStakeholders,
	clearUserStakeholdersFilter,
} from '../../application/actions/stakeholderActions';
import {
	filterProjectOrganizations,
	filterStakeholderOrganizations,
	clearProjectOrganizationsFilter,
	clearStakeholderOrganizationsFilter,
} from '../../application/actions/organizationAction';
import {
	filterProjectActivities,
	clearProjectActivitiesFilter,
	filterStakeholderActivities,
	clearStakeholderActivitiesFilter,
} from '../../application/actions/activityActions';
import {
	filterUserLocations,
	clearUserLocationsFilter,
} from '../../application/actions/locationActions';

const FilterBox = ({ searchWord }) => {
	// define state
	const [keyword, setKeyword] = useState('');

	// dispatch
	const dispatch = useDispatch();

	// return filter method corresponding to
	// project, stakeholder, organizations, or activities
	const filterSearch = (keyword, searchWord) => {
		switch (searchWord) {
			case 'Projects':
				return dispatch(filterProjects(keyword));
			case 'Stakeholders':
				return dispatch(filterProjectStakeholders(keyword));
			case 'Organizations':
				return dispatch(filterProjectOrganizations(keyword));
			case 'StakeholderOrganizations':
				return dispatch(filterStakeholderOrganizations(keyword));
			case 'Activities':
				return dispatch(filterProjectActivities(keyword));
			case 'StakeholderActivities':
				return dispatch(filterStakeholderActivities(keyword));
			case 'UserStakeholders':
				return dispatch(filterUserStakeholders(keyword));
			case 'Communities':
				return dispatch(filterUserLocations(keyword));
			default:
		}
	};

	// return clear filter method corresponding to
	// project, stakeholder, organizations, or activities
	const clearFilter = (searchWord) => {
		switch (searchWord) {
			case 'Projects':
				return dispatch(clearProjectsFilter());
			case 'Stakeholders':
				return dispatch(clearProjectStakeholdersFilter());
			case 'Organizations':
				return dispatch(clearProjectOrganizationsFilter());
			case 'StakeholderOrganizations':
				return dispatch(clearStakeholderOrganizationsFilter());
			case 'Activities':
				return dispatch(clearProjectActivitiesFilter());
			case 'StakeholderActivities':
				return dispatch(clearStakeholderActivitiesFilter());
			case 'UserStakeholders':
				return dispatch(clearUserStakeholdersFilter(keyword));
			case 'Communities':
				return dispatch(clearUserLocationsFilter(keyword));
			default:
		}
	};

	//onChange eventlistener
	const onChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value);

		//if length is not 0, filter
		if (keyword.length !== 0) {
			//call filterSearch method
			filterSearch(keyword, searchWord);
		} else {
			//call clear filter
			clearFilter(searchWord);
		}
	};

	return (
		<Form className="filter-form" style={{ width: '15rem' }}>
			<Form.Control
				type="text"
				onChange={onChange}
				placeholder={`Filter...`}
			></Form.Control>
		</Form>
	);
};

export default FilterBox;
