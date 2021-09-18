import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import {
	getCommitment,
	updateCommitment,
} from '../../../application/actions/commitmentActions';
import { Loader, Message } from '../../components/HelperComponents';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const CommitmentEdit = ({
	match,
	getCommitment,
	updateCommitment,
	commitmentDetails: { commitment, loading, error },
	commitmentUpdate: { success },
	history,
}) => {
	const activityId = match.params.activityId;

	const [details, setDetails] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [updatedAt, setUpdatedAt] = useState('');

	useEffect(() => {
		if (!commitment._id) {
			getCommitment(activityId);
		} else {
			setDetails(commitment.details);
			setCompletionDate(commitment.completion_date.substring(0, 10));
			setIsComplete(commitment.is_complete);
			setUpdatedAt(commitment.updatedAt);
		}
	}, [getCommitment, activityId, success, commitment]);

	const submitHandler = (e) => {
		e.preventDefault();
		updateCommitment(
			{
				details,
				completion_date: completionDate,
				is_complete: isComplete,
			},
			activityId,
			history
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

CommitmentEdit.propTypes = {
	getCommitment: PropTypes.func.isRequired,
	commitmentDetails: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	commitmentDetails: state.commitmentDetails,
	commitmentUpdate: state.commitmentUpdate,
});

export default connect(mapStateToProps, { getCommitment, updateCommitment })(
	CommitmentEdit
);
