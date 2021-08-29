import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';

const Actions = ({ match }) => {
	const projectId = match.params.id;
	const { t } = useTranslation();

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
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>
								{t('tables.location')}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/stakeholders/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>
								{t('tables.stakeholder')}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/organizations/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>
								{t('tables.organization')}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/activities/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>
								{'Activity'}
							</Link>
						</Col>
					</Row>
					<Row>
						<Col md={3}>
							<Link
								to={`/news/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>
								{'News'}
							</Link>
						</Col>
						<Col md={3}>
							<Link
								to={`/documents/register/project/${projectId}`}
								className="btn btn-primary"
							>
								<IconContext.Provider value={{ color: '#fff', size: '1.5em' }}>
									<IoIcons.IoIosAdd />
								</IconContext.Provider>
								{'Documents'}
							</Link>
						</Col>
					</Row>
				</div>
			</Card.Body>
		</Card>
	);
};

export default Actions;
