/**
 * List all activities belonging to a stakeholder
 */
import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, Button, Accordion, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	listStakeholderActivities,
	deleteActivity,
} from '../../../application/actions/activityActions';
import { Message, Loader, Empty } from '../../components/HelperComponents';
import Paginate from '../../components/Paginate';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import Moment from 'react-moment';

const Activities = ({
	match,
	listStakeholderActivities,
	deleteActivity,
	activityStakeholderList: {
		stakeholderactivities,
		loading,
		error,
		pages,
		page,
		count,
	},
	activityDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	const keyword = match.params.keyword;
	const pageNumber = match.params.pageNumber || 1;

	useEffect(() => {
		if (success) {
			listStakeholderActivities(stakeholderId, keyword, pageNumber);
		} else {
			listStakeholderActivities(stakeholderId, keyword, pageNumber);
		}
	}, [stakeholderId, success, listStakeholderActivities, keyword, pageNumber]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			deleteActivity(id);
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
					{stakeholderactivities && stakeholderactivities.length === 0 ? (
						<Empty
							itemLink={`/activities/register`}
							url={'/activities'}
							type={t('tables.activity')}
							group={'activities'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>
								{t('tables.activity')} {`(${count})`}
							</h4>
							<Link
								to={`/activities/register`}
								className="btn btn-primary btn-sm ml-2"
							>
								<i className="fas fa-plus"></i> {t('tables.activity')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						{/* <Route
							render={({ history }) => (
								<SearchBox
									history={history}
									searchWord={'activity'}
									searchQueryPath={`/stakeholder/${stakeholderId}/activities/search/`}
									searchQueryEmpty={`/stakeholder/${stakeholderId}/activities`}
								/>
							)}
						/> */}
						<Accordion defaultActiveKey={1} style={{ marginTop: '1rem' }}>
							{stakeholderactivities &&
								stakeholderactivities.map((item, index) => (
									<Card className="table-card" key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<MdIcons.MdEvent />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>
														<>{item.activity}</>
													</div>
													<div className="item-category">Activity Type</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<>
															<Link
																to={`/stakeholder/${stakeholderId}/activities/${item._id}/view`}
															>
																View Details
															</Link>
														</>
														<br />
														Commitment:{' '}
														<em>
															{item.compromise === 'Yes' ? (
																<Link to={`${url}/${item._id}/commitment`}>
																	{item.compromise}
																</Link>
															) : (
																<>{item.compromise}</>
															)}
														</em>
														<br />
														Other stakeholders:{' '}
														<em>
															{item.stakeholders &&
															item.stakeholders.length < 2 ? (
																'None'
															) : (
																<div className="activityStakeholders">
																	{item.stakeholders &&
																		item.stakeholders.map((person) => (
																			<>
																				<br />
																				{person.firstName} {person.lastName}
																			</>
																		))}
																</div>
															)}
														</em>
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
													</div>
													<div className="d-flex align-items-center">
														<Button
															variant="danger"
															className=" ml-3"
															onClick={() => deleteHandler(item._id)}
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
								urlOne={`/stakeholder/${stakeholderId}/activities/search/`}
								urlTwo={`/stakeholder/${stakeholderId}/activities/page/`}
							/>
						</Row>
					</Card.Body>
				</>
			)}
		</Card>
	);
};

Activities.propTypes = {
	listStakeholderActivities: PropTypes.func.isRequired,
	deleteActivity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	activityStakeholderList: state.activityStakeholderList,
	activityDelete: state.activityDelete,
});

export default connect(mapStateToProps, {
	listStakeholderActivities,
	deleteActivity,
})(Activities);
