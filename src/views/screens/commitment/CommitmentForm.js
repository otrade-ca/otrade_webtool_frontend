import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { addCommitment } from '../../../application/actions/commitmentActions';

const CommitmentDetails = ({ match, history }) => {
	const id = match.params.activityId;

	//define states
	const [comment, setComment] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	const dispatch = useDispatch();
	const routeSave = useSelector((state) => state.routeSave);
	const { routeInfo } = routeSave;

	//handle submit form
	const submitHandler = (e) => {
		e.preventDefault();

		//dispatch
		dispatch(
			addCommitment(
				{
					details: comment,
					completion_date: completionDate,
					is_complete: isComplete,
				},
				id,
				routeInfo,
				history
			)
		);
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>Commitment</h4>
			</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler} className="mb-3">
					<Form.Group controlId="discussion">
						<Form.Label>Compromise Details</Form.Label>
						<Row>
							<Col md={12}>
								<Form.Control
									className="mb-3"
									as="textarea"
									rows="4"
									placeholder="Enter Details"
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

export default CommitmentDetails;
