import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	listStakeholderActivities,
	deleteActivity,
} from '../../../application/actions/activityActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import Empty from '../../components/Empty';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';

const ListStakeholderActivities = ({ match }) => {
	const stakeholderId = match.params.id;
	const { url } = useRouteMatch();

	const { t } = useTranslation();

	//get activities
	const dispatch = useDispatch();
	const activityStakeholderList = useSelector(
		(state) => state.activityStakeholderList
	);

	const {
		loading,
		error,
		stakeholderactivities,
		filtered,
	} = activityStakeholderList;

	console.log(stakeholderactivities);

	const activityDelete = useSelector((state) => state.activityDelete);
	const { success } = activityDelete;

	useEffect(() => {
		if (success) {
			dispatch(listStakeholderActivities(stakeholderId));
		} else {
			dispatch(listStakeholderActivities(stakeholderId));
		}
	}, [dispatch, stakeholderId, success]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteActivity(id));
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
							itemLink={'register'}
							url={'/activities'}
							type={t('tables.activity')}
							group={'activities'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{t('tables.activity')}</h4>
							<Link
								to={`/activities/register`}
								className="btn btn-primary ml-2"
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
													<div>{item.activity}</div>
													<div className="item-category">Activity Type</div>
												</div>
											</div>
											<div className="table-card-item">
												<div className="item-two">
													<div>
														<strong>{item.date.substring(0, 10)}</strong>{' '}
													</div>
													<div className="item-category">Activity Date</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<strong>
															<Link to={`${url}/${item._id}/profile/view`}>
																View Details
															</Link>
														</strong>
														<br />
														<strong>Commitment:</strong>{' '}
														{item.compromise === 'Yes' ? (
															<Link>{item.compromise}</Link>
														) : (
															<>{item.compromise}</>
														)}
														<br />
														<strong>Other stakeholders: </strong>{' '}
														{item.stakeholders &&
														item.stakeholders.length < 2 ? (
															'None'
														) : (
															<>
																{item.stakeholders.filter(
																	(person) =>
																		person.firstName === item.firstName
																)}
															</>
														)}
														<br />
													</div>
													<div className="d-flex align-items-center">
														<Button
															variant="danger"
															className="btn-md ml-3"
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

export default ListStakeholderActivities;
