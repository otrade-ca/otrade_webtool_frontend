import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getStakeholderDetails } from '../../../application/actions/stakeholderActions';
import { addInfluence } from '../../../application/actions/influenceActions';
import { INFLUENCE_ADD_RESET } from '../../../application/constants/influenceConstants';
import {
	CardContainer,
	Loader,
	Message,
} from '../../components/HelperComponents';

const InfluenceForm = ({ history, match }) => {
	const id = match.params.stakeholderId;

	// state
	const [firstName, setFirstName] = useState('');
	const [type, setType] = useState('');
	const [position, setPosition] = useState('');
	const [influence, setInfluence] = useState('');
	const [projImpact, setProjImpact] = useState('');

	//get projectDetails
	const dispatch = useDispatch();
	const stakeholderDetails = useSelector((state) => state.stakeholderDetails);
	const { loading, error, stakeholder } = stakeholderDetails;

	// console.log(stakeholder);
	console.log('new form');

	// console.log(typeof stakeholder._id);

	// pass route info
	const routeSave = useSelector((state) => state.routeSave);
	const { routeInfo } = routeSave;

	const influenceAdd = useSelector((state) => state.influenceAdd);
	const { success } = influenceAdd;

	console.log('incoming routeInfo', routeInfo);
	console.log('success', success);

	// useEffect(() => {
	// 	if (success) {
	// 		// clear page
	// 		dispatch({ type: INFLUENCE_ADD_RESET });
	// 	} else {
	// 		if (!stakeholder.firstName || stakeholder._id !== id) {
	// 			dispatch(getStakeholderDetails(id));
	// 		} else {
	// 			setFirstName(stakeholder.firstName);
	// 		}
	// 	}
	// }, [dispatch, success]);

	// dispatch, success, id, stakeholder

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			addInfluence(
				{
					type: type,
					position: position,
					influence: influence,
					projImpact: projImpact,
				},
				id,
				routeInfo,
				history
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
				<CardContainer title={'Stakeholder Assessment'}>
					<Form onSubmit={submitHandler} className="mb-3">
						<Form.Group controlId="position">
							<Row>
								<Col md={8}>
									<Form.Label>Assessment Type</Form.Label>
								</Col>
								<Col md={4}>
									<Form.Control
										as="select"
										value={type}
										required
										onChange={(e) => setType(e.target.value)}
									>
										<option value="">--Select--</option>
										<option value="initial">initial</option>
										<option value="follow-up">follow-up</option>
										<option value="final">final</option>
									</Form.Control>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group controlId="position">
							<Row>
								<Col md={8}>
									<Form.Label>What is the stakeholder's position?</Form.Label>
								</Col>
								<Col md={4}>
									<Form.Control
										as="select"
										value={position}
										required
										onChange={(e) => setPosition(e.target.value)}
									>
										<option value="">--Select--</option>
										<option value="desconocido">desconocido</option>
										<option value="contrario">contrario</option>
										<option value="contrario pasivo">contrario pasivo</option>
										<option value="activo">activo</option>
										<option value="favorable activo">favorable activo</option>
										<option value="favorable inactivo">
											favorable inactivo
										</option>
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
										What is the stakeholder's level of influence on the project?
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
										<option value="muy alto">muy alto</option>
										<option value="alto">alto</option>
										<option value="medio">medio</option>
										<option value="bajo">bajo</option>
										<option value="desconocido">desconocido</option>
									</Form.Control>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group controlId="impact">
							<Row>
								<Col md={8}>
									<Form.Label>
										What is the stakeholder's level of impact on the project?
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
				</CardContainer>
			)}
		</>
	);
};

export default withRouter(InfluenceForm);
