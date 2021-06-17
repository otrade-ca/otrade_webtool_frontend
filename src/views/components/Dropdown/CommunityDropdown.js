import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { listDropdownLocations } from '../../../application/actions/locationActions';
import { assignLocation } from '../../../application/actions/locationActions';

const CommunityDropDown = ({ label, id }) => {
	// get list of stakeholders
	const dispatch = useDispatch();
	const locationListDropdown = useSelector(
		(state) => state.locationListDropdown
	);
	const { locations } = locationListDropdown;

	// useState
	const [community, setCommunity] = useState();

	useEffect(() => {
		dispatch(listDropdownLocations(id));
	}, [dispatch, id]);

	const handleInputChange = (target) => {
		setCommunity(target);
		dispatch(assignLocation(target));
	};

	return (
		<Row className="mt-4">
			<Col md={8}>
				<Form.Label>{label}</Form.Label>
				<Row>
					<Col md={9}>
						<Form.Control
							as="select"
							value={community}
							onChange={(e) => handleInputChange(e.target.value)}
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
				</Row>
			</Col>
		</Row>
	);
};

export default withRouter(CommunityDropDown);
