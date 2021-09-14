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
import * as BiIcons from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const UserProjects = memo(({ match }) => {
	const userId = match.params.id;
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const projectUser = useSelector((state) => state.projectUser);
	const { loading, error, projects } = projectUser;

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
						{projects &&
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
											<div className="item-three">
												<IconContext.Provider
													value={{ color: '#008cba', size: '2em' }}
												>
													<BiIcons.BiCaretDown />
												</IconContext.Provider>
											</div>
										</div>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey={index + 1}>
										<Card.Body>
											<div className="d-flex justify-content-between">
												<div>
													<p>
														{t('tables.project')}:{' '}
														<>
															<Link to={`/project/${project._id}`}>
																{project.projectName}
															</Link>
														</>
														<br />
														{t('project.client.label')}:{' '}
														<>{project.projectClient}</>
														<br />
														{t('project.country.label')}
														{': '}
														<>
															{project.country_code}, {project.country}
														</>
														<br />
														{project.coordinates && (
															<>
																{t('project.coordinates.label')}
																{': '}
																<>{project.coordinates}</>
																<br />
															</>
														)}
													</p>
													<p>
														<>{t('utility.status')}: </>
														{project.status === 'open' ? (
															<>
																<em className="text-success">
																	{project.status}
																</em>
															</>
														) : (
															<>
																<em className="text-danger">
																	{project.status}
																</em>
															</>
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
