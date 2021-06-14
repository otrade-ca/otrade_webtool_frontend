import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { listOrganizations } from '../../application/actions/organizationAction';
import { setAlert } from '../../application/actions/alertActions';
import { getLocationId } from '../../application/localStorage';

const OrganizationDropdown = ({ setMessage, label }) => {
	const locationId = getLocationId();

	//get list of organizations
	const dispatch = useDispatch();
	const organizationList = useSelector((state) => state.organizationList);
	const { organizations } = organizationList;

	// use state
	const [orgs, setOrgs] = useState([{ organization: '' }]);

	// add select field
	const addHandler = () => {
		setOrgs([...orgs, { organization: '' }]);
	};

	useEffect(() => {
		dispatch(listOrganizations(locationId));
	}, [dispatch, locationId]);

	// filter out element
	const removeHandler = (i) => {
		// identify org
		const orgToRemove = orgs[i];
		// return all orgs that are not orgToRemove
		const list = orgs.filter((i) => i !== orgToRemove);
		// update list
		setOrgs(list);
	};

	// add element to array
	const handleInputChange = (e, i) => {
		e.preventDefault();

		// spread all orgs to a list
		const list = [...orgs];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			dispatch(
				setAlert(
					'Please make sure not to add the same organization twice',
					'danger'
				)
			);
		} else {
			list[i] = e.target.value;
			//dispatch(assignOrg(list)); // add to state
			setOrgs(list); // add selected drop down to list
		}
	};

	return (
		<Row className="mt-4">
			<Col md={8}>
				<Form.Label>{label}</Form.Label>
				{orgs &&
					orgs.map((org, i) => (
						<Row key={i}>
							<Col md={9}>
								<Form.Control
									as="select"
									value={org._id}
									onChange={(e) => handleInputChange(e, i)}
									className="px-5 mb-2"
								>
									<option value="">--Select--</option>
									{organizations &&
										organizations.map((stakeholder) => (
											<option key={stakeholder._id} value={stakeholder._id}>
												{stakeholder.firstName} {stakeholder.lastName}
											</option>
										))}
								</Form.Control>
							</Col>
							<Col md={3} className="mb-2">
								{orgs && orgs.length !== 1 && (
									<Button
										variant="danger"
										className="btn-md mr-3"
										onClick={() => removeHandler(i)}
									>
										<i className="fas fa-trash"></i> Remove
									</Button>
								)}
								{orgs && orgs.length - 1 === i && (
									<Button className="px-3" onClick={() => addHandler(i)}>
										<i className="fas fa-plus"></i> Organization
									</Button>
								)}
							</Col>
						</Row>
					))}
			</Col>
		</Row>
	);
};

export default OrganizationDropdown;
