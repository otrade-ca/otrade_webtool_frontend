import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { getCommitment } from '../../../application/actions/commitmentActions';
import {
	Loader,
	Message,
	CardContainer,
} from '../../components/HelperComponents';

const CommitmentView = ({ match }) => {
	const activityId = match.params.activityId;

	//define states
	const [comment, setComment] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [updatedDate, setUpdatedDate] = useState('');

	// usedispatch
	const dispatch = useDispatch();

	// get commitmentdetails
	const commitmentDetails = useSelector((state) => state.commitmentDetails);
	const { commitment, loading, error } = commitmentDetails;

	console.log(commitment);

	useEffect(() => {
		if (!commitment || commitment.activity !== activityId) {
			dispatch(getCommitment(activityId));
		} else {
			setComment(commitment.details);
			setCompletionDate(commitment.completion_date);
			setIsComplete(commitment.is_complete);
			setUpdatedDate(commitment.updatedAt);
		}
	}, [dispatch, commitment, activityId]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<CardContainer className="my-card" link={'edit'}>
					<Card.Header className="my-card-header">
						<h4>Commitment Hello</h4>
					</Card.Header>
					<Card.Body>
						<Form className="mb-3">
							<Form.Group controlId="discussion">
								<Form.Label>Commitment Details</Form.Label>
								<Row>
									<Col md={12}>
										<Form.Control
											className="mb-3"
											as="textarea"
											rows="4"
											placeholder="Enter Details"
											value={comment}
											readOnly
											disabled
										></Form.Control>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group controlId="date">
								<Row>
									<Col md={4}>
										<Form.Label>Completion Date</Form.Label>
										<Form.Control
											type="date"
											placeholder="Enter Date"
											value={completionDate && completionDate.substring(0, 10)}
											readOnly
											disabled
										></Form.Control>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group controlId="complete" className="mt-5">
								<Form.Check
									type="checkbox"
									label="Completed?"
									checked={isComplete}
									readOnly
									disabled
								></Form.Check>
							</Form.Group>
							<hr />
							<Row>
								<Col className="text-right">
									<p>
										updated on: {updatedDate && updatedDate.substring(0, 10)}
									</p>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</CardContainer>
			)}
		</>
	);
};

export default CommitmentView;