/**
 * Dropdown displaying all members in a project
 */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {
	assignStakeholder,
	listStakeholdersDropdown,
} from '../../../application/actions/stakeholderActions';
import { setAlert } from '../../../application/actions/alertActions';
import { getProjectId } from '../../../application/localStorage';
import { Loader, Message } from '../../components/HelperComponents';
import { IconContext } from 'react-icons';
import * as BsIcons from 'react-icons/bs';

const MemberDropdownProject = ({ label }) => {
	// get projectId from localstorage
	const projectId = getProjectId();
	// get list of stakeholders
	const dispatch = useDispatch();
	const stakeholderListDropdown = useSelector(
		(state) => state.stakeholderListDropdown
	);
	const { loading, stakeholders, error } = stakeholderListDropdown;

	// useState
	const [members, setMembers] = useState([{ member: '' }]);

	useEffect(() => {
		dispatch(listStakeholdersDropdown(projectId));
	}, [dispatch, projectId]);

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
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<Row className="mt-2">
					<Col md={12}>
						<Form.Label>{label}</Form.Label>
						{members &&
							members.map((assignee, i) => (
								<Row key={i}>
									<Col md={7}>
										<Form.Control
											as="select"
											value={assignee._id}
											onChange={(e) => handleInputChange(e, i)}
											className="px-5 mb-2"
										>
											<option value="">--Select--</option>
											{stakeholders &&
												stakeholders.map((stakeholder, index) => (
													<option key={index} value={stakeholder._id}>
														{stakeholder.firstName} {stakeholder.lastName}
													</option>
												))}
										</Form.Control>
									</Col>
									<Col md={5} className="mb-2">
										{members && members.length !== 1 && (
											<Button
												variant="danger"
												className="btn-md mr-3"
												onClick={() => removeHandler(i)}
											>
												<IconContext.Provider
													value={{ color: '#eeee', size: '1em' }}
												>
													<BsIcons.BsTrash />
												</IconContext.Provider>
											</Button>
										)}
										{members && members.length - 1 === i && (
											<Button className="px-3" onClick={() => addHandler(i)}>
												<IconContext.Provider
													value={{ color: '#eeee', size: '1.5em' }}
												>
													<BsIcons.BsPersonPlus />
												</IconContext.Provider>
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

export default withRouter(MemberDropdownProject);
