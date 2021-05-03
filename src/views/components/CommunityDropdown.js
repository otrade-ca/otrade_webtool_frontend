import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {
	assignStakeholder,
	listUserStakeholders,
} from '../../application/actions/stakeholderActions';
import { setAlert } from '../../application/actions/alertActions';

const CommunityDropDown = ({ label }) => {
	// get list of stakeholders
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const stakeholderUserList = useSelector((state) => state.stakeholderUserList);
	const { stakeholders } = stakeholderUserList;

	// useState
	const [communities, setCommunities] = useState([{ member: '' }]);

	//add select field
	const addHandler = () => {
		setCommunities([...communities, { member: '' }]);
	};

	useEffect(() => {
		dispatch(listUserStakeholders(userInfo._id));
	}, [dispatch, userInfo]);

	// filter out element i and update communities
	const removeHandler = (i) => {
		const stakeholderToRemove = communities[i];
		const list = communities.filter((i) => i !== stakeholderToRemove);
		setCommunities(list);
	};

	// add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();

		// spread all communities into a list
		const list = [...communities];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			dispatch(
				setAlert(
					'Please make sure not to add the same stakeholder twice',
					'danger'
				)
			);
		} else {
			list[i] = e.target.value;
			dispatch(assignStakeholder(list)); // add to state
			setCommunities(list); // add selected drop down to list
		}
	};

	return (
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
									{stakeholders &&
										stakeholders.map((stakeholder) => (
											<option key={stakeholder._id} value={stakeholder._id}>
												{stakeholder.firstName} {stakeholder.lastName}
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
										<i className="fas fa-plus"></i> Stakeholder
									</Button>
								)}
							</Col>
						</Row>
					))}
			</Col>
		</Row>
	);
};

export default withRouter(CommunityDropDown);
