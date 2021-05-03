import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { ProfileContainer } from '../../components/HelperComponents';
import { getStakeholderDetails } from '../../../application/actions/stakeholderActions';
import { addInfluence } from '../../../application/actions/influenceActions';

const InfluenceForm = ({ history, match }) => {
	const id = match.params.stakeholderId;

	//get projectDetails
	const dispatch = useDispatch();
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { stakeholder } = stakeholderDetails;

	//state
	const [firstName, setFirstName] = useState('');
	const [position, setPosition] = useState('');
	const [influence, setInfluence] = useState('');
	const [projImpact, setProjImpact] = useState('');

	useEffect(() => {
		if (!stakeholder.firstName || stakeholder._id !== id) {
			dispatch(getStakeholderDetails(id));
		} else {
			setFirstName(stakeholder.firstName);
		}
	}, [dispatch, id, stakeholder]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			addInfluence(
				{
					position: position,
					influence: influence,
					projImpact: projImpact,
				},
				id
			)
		);
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>Stakeholder Assessement</h4>
			</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler} className="mb-3">
					<Form.Group controlId="position">
						<Row>
							<Col md={8}>
								<Form.Label>What is the {firstName}'s position?</Form.Label>
							</Col>
							<Col md={4}>
								<Form.Control
									as="select"
									value={position}
									required
									onChange={(e) => setPosition(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="contrario">contrario</option>
									<option value="activo">activo</option>
									<option value="contrario pasivo">contrario pasivo</option>
									<option value="desconocido">desconocido</option>
									<option value="favorable activo">favorable activo</option>
									<option value="favorable inactivo">favorable inactivo</option>
									<option value="favorable con condiciones">
										favorable con condiciones
									</option>
									<option value="neutro">neutro</option>
								</Form.Control>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group controlId="influence">
						<Row>
							<Col md={8}>
								<Form.Label>
									What is the {firstName}'s level of influence on the project?
								</Form.Label>
							</Col>
							<Col md={4}>
								<Form.Control
									as="select"
									value={influence}
									required
									onChange={(e) => setInfluence(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="alto">alto</option>
									<option value="muy alto">muy alto</option>
									<option value="bajo">bajo</option>
									<option value="desconocido">desconocido</option>
									<option value="medio">medio</option>
								</Form.Control>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group controlId="impact">
						<Row>
							<Col md={8}>
								<Form.Label>
									What is the {firstName}'s level of impact on the project?
								</Form.Label>
							</Col>
							<Col md={4}>
								<Form.Control
									as="select"
									value={projImpact}
									required
									onChange={(e) => setProjImpact(e.target.value)}
								>
									<option value="">--Select--</option>
									<option value="alto">alto</option>
									<option value="muy alto">muy alto</option>
									<option value="bajo">bajo</option>
									<option value="desconocido">desconocido</option>
									<option value="medio">medio</option>
								</Form.Control>
							</Col>
						</Row>
					</Form.Group>
					<hr />
					<Row>
						<Col>
							<Button type="submit" variant="primary" className="px-5 mt-3">
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default withRouter(InfluenceForm);
