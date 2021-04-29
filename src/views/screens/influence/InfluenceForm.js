import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ProfileContainer } from '../../components/HelperComponents';
import { getStakeholderDetails } from '../../../application/actions/stakeholderActions';
import { addInfluence } from '../../../application/actions/influenceActions';

const InfluenceForm = ({ history, id }) => {
	//get projectDetails
	const dispatch = useDispatch();
	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	//get stakeholderDetails
	const stakeholderSave = useSelector((state) => state.stakeholderSave);
	const { stakeholderInfo } = stakeholderSave;

	console.log(stakeholderInfo);

	//state
	const [firstName] = useState('stakeholder');
	const [position, setPosition] = useState();
	const [influence, setInfluence] = useState();
	const [projImpact, setProjImpact] = useState();

	// useEffect(() => {
	// 	dispatch(getStakeholderDetails(id));
	// }, [dispatch, id]);

	const submitHandler = (e) => {
		e.preventDefault();

		// dispatch(
		// 	addInfluence(
		// 		{
		// 			position: position,
		// 			influence: influence,
		// 			projImpact: projImpact,
		// 		},
		// 		id
		// 	)
		// );

		if (
			stakeholderInfo.organization === 'Yes' ||
			stakeholderInfo.organization === 'yes'
		) {
			history.push(`/locations/${id}/organizations/register`);
		}
	};

	return (
		<ProfileContainer title={'Stakeholder Asessment'}>
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
				<Row className="mt-3">
					<Col>
						<Button type="submit" variant="primary" className="px-5 mt-3">
							Submit
						</Button>
					</Col>
				</Row>
			</Form>
		</ProfileContainer>
	);
};

export default withRouter(InfluenceForm);
