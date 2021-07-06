/**
 * List of news belonging to a project
 */
import React, { useEffect } from 'react';
import { Link, withRouter, useRouteMatch, Route } from 'react-router-dom';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Loader,
	Message,
	Empty,
	SearchBox,
} from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import {
	deleteNews,
	listLocationNews,
} from '../../../application/actions/newsActions';
import Moment from 'react-moment';

const LocationNews = ({
	match,
	listLocationNews,
	deleteNews,
	newsListLocation: { loading, error, news, pages, page, count },
	newsDelete: { success },
}) => {
	const locationId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listLocationNews(locationId, keyword, pageNumber);
		} else {
			listLocationNews(locationId, keyword, pageNumber);
		}
	}, [listLocationNews, locationId, success, keyword, pageNumber]);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Click ok to delete')) {
			deleteNews(id);
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
					{news && news.length === 0 ? (
						<Empty
							itemLink={`/news/register`}
							url={`/news`}
							type={'News'}
							group={'news'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{`News (${count})`}</h4>
							<Link to={`/news/register`} className="btn btn-primary ml-2">
								<i className="fas fa-plus"></i> {t('action.register')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						{news && news.length === 0 ? null : (
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'title'}
										searchQueryPath={`/community/${locationId}/news/search/`}
										searchQueryEmpty={`/community/${locationId}/news`}
									/>
								)}
							/>
						)}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{news &&
								news.map((item, index) => (
									<Card className="table-card" key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<FaIcons.FaRegNewspaper />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>
														{item.firstName} {item.lastName}
													</div>
													<div className="item-category">
														News |{' '}
														{item.status === 'active' ? (
															<strong className="text-success">
																{item.title.substring(0, 1).toUpperCase() +
																	item.title.substring(1, item.title.length)}
															</strong>
														) : (
															<em className="text-danger">
																{item.title.substring(0, 1).toUpperCase() +
																	item.title.substring(1, item.title.length)}
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
																<Link
																	to={`/community/${locationId}/news/${item._id}/view`}
																>
																	{item.title}
																</Link>
															</>
															<br />
															<>
																Title:{' '}
																<em>{item.title ? item.title : 'N/A'}</em>
															</>
															<br />
															<>
																Theme:{' '}
																<em>{item.theme ? item.theme : 'N/A'}</em>
															</>
															<br />
															<>
																Source:{' '}
																<em>
																	{item.source ? (
																		<a href={`${item.source}`} target="blank">
																			View Source
																		</a>
																	) : (
																		'N/A'
																	)}
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
														</p>
													</div>
													<div className="action-btns">
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
								urlOne={`/community/${locationId}/news/search/`}
								urlTwo={`/community/${locationId}/news/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

// action creators
LocationNews.propTypes = {
	listLocationNews: PropTypes.func.isRequired,
	deleteNews: PropTypes.func.isRequired,
};

// reducers
const mapStateToProps = (state) => ({
	newsListLocation: state.newsListLocation,
	newsDelete: state.newsDelete,
});

export default connect(mapStateToProps, {
	listLocationNews,
	deleteNews,
})(withRouter(LocationNews));
