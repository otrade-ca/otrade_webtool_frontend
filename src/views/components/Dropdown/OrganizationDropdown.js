import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { listDropdownOrganizations } from '../../../application/actions/organizationAction';
import { setAlert } from '../../../application/actions/alertActions';

const OrganizationDropdown = ({ label, locationId }) => {
	//get list of organizations
	const dispatch = useDispatch();
	const organizationList = useSelector((state) => state.organizationList);
	const { organizations } = organizationList;

	// use state
	const [organization, setOrganization] = useState();

	useEffect(() => {
		dispatch(listDropdownOrganizations(locationId));
	}, [dispatch, locationId]);

	// add element to array
	const handleInputChange = (e) => {
		e.preventDefault();
		setOrganization(e);
		//dispatch();
	};

	return (
		<Row className="mt-4">
			<Col md={8}>
				<Form.Label>{label}</Form.Label>
				<Row>
					<Col md={9}>
						<Form.Control
							as="select"
							value={organization}
							onChange={(e) => handleInputChange(e.target.value)}
							className="px-5 mb-2"
						>
							<option value="">--Select--</option>
							{/* {organizations &&
								organizations.map((organization) => (
									<option key={organization._id} value={organization._id}>
										{organization.name}
									</option>
								))} */}
						</Form.Control>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default OrganizationDropdown;
