import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	listStakeholderActivities,
	deleteActivity,
} from '../../../application/actions/activityActions';
import { Message, Loader, Empty } from '../../components/HelperComponents';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import Moment from 'react-moment';

const Activities = ({
	match,
	listStakeholderActivities,
	deleteActivity,
	activityStakeholderList: { stakeholderactivities, loading, error, filtered },
	activityDelete: { success },
}) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();
	const { t } = useTranslation();

	useEffect(() => {
		if (success) {
			listStakeholderActivities(stakeholderId);
		} else {
			listStakeholderActivities(stakeholderId);
		}
	}, [stakeholderId, success, listStakeholderActivities]);

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
					{!filtered && stakeholderactivities.length === 0 ? (
						<Empty
							itemLink={`/activities/register`}
							url={'/activities'}
							type={t('tables.activity')}
							group={'activities'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{t('tables.activity')}</h4>
							<Link
								to={`/activities/register`}
								className="btn btn-primary btn-sm ml-2"
							>
								<i className="fas fa-plus"></i> {t('tables.activity')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
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
															<Link to={`${url}/${item._id}/view`}>
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
