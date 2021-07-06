import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityDetails } from '../../../application/actions/activityActions';
import { Loader, Message } from '../../components/HelperComponents';
import { listLocationStakeholders } from '../../../application/actions/stakeholderActions';
import { getLocationId } from '../../../application/localStorage';

const ActivityView = ({ match }) => {
	const activityId = match.params.activityId;

	const { url } = useRouteMatch();

	// get locationId from localStorage
	const locationId = getLocationId();

	// get activity details
	const dispatch = useDispatch();

	// get activityDetails
	const activityDetails = useSelector((state) => state.activityDetails);
	const { loading, error, activity } = activityDetails;

	const stakeholderProjectList = useSelector(
		(state) => state.stakeholderProjectList
	);
	const { stakeholders } = stakeholderProjectList;

	// define state
	const [activityType, setActivityType] = useState();
	const [date, setDate] = useState();
	const [members, setMembers] = useState([{ member: '' }]);
	const [actHours, setActHours] = useState();
	const [location, setLocation] = useState();
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [compromise, setcompromise] = useState('');
	const [updatedDate, setUpdatedDate] = useState('');

	useEffect(() => {
		if (!activity.activity || activity._id !== activityId) {
			dispatch(getActivityDetails(activityId));
			dispatch(listLocationStakeholders(locationId));
		} else {
			setActivityType(activity.activity);
			setActHours(activity.hours);
			setDate(activity.date.substring(0, 10));
			setLocation(activity.location);
			setMembers(activity.stakeholders);
			setcompromise(activity.compromise);
			setDispoints(activity.discussPoints);
			setUpdatedDate(activity.updatedAt);
		}
	}, [dispatch, activity, activityId, locationId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>Activity</h4>
						<Link to={`${url}/edit`} className="btn btn-light ml-2">
							<i className="fas fa-edit"></i> Edit
						</Link>
					</Card.Header>
					<Card.Body>
						<Form>
							<Row>
								<Col md={4}>
									<Form.Group controlId="activity">
										<Form.Label>Activity</Form.Label>
										<Form.Control
											as="select"
											value={activityType}
											disabled
											readOnly
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
											disabled
											readOnly
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
											disabled
											readOnly
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
											value={location}
											disabled
											readOnly
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr className="mt-3" />
							<Row>
								<Col>
									<Form.Group controlId="compromise" className="mt-3">
										<Row>
											<Col md={8}>
												<Form.Label>Is there a commitment?</Form.Label>
											</Col>
											<Col md={4}>
												<Form.Control
													as="select"
													value={compromise}
													disabled
													readOnly
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
												disabled
												readOnly
											></Form.Control>
										</Form.Group>
									</Form.Group>
								</Col>
							</Row>
							<hr className="mb-3" />
							<Row className="mt-3">
								<Col md={6}>
									<Form.Label>Parties Involved</Form.Label>
									{members &&
										members.map((assignee) => (
											<Row key={assignee._id}>
												<Col md={7}>
													<Form.Control
														as="select"
														value={assignee}
														className="px-5 mb-3"
														disabled
														readOnly
													>
														<option value="">--Select--</option>
														{stakeholders &&
															stakeholders.map((stakeholder) => (
																<option
																	key={stakeholder._id}
																	value={stakeholder._id}
																>
																	{stakeholder.firstName} {stakeholder.lastName}
																</option>
															))}
													</Form.Control>
												</Col>
											</Row>
										))}
								</Col>
							</Row>
							<hr />
							<Row>
								<Col className="text-right">
									<p>updated on: {updatedDate.substring(0, 10)}</p>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default ActivityView;
