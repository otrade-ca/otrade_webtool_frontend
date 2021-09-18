import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
	getCommitment,
	updateCommitment,
} from '../../../application/actions/commitmentActions';
import { Loader, Message } from '../../components/HelperComponents';
import Moment from 'react-moment';
import { COMMITMENT_UPDATE_RESET } from '../../../application/constants/commitmentConstants';

const CommitmentEdit = ({ match, history }) => {
	const activityId = match.params.activityId;

	const dispatch = useDispatch();
	const commitmentDetails = useSelector((state) => state.commitmentDetails);
	const { loading, error, commitment } = commitmentDetails;

	const commitmentUpdate = useSelector((state) => state.commitmentUpdate);
	const { success } = commitmentUpdate;

	const [details, setDetails] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [updatedAt, setUpdatedAt] = useState('');

	useEffect(() => {
		if (success) {
			dispatch(getCommitment(activityId));
			dispatch({ type: COMMITMENT_UPDATE_RESET });
		} else {
			if (!commitment._id) {
				dispatch(getCommitment(activityId));
			} else {
				setDetails(commitment.details);
				setCompletionDate(commitment.completion_date.substring(0, 10));
				setIsComplete(commitment.is_complete);
				setUpdatedAt(commitment.updatedAt);
			}
		}
	}, [dispatch, activityId, commitment, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateCommitment(
				{
					details,
					completion_date: completionDate,
					is_complete: isComplete,
				},
				activityId,
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
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>Commitment</h4>
					</Card.Header>
					<Card.Body>
						<Form className="mb-3" onSubmit={submitHandler}>
							<Form.Group controlId="discussion">
								<Form.Label>Commitment Details</Form.Label>
								<Row>
									<Col md={12}>
										<Form.Control
											className="mb-3"
											as="textarea"
											rows="4"
											placeholder="Enter Details"
											value={details}
											onChange={(e) => setDetails(e.target.value)}
										></Form.Control>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group controlId="date">
								<Row>
									<Col md={4}>
										<Form.Label>Completion Date </Form.Label>
										<Form.Control
											type="date"
											placeholder="Enter Date"
											value={completionDate}
											onChange={(e) => setCompletionDate(e.target.value)}
										></Form.Control>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group controlId="complete" className="mt-5">
								<Form.Check
									type="checkbox"
									label="Completed?"
									checked={isComplete}
									onChange={(e) => setIsComplete(e.target.checked)}
								></Form.Check>
							</Form.Group>
							<hr />
							<Row>
								<Col>
									<Button type="submit" variant="primary" className="px-5 mt-3">
										Update
									</Button>
								</Col>
								<Col className="text-right">
									<p>
										updated on: <Moment format="YYYY-MM-DD">{updatedAt}</Moment>
									</p>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default withRouter(CommitmentEdit);
