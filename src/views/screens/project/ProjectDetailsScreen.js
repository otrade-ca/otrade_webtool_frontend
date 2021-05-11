import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjectDetails } from '../../../application/actions/projectActions';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Loader, Message } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';

const ProjectDetailsScreen = () => {
	const dispatch = useDispatch();

	const { id } = useParams();
	const { t } = useTranslation();

	const projectDetails = useSelector((state) => state.projectDetails);
	const { loading, error, project } = projectDetails;

	const [comments, setComments] = useState('');
	const [updatedAt, setUpdatedAt] = useState('');

	useEffect(() => {
		if (!project.projectName || project._id !== id) {
			dispatch(listProjectDetails(id));
		} else {
			setComments(project.comment);
			setUpdatedAt(project.updatedAt);
		}
	}, [dispatch, id, project]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Card className="my-card">
					<Card.Header className="my-card-header">
						<h4>{t('tables.project')}</h4>
					</Card.Header>
					<Card.Body>
						<Form>
							<Row>
								<Col>
									<Form.Group id="summary">
										<Form.Label>Summary</Form.Label>
										<Form.Control
											as="textarea"
											rows="6"
											value={comments}
											readOnly
											disabled
										/>
									</Form.Group>
								</Col>
							</Row>
							<hr />
							<Form.Label>Collaborators</Form.Label>
							{project &&
								project.assignees.map((i, index) => (
									<Row className="my-3" key={index}>
										<Col md={4}>
											<Form.Label>Surveyor</Form.Label>
											<Form.Control
												type="text"
												value={`${i.firstName} ${i.lastName}`}
												readOnly
												disabled
											/>
										</Col>
										<Col md={4}>
											<Form.Label>{t('user.email.label')}</Form.Label>
											<Form.Control
												type="text"
												value={i.email}
												readOnly
												disabled
											/>
										</Col>
										<Col md={4}>
											<Form.Label>{t('user.telephone.label')}</Form.Label>
											<Form.Control
												type="text"
												value={i.telephone || `No Telephone`}
												readOnly
												disabled
											/>
										</Col>
									</Row>
								))}
							<hr />
							<Row>
								<Col className="text-right">
									<p>updated on: {updatedAt.substring(0, 10)}</p>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			)}
		</>
	);
};

export default ProjectDetailsScreen;
