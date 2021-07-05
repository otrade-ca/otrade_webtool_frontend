import React, { useEffect } from 'react';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
import { useDispatch, connect } from 'react-redux';
import { Loader, Message, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import {
	deleteStakeholder,
	listLocationStakeholders,
} from '../../../application/actions/stakeholderActions';
import { STAKEHOLDER_DELETE_RESET } from '../../../application/constants/stakeholderConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import PropTypes from 'prop-types';
import SearchBox from '../../components/SearchBox';
import Moment from 'react-moment';

const LocationStakeholders = ({
	match,
	listLocationStakeholders,
	deleteStakeholder,
	stakeholderDelete: { success },
	stakeholderLocationList: { loading, error, stakeholders, pages, page, count },
}) => {
	const communityId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	//get stakeholders
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			listLocationStakeholders(communityId, keyword, pageNumber);
			dispatch({ type: STAKEHOLDER_DELETE_RESET });
		} else {
			listLocationStakeholders(communityId, keyword, pageNumber);
		}
	}, [
		dispatch,
		keyword,
		communityId,
		success,
		listLocationStakeholders,
		pageNumber,
	]);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			dispatch(deleteStakeholder(id));
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
						<Empty
							itemLink={`/stakeholders/register/community/${communityId}`}
							url={`/stakeholders`}
							type={t('tables.stakeholder')}
							group={'stakeholders'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{`Stakeholders (${count})`}</h4>
							<Link
								to={`/stakeholders/register/community/${communityId}`}
								className="btn btn-primary ml-2"
							>
								<i className="fas fa-plus"></i> {t('tables.stakeholder')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						{stakeholders && stakeholders.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'LastName'}
										searchQueryPath={`/community/${communityId}/stakeholders/search/`}
										searchQueryEmpty={`/community/${communityId}/stakeholders`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{stakeholders &&
								stakeholders.map((item, index) => (
									<Card className="table-card">
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
																Updated On:{' '}
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
														</p>
													</div>
													<div className="action-btns">
														<Link
															to={`/activities/register`}
															className="btn btn-primary"
														>
															<i className="fas fa-plus" />
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
								urlOne={`/community/${communityId}/stakeholders/search/`}
								urlTwo={`/community/${communityId}/stakeholders/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

LocationStakeholders.propTypes = {
	listLocationStakeholders: PropTypes.func.isRequired,
	deleteStakeholder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	stakeholderLocationList: state.stakeholderLocationList,
	stakeholderDelete: state.stakeholderDelete,
});

export default connect(mapStateToProps, {
	listLocationStakeholders,
	deleteStakeholder,
})(LocationStakeholders);