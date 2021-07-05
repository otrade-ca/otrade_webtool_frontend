/**
 * List of stakeholders belonging to a project
 */
import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch, withRouter } from 'react-router-dom';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import {
	listProjectStakeholders,
	deleteStakeholder,
} from '../../../application/actions/stakeholderActions';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import Moment from 'react-moment';

const ProjectStakeholders = ({
	match,
	listProjectStakeholders,
	deleteStakeholder,
	stakeholderDelete: { success },
	stakeholderProjectList: { loading, error, stakeholders, pages, page, count },
}) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listProjectStakeholders(projectId, keyword, pageNumber);
		} else {
			listProjectStakeholders(projectId, keyword, pageNumber);
		}
	}, [listProjectStakeholders, projectId, keyword, pageNumber, success]);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteStakeholder(id);
		}
	};

	return (
		<Card className="my-card">
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{stakeholders && stakeholders.length === 0 ? (
						<Empty url={url} type={'Stakeholder'} group={'stakeholders'} />
					) : (
						<Card.Header className="my-card-header">
							<h4>Stakeholders {`(${count})`}</h4>
						</Card.Header>
					)}
					<Card.Body>
						{stakeholders && stakeholders.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'LastName'}
										searchQueryPath={`/project/${projectId}/stakeholders/search/`}
										searchQueryEmpty={`/project/${projectId}/stakeholders`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{stakeholders &&
								stakeholders.map((item, index) => (
									<Card className="table-card" key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<IoIcons.IoMdPerson />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>
														{item.firstName} {item.lastName}
													</div>
													<div className="item-category">
														Stakeholder |{' '}
														{item.status === 'active' ? (
															<strong className="text-success">
																{item.status.substring(0, 1).toUpperCase() +
																	item.status.substring(1, item.status.length)}
															</strong>
														) : (
															<em className="text-danger">
																{item.status.substring(0, 1).toUpperCase() +
																	item.status.substring(1, item.status.length)}
															</em>
														)}
													</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<p>
															<>
																<Link to={`/stakeholder/${item._id}`}>
																	{item.firstName} {item.lastName}
																</Link>
															</>
															<br />
															<>
																Email:{' '}
																<em>{item.email ? item.email : 'N/A'}</em>
															</>
															<br />
															<>
																Telephone:{' '}
																<em>
																	{item.telephone ? item.telephone : 'N/A'}
																</em>
															</>
															<br />
															<>
																Updated on:{' '}
																<em>
																	{item.updatedAt ? (
																		<Moment format="MM-DD-YYYY">
																			{item.updatedAt}
																		</Moment>
																	) : (
																		'N/A'
																	)}
																</em>
															</>
															<br />
															<>
																Community: <em>{item.location.location}</em>
															</>
														</p>
													</div>
													<div className="action-btns">
														<Link
															to={`/activities/register`}
															className="btn btn-primary"
														>
															<i className="fas fa-plus" />{' '}
															{t('tables.activity')}
														</Link>
														<Button
															variant="danger"
															onClick={() => deleteHandler(item._id)}
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
						<Row className="d-flex justify-content-center mt-2">
							<Paginate
								pages={pages}
								page={page}
								urlOne={`/project/${projectId}/stakeholders/search/`}
								urlTwo={`/project/${projectId}/stakeholders/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

// action creators
ProjectStakeholders.propTypes = {
	listProjectStakeholders: PropTypes.func.isRequired,
	deleteStakeholder: PropTypes.func.isRequired,
};

// reducers
const mapStateToProps = (state) => ({
	stakeholderProjectList: state.stakeholderProjectList,
	stakeholderDelete: state.stakeholderDelete,
});

export default connect(mapStateToProps, {
	listProjectStakeholders,
	deleteStakeholder,
})(withRouter(ProjectStakeholders));
