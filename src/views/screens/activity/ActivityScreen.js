import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityDetails } from '../../../application/actions/activityActions';
import { Loader, Message } from '../../components/HelperComponents';

const ActivityScreen = ({ match }) => {
	const activityId = match.params.activityId;

	// get activity details
	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);
	console.log(stakeholderList);
	// get activityDetails
	const activityDetails = useSelector((state) => state.activityDetails);
	const { loading, error, activity } = activityDetails;

	// define state
	const [activityType, setActivityType] = useState();
	const [date, setDate] = useState();
	const [members, setMembers] = useState([{ member: '' }]);
	const [actHours, setActHours] = useState();
	const [location, setLocation] = useState();
	const [disPoints, setDispoints] = useState([{ point: '' }]);
	const [compromise, setcompromise] = useState('');

	useEffect(() => {
		if (!activity.activity || activity._id !== activityId) {
			dispatch(getActivityDetails(activityId));
		} else {
			setActivityType(activity.activity);
			setActHours(activity.hours);
			setDate(activity.date.substring(0, 10));
			setLocation(activity.location);
			setMembers(activity.stakeholders);
			setcompromise(activity.compromise);
			setDispoints(activity.discussPoints);
		}
	}, [dispatch, activity, activityId]);

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
											value={location}
											onChange={(e) => setLocation(e.target.value)}
										></Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<hr className="mt-3" />
							<Row>
								<Col>
									<Form.Group controlId="compromise" className="mt-3">
										<Row>
											<Col md={9}>
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
								{/* <Col md={8}>
								<Form.Label>Parties Involved</Form.Label>
								{members &&
									members.map((assignee, i) => (
										<Row key={assignee._id}>
											<Col md={7}>
												<Form.Control
													as="select"
													value={assignee}
													className="px-5 mb-3"
												>
													<option value="">--Select--</option>
													{stakeholderList.stakeholders.map((stakeholder) => (
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
													<Button variant="danger" className="btn-md mr-3">
														<i className="fas fa-trash"></i>
													</Button>
												)}
												{members.length - 1 === i && (
													<Button className="px-3">
														<i className="fas fa-plus"></i> Stakeholder
													</Button>
												)}
											</Col>
										</Row>
									))}
							</Col> */}
							</Row>

							<Row>
								<Col>
									<Button type="submit" variant="primary" className="px-5">
										Update
									</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default ActivityScreen;
