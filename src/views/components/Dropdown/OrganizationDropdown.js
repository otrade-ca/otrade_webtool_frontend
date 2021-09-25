/**
 * Dropdown displaying all organizations in a project
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {
	listDropdownOrganizations,
	assignOrganization,
} from '../../../application/actions/organizationAction';
import { setAlert } from '../../../application/actions/alertActions';
import { Loader, Message } from '../../components/HelperComponents';

const OrganizationDropdown = ({ label, projectId }) => {
	// get list of organizations
	const dispatch = useDispatch();
	const organizationDropdown = useSelector(
		(state) => state.organizationDropdown
	);
	const { loading, error, organizations: orgs } = organizationDropdown;

	// use state
	const [organizations, setOrganizations] = useState([{ organization: '' }]);

	useEffect(() => {
		dispatch(listDropdownOrganizations(projectId));
	}, [dispatch, projectId]);

	// handles add
	const addHandler = () => {
		setOrganizations([...organizations, { organization: '' }]);
	};

	// filter out element i and update members
	const removeHandler = (i) => {
		const orgToRemove = organizations[i];
		const list = organizations.filter((i) => i !== orgToRemove);
		setOrganizations(list);
	};

	const handleInputChange = (e, i) => {
		// prevent default
		e.preventDefault();

		// spread all organizations into a list
		const list = [...organizations];

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
			list[i] = e.target.value;
			dispatch(assignOrganization(list));
			setOrganizations(list);
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<Row className="mt-2">
					<Col md={12}>
						<Form.Label>{label}</Form.Label>
						{organizations &&
							organizations.map((assignee, i) => (
								<Row key={i}>
									<Col md={7}>
										<Form.Control
											as="select"
											value={assignee._id}
											onChange={(e) => handleInputChange(e, i)}
											className="px-5 mb-2"
										>
											<option value="">--Select--</option>
											{orgs &&
												orgs.map((organization) => (
													<option
														key={organization._id}
														value={organization._id}
													>
														{organization.name}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={5} className="mb-2">
										{organizations && organizations.length !== 1 && (
											<Button
												variant="danger"
												className="btn-md mr-3"
												onClick={() => removeHandler(i)}
											>
												<i className="fas fa-trash"></i> Remove
											</Button>
										)}
										{organizations && organizations.length - 1 === i && (
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

export default OrganizationDropdown;
