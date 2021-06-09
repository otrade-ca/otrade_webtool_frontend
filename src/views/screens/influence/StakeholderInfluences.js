import React, { useEffect } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteInfluence,
	listInfluences,
} from '../../../application/actions/influenceActions';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import Empty from '../../components/Empty';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import Moment from 'react-moment';

const StakeholderInfluences = ({ match }) => {
	const stakeholderId = match.params.id;

	const { t } = useTranslation();

	//get activities
	const dispatch = useDispatch();
	const influenceList = useSelector((state) => state.influenceList);
	const { loading, error, influences, filtered } = influenceList;

	const influenceDelete = useSelector((state) => state.influenceDelete);
	const { success } = influenceDelete;

	useEffect(() => {
		if (success) {
			dispatch(listInfluences(stakeholderId));
		} else {
			dispatch(listInfluences(stakeholderId));
		}
	}, [dispatch, stakeholderId, success]);

	//delete activity
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteInfluence(id));
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
					{!filtered && influences.length === 0 ? (
						<Empty
							url={'/influences'}
							type={t('tables.influence')}
							group={'influence'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>{t('tables.influence')}</h4>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{influences &&
								influences.map((item, index) => (
									<Card className="table-card" key={index}>
										<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
											<div className="table-card-item">
												<div className="item-one">
													<IconContext.Provider
														value={{ color: '#008cba', size: '2em' }}
													>
														<MdIcons.MdAssessment />
													</IconContext.Provider>
												</div>
												<div className="item-two">
													<div>{item.activity && item.activity}</div>
													<div className="item-category">Asessment</div>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={index + 1}>
											<Card.Body>
												<div className="d-flex justify-content-between">
													<div>
														<>Type:</> <em>{item.type ? item.type : 'N/A'}</em>
														<br />
														<>Position:</>{' '}
														<em>{item.position ? item.position : 'N/A'}</em>
														<br />
														<>Influence: </>{' '}
														<em>{item.influence ? item.influence : 'N/A'}</em>
														<br />
														<>Impact to project: </>{' '}
														<em>{item.projImpact ? item.projImpact : 'N/A'}</em>
														<br />
														<>Updated On: </>
														<em>
															{item.updatedAt ? (
																<Moment format="MM-DD-YYYY">
																	{item.updatedAt}
																</Moment>
															) : (
																'N/A'
															)}
														</em>
													</div>
													<div className="d-flex align-items-center">
														<Button
															variant="danger"
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

export default StakeholderInfluences;
