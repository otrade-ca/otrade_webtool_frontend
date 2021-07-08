import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Actions = ({ match }) => {
	const projectId = match.params.id;
	const { t } = useTranslation();

	const projectDetails = useSelector((state) => state.projectDetails);
	const { project } = projectDetails;

	console.log(project);

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>Actions</h4>
			</Card.Header>
			<Card.Body>
				<div className="project-action-btns">
					<Row>
						<Col md={3}>
							<Link
								to={`/communities/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<i className="fas fa-plus" />
								{t('action.register')} {t('tables.location')}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/stakeholders/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<i className="fas fa-plus" />
								{t('action.register')} {t('tables.stakeholder')}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/organizations/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<i className="fas fa-plus" />
								{t('action.register')} {t('tables.organization')}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/activities/register/project/${projectId}`}
								className="btn btn-secondary"
							>
								<i className="fas fa-plus" />
								{t('action.register')} {'Activity'}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/news/register/project/${projectId}`}
								className="btn btn-secondary"
							>
								<i className="fas fa-plus" />
								{t('action.register')} {'News'}
							</Link>
						</Col>
					</Row>
				</div>
			</Card.Body>
		</Card>
	);
};

export default Actions;
