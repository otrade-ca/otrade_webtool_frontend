import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { listUserProjects } from '../../../application/actions/projectActions';
import {
	Message,
	Loader,
	CardContainer,
} from '../../components/HelperComponents';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const UserProjects = memo(({ match }) => {
	const userId = match.params.id;
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects, filtered } = projectUser;

	useEffect(() => {
		dispatch(listUserProjects(userId));
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="light">{error}</Message>
			) : (
				<CardContainer title={t('tables.project')} searchWord={'Projects'}>
					<Accordion defaultActiveKey={1}>
						{filtered
							? filtered.map((project, index) => (
									<Card className="table-card">
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<p>{project.projectName}</p>
											<p>{project.createdAt.substring(0, 10)}</p>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<p>
															{t('tables.project')}:{' '}
															<strong>
																<Link to={`/project/${project._id}`}>
																	{project.projectName}
																</Link>
															</strong>
															<br />
															{t('project.client.label')}:{' '}
															<strong>{project.projectClient}</strong>
															<br />
															{t('project.country.label')}
															{': '}
															<strong>
																{project.country_code}, {project.country}
															</strong>
															<br />
															{project.coordinates && (
																<strong>
																	{t('project.coordinates.label')}
																	{': '}
																	<strong>{project.coordinates}</strong>
																	<br />
																</strong>
															)}
															{t('project.register_Date')}:{' '}
															{project.createdAt.substring(0, 10)}
														</p>
													</div>
													<div className="d-flex align-projects-start mr-5">
														<p>
															<strong>Status: </strong>
															{project.status === 'open' ? (
																<strong>
																	<em className="text-success">
																		{project.status}
																	</em>
																</strong>
															) : (
																<strong>
																	<em className="text-danger">
																		{project.status}
																	</em>
																</strong>
															)}
														</p>
													</div>
												</div>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
							  ))
							: projects &&
							  projects.map((project, index) => (
									<Card className="table-card">
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<AiIcons.AiOutlineProject />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>{project.projectName}</div>
													<div className="item-category">
														Project |{' '}
														{project.status === 'active' ||
														project.status === 'open' ? (
															<strong className="text-success">
																{project.status.substring(0, 1).toUpperCase() +
																	project.status.substring(
																		1,
																		project.status.length
																	)}
															</strong>
														) : (
															<em className="text-danger">
																{project.status.substring(0, 1).toUpperCase() +
																	project.status.substring(
																		1,
																		project.status.length
																	)}
															</em>
														)}
													</div>
												</div>
											</div>
											<div className="table-card-item">
												<div className="item-two">
													<div>
														<strong>
															{project.createdAt.substring(0, 10)}
														</strong>{' '}
													</div>
													<div className="item-category">Registered Date</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<p>
															{t('tables.project')}:{' '}
															<strong>
																<Link to={`/project/${project._id}`}>
																	{project.projectName}
																</Link>
															</strong>
															<br />
															{t('project.client.label')}:{' '}
															<strong>{project.projectClient}</strong>
															<br />
															{t('project.country.label')}
															{': '}
															<strong>
																{project.country_code}, {project.country}
															</strong>
															<br />
															{project.coordinates && (
																<strong>
																	{t('project.coordinates.label')}
																	{': '}
																	<strong>{project.coordinates}</strong>
																	<br />
																</strong>
															)}
															{t('project.register_Date')}:{' '}
															{project.createdAt.substring(0, 10)}
														</p>
													</div>
													<div className="d-flex align-items-start mr-5">
														<p>
															<strong>{t('utility.status')}: </strong>
															{project.status === 'open' ? (
																<strong>
																	<em className="text-success">
																		{project.status}
																	</em>
																</strong>
															) : (
																<strong>
																	<em className="text-danger">
																		{project.status}
																	</em>
																</strong>
															)}
														</p>
													</div>
												</div>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
							  ))}
					</Accordion>
				</CardContainer>
			)}
		</>
	);
});

export default UserProjects;

// {/* <Card className="my-card">
// 					<Card.Header className="my-card-header">
// 						{/* <h4>{t('tables.project')}</h4> */}
// 						<FilterBox searchWord={'Projects'} />
// 					</Card.Header>
// 					<Card.Body>

// 					</Card.Body>
// 				</Card> */}
