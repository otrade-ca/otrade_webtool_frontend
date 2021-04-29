import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { assignStakeholder } from '../../application/actions/stakeholderActions';
import { setAlert } from '../../application/actions/alertActions';

const MemberDropdown = ({ setMessage, label }) => {
	// get list of stakeholders
	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { stakeholders } = stakeholderList;

	console.log(stakeholders);

	// useState
	const [members, setMembers] = useState([{ member: '' }]);

	//add select field
	const addHandler = () => {
		setMembers([...members, { member: '' }]);
	};

	// filter out element i and update members
	const removeHandler = (i) => {
		const stakeholderToRemove = members[i];
		const list = members.filter((i) => i !== stakeholderToRemove);
		setMembers(list);
	};

	// add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();

		// spread all members into a list
		const list = [...members];

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
			setMembers(list); // add selected drop down to list
		}
	};

	return (
		<Row className="mt-4">
			<Col md={8}>
				<Form.Label>{label}</Form.Label>
				{members &&
					members.map((assignee, i) => (
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
								{members && members.length !== 1 && (
									<Button
										variant="danger"
										className="btn-md mr-3"
										onClick={() => removeHandler(i)}
									>
										<i className="fas fa-trash"></i> Remove
									</Button>
								)}
								{members && members.length - 1 === i && (
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

export default MemberDropdown;
