import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { getCommitment } from '../../../application/actions/commitmentActions';

const CommitmentForm = ({ match }) => {
	const id = match.params.activityId;

	// usedispatch
	const dispatch = useDispatch();
	const commitmentDetails = useSelector((state) => state.commitmentDetails);
	const { commitment } = commitmentDetails;

	console.log(commitment);

	const [comment, setComment] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (!commitment.details || commitment._id !== id) {
			dispatch(getCommitment(id));
		} else {
			setComment(commitment.details);
			setCompletionDate(commitment.completionDate);
			setIsComplete(commitment.isComplete);
		}
	}, [dispatch, id, commitment]);

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>Commitment</h4>
			</Card.Header>
			<Card.Body>
				<Form className="mb-3">
					<Form.Group controlId="discussion">
						<Form.Label>Compromise Details</Form.Label>
						<Row>
							<Col md={12}>
								<Form.Control
									className="mb-3"
									as="textarea"
									rows="4"
									placeholder="Enter Details"
									value={comment}
									required
									onChange={(e) => setComment(e.target.value)}
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
									value={completionDate}
									required
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
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default CommitmentForm;
