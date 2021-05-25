import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { getCommitment } from '../../../application/actions/commitmentActions';
import { Loader, Message } from '../../components/HelperComponents';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const FormDetails = ({
	match,
	getCommitment,
	commitmentDetails: { commitment, loading, error },
}) => {
	const activityId = match.params.activityId;

	useEffect(() => {
		getCommitment(activityId);
	}, [getCommitment, activityId]);

	console.log(commitment);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>Commitment</h4>
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
											value={commitment && commitment.details}
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
											// value={
											// 	commitment &&
											// 	commitment.completion_date.substring(0, 10)
											// }
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
									checked={commitment && commitment.is_complete}
									readOnly
									disabled
								></Form.Check>
							</Form.Group>
							<hr />
							<Row>
								<Col className="text-right">
									<p>
										updated on:{' '}
										<Moment format="YYYY-MM-DD">
											{commitment && commitment.updatedAt}
										</Moment>
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

FormDetails.propTypes = {
	getCommitment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	commitmentDetails: state.commitmentDetails,
});

export default connect(mapStateToProps, { getCommitment })(FormDetails);
