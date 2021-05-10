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
	listStakeholders,
	deleteStakeholder,
} from '../../../application/actions/stakeholderActions';
import { STAKEHOLDER_DELETE_RESET } from '../../../application/constants/stakeholderConstants';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

const StakeholdersList = memo(({ match, keyword = '' }) => {
	const projectId = match.params.id;
	const { url } = useRouteMatch();

	const { t } = useTranslation();

	//get stakeholders
	const dispatch = useDispatch();
	const stakeholderList = useSelector((state) => state.stakeholderList);
	const { loading, error, filtered, stakeholders } = stakeholderList;

	const stakeholderDelete = useSelector((state) => state.stakeholderDelete);
	const { success } = stakeholderDelete;

	useEffect(() => {
		if (success) {
			dispatch(listStakeholders(projectId, keyword));
			dispatch({ type: STAKEHOLDER_DELETE_RESET });
		} else {
			dispatch(listStakeholders(projectId, keyword));
		}
	}, [dispatch, keyword, projectId, success]);

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
							type={t('tables.stakeholder')}
							group={'stakeholders'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<FilterBox searchWord={'Stakeholders'} />
							<Link to={`${url}/register`} className="btn btn-primary ml-2">
								<i className="fas fa-plus"></i> {t('tables.stakeholder')}
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{filtered
								? filtered.map((item, index) => (
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
														<div className="item-category">Stakeholder</div>
													</div>
												</div>
												<div className="table-card-item">
													<div className="item-one">
														<IconContext.Provider
															value={{ color: '#008cba', size: '2em' }}
														>
															<RiIcons.RiCommunityLine />
														</IconContext.Provider>
													</div>
													<div className="item-two">
														<div>{item.location.location}</div>
														<div className="item-category">Community</div>
													</div>
												</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('stakeholder.firstName.label')}
																{': '}
																<>
																	<Link to={`/stakeholder/${item._id}`}>
																		{item.firstName} {item.lastName}
																	</Link>
																</>
																<br />
																{t('stakeholder.email.label')}
																{': '} <>{item.email}</>
																<br />
																{t('stakeholder.telephone.label')}{' '}
																<>{item.telephone}</>
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
														<div className="item-category">Stakeholder</div>
													</div>
												</div>
												<div className="table-card-item">
													<div className="item-one">
														<IconContext.Provider
															value={{ color: '#008cba', size: '2em' }}
														>
															<RiIcons.RiCommunityLine />
														</IconContext.Provider>
													</div>
													<div className="item-two">
														<div>{item.location.location}</div>
														<div className="item-category">Community</div>
													</div>
												</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																{t('stakeholder.firstName.label')}
																{': '}
																<>
																	<Link to={`/stakeholder/${item._id}`}>
																		{item.firstName} {item.lastName}
																	</Link>
																</>
																<br />
																{t('stakeholder.email.label')}
																{': '} <>{item.email}</>
																<br />
																{t('stakeholder.telephone.label')}{' '}
																<>{item.telephone}</>
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

export default StakeholdersList;
