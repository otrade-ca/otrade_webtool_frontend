import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Button, Accordion, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	listProjects,
	deleteProject,
} from '../../../application/actions/projectActions';
import Paginate from '../../components/Paginate';
import SearchBox from '../../components/SearchBox';
import { Message, Loader } from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';

const ListProjectScreen = ({ history, match }) => {
	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get logged in user
	const dispatch = useDispatch();

	const { t } = useTranslation();

	//get projects
	const projectList = useSelector((state) => state.projectList);
	const { loading, error, projects, page, pages } = projectList;

	const projectDelete = useSelector((state) => state.projectDelete);
	const { success } = projectDelete;

	useEffect(() => {
		if (success) {
			dispatch(listProjects(keyword, pageNumber));
		} else {
			dispatch(listProjects(keyword, pageNumber));
		}
	}, [dispatch, history, keyword, pageNumber, success]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProject(id));
		}
	};

	return (
		<Card className="my-card">
			<Card.Header className="my-card-header">
				<h4>Projects</h4>
				<Route
					render={({ history }) => (
						<SearchBox
							history={history}
							searchWord={t('tables.project')}
							searchQueryPath={'/admin/projects/search/'}
							searchQueryEmpty={'/admin/projects'}
						/>
					)}
				/>
				<Link to="/admin/projects/add" className="btn btn-primary">
					<i className="fas fa-plus" /> {t('tables.project')}
				</Link>
			</Card.Header>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Card.Body>
					<Card.Text>
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
															<strong>
																<Link to={`/project/${project._id}`}>
																	{project.projectName}
																</Link>
															</strong>
															<br />
															{t('project.client.label')}
															{': '}
															<strong>{project.projectClient}</strong>
															<br />
															{t('project.country.label')}
															{': '}
															<strong>
																{project.country_code}, {project.country}
															</strong>
															<br />
															{project.coordinates && (
																<>
																	{t('project.coordinates.label')}
																	{': '}
																	<strong>{project.coordinates}</strong>
																	<br />
																</>
															)}
														</p>
													</div>
													<div className="d-flex align-items-center">
														<LinkContainer
															to={`/admin/project/${project._id}/assign`}
														>
															<Button variant="light" className="btn-md ml-3">
																<i className="fas fa-edit"></i>{' '}
																{t('action.assign')}
															</Button>
														</LinkContainer>
														<LinkContainer
															to={`/admin/project/${project._id}/edit`}
														>
															<Button variant="light" className="btn-md ml-3">
																<i className="fas fa-edit"></i>{' '}
																{t('action.update')}
															</Button>
														</LinkContainer>
														<Button
															variant="danger"
															className="btn-md ml-3 "
															onClick={() => deleteHandler(project._id)}
														>
															<i className="fas fa-trash"></i>{' '}
															{t('action.delete')}
														</Button>
													</div>
												</div>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								))}
						</Accordion>
					</Card.Text>
					<Row className="d-flex justify-content-center">
						<Paginate
							pages={pages}
							page={page}
							urlOne={'/admin/projects/search/'}
							urlTwo={'/admin/projects/page/'}
						/>
					</Row>
				</Card.Body>
			)}
		</Card>
	);
};

export default ListProjectScreen;
