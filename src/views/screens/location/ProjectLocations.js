/**
 * List of communities belonging to a project
 */
import React, { useEffect } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Accordion, Card, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Message, Loader } from '../../components/HelperComponents';
import {
	deleteLocation,
	listLocations,
} from '../../../application/actions/locationActions';
import { LOCATION_DELETE_RESET } from '../../../application/constants/locationConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as RiIcons from 'react-icons/ri';
import SearchBox from '../../components/SearchBox';
import Paginate from '../../components/Paginate';
import Moment from 'react-moment';

const ProjectLocations = ({ match }) => {
	const projectId = match.params.id;

	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	// get locations
	const dispatch = useDispatch();
	const locationList = useSelector((state) => state.locationList);
	const { loading, error, locations, pages, page, count } = locationList;

	const locationDelete = useSelector((state) => state.locationDelete);
	const { success } = locationDelete;

	useEffect(() => {
		if (success) {
			dispatch(listLocations(projectId, keyword, pageNumber));
			dispatch({ type: LOCATION_DELETE_RESET });
		} else {
			dispatch(listLocations(projectId, keyword, pageNumber));
		}
	}, [dispatch, projectId, keyword, pageNumber, success]);

	//delete location
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteLocation(id));
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
					{locations && locations.length === 0 ? (
						<Empty
							itemLink={`/communities/register/project/${projectId}`}
							url={`/communities/register/project/${projectId}`}
							type={t('tables.location')}
							group={'locations'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<Route
								render={({ history }) => (
									<SearchBox
										history={history}
										searchWord={'Location'}
										searchQueryPath={`/project/${projectId}/communities/search/`}
										searchQueryEmpty={`/project/${projectId}/communities`}
									/>
								)}
							/>
							<Link
								to={`/communities/register/project/${projectId}`}
								className="btn btn-primary ml-2"
							>
								<i className="fas fa-plus"></i> {t('action.register')}
							</Link>
						</Card.Header>
					)}
				</>
			)}
			<Card.Body>
				<Accordion defaultActiveKey={1}>
					{locations &&
						locations.map((location, index) => (
							<Card className="table-card" key={index}>
								<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
									<div className="table-card-item">
										<div className="item-one">
											<IconContext.Provider
												value={{ color: '#008cba', size: '2em' }}
											>
												<RiIcons.RiCommunityLine />
											</IconContext.Provider>
										</div>
										<div className="item-two">
											<div>{location.location}</div>
											<div className="item-category">Community</div>
										</div>
									</div>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey={index + 1}>
									<Card.Body>
										<div className="d-flex justify-content-between">
											<div>
												<>
													<Link to={`/community/${location._id}`}>
														{location.location}
													</Link>
												</>
												<br />
												<>{t('location.area_of_Influence.label')}</>
												{': '}{' '}
												<em>
													{location.area_influence
														? location.area_influence
														: 'N/A'}
												</em>
												<br />
												<>{t('location.organization_Type.label')}</>
												{': '}{' '}
												<em>
													{location.organization_type
														? location.organization_type
														: 'N/A'}
												</em>
												<br />
												<>{t('location.scope.label')}</>
												{': '}{' '}
												<em>{location.scope ? location.scope : 'N/A'}</em>
												<br />
												<>Updated On</>
												{': '}{' '}
												<em>
													{location.updatedAt ? (
														<Moment format="MM-DD-YYYY">
															{location.updatedAt}
														</Moment>
													) : (
														'N/A'
													)}
												</em>
											</div>
											<div className="action-btns">
												<Link
													to={`/stakeholders/register/community/${location._id}`}
													className="btn btn-primary"
												>
													<i className="fas fa-plus" />
													{t('tables.stakeholder')}
												</Link>
												<Link
													to={`/organizations/register/community/${location._id}`}
													className="btn btn-primary"
												>
													<i className="fas fa-plus" />
													{t('tables.organization')}
												</Link>
												<Link
													to={`/news/register/community/${location._id}`}
													className="btn btn-secondary"
												>
													<i className="fas fa-plus" />
													{'News'}
												</Link>
												<Button
													variant="danger"
													onClick={() => deleteHandler(location._id)}
												>
													<i className="fas fa-trash"></i> Delete
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
						urlOne={`/project/${projectId}/communities/search/`}
						urlTwo={`/project/${projectId}/communities/page/`}
					/>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default withRouter(ProjectLocations);
