import React, { memo, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	FilterBox,
	Loader,
	Message,
	Empty,
} from '../../components/HelperComponents';
import {
	listLocationStakeholders,
	deleteStakeholder,
} from '../../../application/actions/stakeholderActions';
import { STAKEHOLDER_DELETE_RESET } from '../../../application/constants/stakeholderConstants';
import { useTranslation } from 'react-i18next';

const StakeholdersProjectList = memo(({ match, keyword = '' }) => {
	const locationId = match.params.id;
	const { url } = useRouteMatch();

	const { t } = useTranslation();

	//get stakeholders who belong to a particular project
	const dispatch = useDispatch();
	const stakeholderLocationList = useSelector(
		(state) => state.stakeholderLocationList
	);
	const { loading, error, filtered, stakeholders } = stakeholderLocationList;

	console.log(stakeholders);

	const stakeholderDelete = useSelector((state) => state.stakeholderDelete);
	const { success } = stakeholderDelete;

	useEffect(() => {
		if (success) {
			dispatch(listLocationStakeholders(locationId, keyword));
			dispatch({ type: STAKEHOLDER_DELETE_RESET });
		} else {
			dispatch(listLocationStakeholders(locationId, keyword));
		}
	}, [dispatch, keyword, locationId, success]);

	//delete stakeholder
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
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
					{!filtered && stakeholders && stakeholders.length === 0 ? (
						<Empty
							itemLink={'register'}
							url={url}
							type={'Register'}
							group={'stakeholders'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<h4>Stakeholders</h4>
							<FilterBox searchWord={'UserStakeholders'} />
						</Card.Header>
					)}
					<Card.Body>
						{/* <Card.Body className="card-header-table">
					<div className="card-header-title">Community</div>
					<div className="card-header-title">Project</div>
				</Card.Body> */}
						<Accordion defaultActiveKey={1}>
							{filtered
								? filtered.map((item, index) => (
										<Card className="table-card" key={index}>
											<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
												<div className="card-header-item">
													{item.firstName} {item.lastName}
												</div>
												<div>{item.location && item.location.location}</div>
												<div>{item.project && item.project.projectName}</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('stakeholder.firstName.label')}
																{': '}
																<strong>
																	<Link to={`/stakeholder/${item._id}`}>
																		{item.firstName} {item.lastName}
																	</Link>
																</strong>
																<br />
																{t('stakeholder.email.label')}
																{': '} <strong>{item.email}</strong>
																<br />
																{t('stakeholder.telephone.label')}{' '}
																<strong>{item.telephone}</strong>
																<br />
																{t('stakeholder.register_Date')}
																{': '}
																{item.createdAt.substring(0, 10)}
															</p>
														</div>
														<div className="d-flex align-items-center">
															<Button
																variant="danger"
																className="btn-md ml-3"
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
								  ))
								: stakeholders &&
								  stakeholders.map((item, index) => (
										<Card className="table-card" key={index}>
											<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
												<div className="card-header-item">
													{item.firstName} {item.lastName}
												</div>
												<div>{item.location && item.location.location}</div>
												<div>{item.project && item.project.projectName}</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('stakeholder.firstName.label')}
																{': '}
																<strong>
																	<Link to={`/stakeholder/${item._id}`}>
																		{item.firstName} {item.lastName}
																	</Link>
																</strong>
																<br />
																{t('stakeholder.email.label')}
																{': '} <strong>{item.email}</strong>
																<br />
																{t('stakeholder.telephone.label')}{' '}
																<strong>{item.telephone}</strong>
																<br />
																{t('stakeholder.register_Date')}
																{': '}
																{item.createdAt.substring(0, 10)}
															</p>
														</div>
														<div className="d-flex align-items-center">
															<Button
																variant="danger"
																className="btn-md ml-3"
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
					</Card.Body>
				</>
			)}
		</Card>
	);
});

export default StakeholdersProjectList;
