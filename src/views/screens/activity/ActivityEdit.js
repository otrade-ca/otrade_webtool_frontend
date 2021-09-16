import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	getActivityDetails,
	updateActivity,
} from '../../../application/actions/activityActions';
import { ACTIVITY_UPDATE_RESET } from '../../../application/constants/activityConstants';
import {
	Message,
	Loader,
	CardContainer,
} from '../../components/HelperComponents';

import { getLocationId } from '../../../application/localStorage';
import { setAlert } from '../../../application/actions/alertActions';

const ActivityScreen = ({ match }) => {
	const activityId = match.params.activityId;

	const locationId = getLocationId();

	// get activity details
	const dispatch = useDispatch();

	// get activityDetails
	const activityDetails = useSelector((state) => state.activityDetails);
	const { loading, error, activity } = activityDetails;

	const stakeholderListDropdown = useSelector(
		(state) => state.stakeholderListDropdown
	);
	const { stakeholders: members } = stakeholderListDropdown;

	// get success on update
	const activityUpdate = useSelector((state) => state.activityUpdate);
	const { success } = activityUpdate;

	// define state
	const [activityType, setActivityType] = useState();
	const [date, setDate] = useState();
	const [stakeholders, setStakeholders] = useState([{ member: '' }]);
	const [actHours, setActHours] = useState();
	const [address, setAddress] = useState();
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [compromise, setcompromise] = useState('');

	useEffect(() => {
		if (success) {
			dispatch(getActivityDetails(activityId));
			dispatch({ type: ACTIVITY_UPDATE_RESET });
		} else {
			if (!activity.activity || activity._id !== activityId) {
				dispatch(getActivityDetails(activityId));
			} else {
				setActivityType(activity.activity);
				setActHours(activity.hours);
				setDate(activity.date.substring(0, 10));
				setAddress(activity.address);
				setStakeholders(activity.stakeholders);
				setcompromise(activity.compromise);
				setDispoints(activity.discussPoints);
			}
		}
	}, [dispatch, activity, activityId, success, locationId]);

	//add select field
	const addHandler = () => {
		setStakeholders([...members, { member: '' }]);
	};

	//filter out element i
	const removeHandler = (i) => {
		const stakeholderToRemove = members[i];
		const list = members.filter((i) => i !== stakeholderToRemove);
		setStakeholders(list);
	};

	//add element to array && provide validation
	const handleInputChange = (e, i) => {
		e.preventDefault();

		//spread all members into a list
		const list = [...members];

		if (
			list.includes(e.target.value) ||
			list.some((item) => item._id === e.target.value)
		) {
			setAlert('Please make sure the same stakeholder is not added twice.');
		} else {
			list[i] = e.target.value;
			setStakeholders(list);
		}
	};

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateActivity(
				{
					activity: activityType,
					date,
					hours: actHours,
					address,
					stakeholders: members,
					compromise,
					discussPoints: disPoints,
				},
				activityId
			)
		);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<CardContainer title={'Activity'}>
					<Form onSubmit={submitHandler}>
						<Row>
							<Col md={4}>
								<Form.Group controlId="activity">
									<Form.Label>Activity</Form.Label>
									<Form.Control
										as="select"
										value={activityType}
										onChange={(e) => setActivityType(e.target.value)}
									>
										<option value="select">--select--</option>
										<option value="informal consultation">
											informal consultation
										</option>
										<option value="formal meeting">formal meeting</option>
										<option value="informal community assembly">
											informal community assembly
										</option>
										<option value="formal community assembly">
											formal community assembly
										</option>
										<option value="geology support">geology support</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="hours">
									<Form.Label>Hours</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter activity hours"
										value={actHours}
										onChange={(e) => setActHours(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="date">
									<Form.Label>Activity Date</Form.Label>
									<Form.Control
										type="date"
										placeholder="Enter Date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<Form.Group controlId="location">
									<Form.Label>
										Location (street, city, state, country)
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Location"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<hr className="mt-3" />
						<Row>
							<Col>
								<Form.Group controlId="compromise" className="mt-3">
									<Row>
										<Col md={10}>
											<Form.Label>Is there a commitment?</Form.Label>
										</Col>
										<Col md={2}>
											<Form.Control
												as="select"
												value={compromise}
												onChange={(e) => setcompromise(e.target.value)}
											>
												<option value="">--Select--</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Form.Control>
										</Col>
									</Row>
								</Form.Group>
								<hr className="mt-3" />
								<Form.Group controlId="discussion" className="mt-3">
									<Form.Label>Discussion</Form.Label>
									<Form.Group controlId="dispoints">
										<Form.Control
											as="textarea"
											rows="6"
											value={disPoints}
											onChange={(e) => setDispoints(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Form.Group>
							</Col>
						</Row>
						<hr className="mb-3" />
						<Row className="mt-3 mb-5">
							<Col md={6}>
								<Form.Label>Parties Involved</Form.Label>
								{stakeholders &&
									stakeholders.map((assignee, i) => (
										<Row key={assignee._id}>
											<Col md={7}>
												<Form.Control
													as="select"
													value={assignee}
													onChange={(e) => handleInputChange(e, i)}
													className="px-5 mb-3"
												>
													<option value="">--Select--</option>
													{members &&
														members.map((stakeholder) => (
															<option
																key={stakeholder._id}
																value={stakeholder._id}
															>
																{stakeholder.firstName} {stakeholder.lastName}
															</option>
														))}
												</Form.Control>
											</Col>
											<Col md={5}>
												{members.length !== 1 && (
													<Button
														variant="danger"
														className="btn-md mr-3"
														onClick={() => removeHandler(i)}
													>
														<i className="fas fa-trash"></i> Remove
													</Button>
												)}
												{members.length - 1 === i && (
													<Button
														className="px-3"
														onClick={() => addHandler(i)}
													>
														<i className="fas fa-plus"></i> Stakeholder
													</Button>
												)}
											</Col>
										</Row>
									))}
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<Button type="submit" variant="primary" className="px-5 mt-3">
									Update
								</Button>
							</Col>
						</Row>
					</Form>
				</CardContainer>
			)}
		</>
	);
};

export default ActivityScreen;
