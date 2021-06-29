/**
 * Dropdown displaying all communities in a project
 */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { listDropdownLocations } from '../../../application/actions/locationActions';
import { assignLocation } from '../../../application/actions/locationActions';
import { setAlert } from '../../../application/actions/alertActions';
import { Loader, Message } from '../../components/HelperComponents';

const CommunityDropDown = ({ label, id }) => {
	// get list of stakeholders
	const dispatch = useDispatch();
	const locationListDropdown = useSelector(
		(state) => state.locationListDropdown
	);
	const { loading, error, locations } = locationListDropdown;

	// useState
	const [communities, setCommunities] = useState([{ community: '' }]);

	//add select field
	const addHandler = () => {
		setCommunities([...communities, { community: '' }]);
	};

	useEffect(() => {
		dispatch(listDropdownLocations(id));
	}, [dispatch, id]);

	// filter out element i and update members
	const removeHandler = (i) => {
		const communitiyToRemove = communities[i];
		const list = communities.filter((i) => i !== communitiyToRemove);
		setCommunities(list);
	};

	const handleInputChange = (e, i) => {
		// prevent default
		e.preventDefault();

		// spread all communities into a list
		const list = [...communities];

		// validate e.target.value
		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			dispatch(
				setAlert(
					'Please make sure not to add the same community twice',
					'danger'
				)
			);
		} else {
			// add e.target.value to list
			list[i] = e.target.value;
			// assign list
			dispatch(assignLocation(list));
			// update communities list
			setCommunities(list);
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<Row className="mt-4">
					<Col md={8}>
						<Form.Label>{label}</Form.Label>
						{communities &&
							communities.map((assignee, i) => (
								<Row key={i}>
									<Col md={9}>
										<Form.Control
											as="select"
											value={assignee._id}
											onChange={(e) => handleInputChange(e, i)}
											className="px-5 mb-2"
										>
											<option value="">--Select--</option>
											{locations &&
												locations.map((location) => (
													<option key={location._id} value={location._id}>
														{location.location}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={3} className="mb-2">
										{communities && communities.length !== 1 && (
											<Button
												variant="danger"
												className="btn-md mr-3"
												onClick={() => removeHandler(i)}
											>
												<i className="fas fa-trash"></i> Remove
											</Button>
										)}
										{communities && communities.length - 1 === i && (
											<Button className="px-3" onClick={() => addHandler(i)}>
												<i className="fas fa-plus"></i> Add
											</Button>
										)}
									</Col>
								</Row>
							))}
					</Col>
				</Row>
			)}
		</>
	);
};

export default withRouter(CommunityDropDown);
