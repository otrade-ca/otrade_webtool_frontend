import React, { useEffect, useState, memo } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	listStakeholderOrganizations,
	deleteOrganization,
} from '../../../application/actions/organizationAction';
import {
	FilterBox,
	Empty,
	Message,
	Loader,
} from '../../components/HelperComponents';
import { useTranslation } from 'react-i18next';
import { ORGANIZATION_DELETE_REQUEST } from '../../../application/constants/organizationConstants';
import { IconContext } from 'react-icons';
import * as RiIcons from 'react-icons/ri';
import * as VscIcons from 'react-icons/vsc';

const ListStakeholderOrganizations = ({ match }) => {
	const stakeholderId = match.params.id;

	const { url } = useRouteMatch();

	const { t } = useTranslation();

	//get organizations for stakeholder
	const dispatch = useDispatch();
	const organizationStakeholderList = useSelector(
		(state) => state.organizationStakeholderList
	);

	const { loading, error, organizations, filtered } =
		organizationStakeholderList;

	const organizationDelete = useSelector((state) => state.organizationDelete);
	const { success } = organizationDelete;

	//use state
	const [message, setMessage] = useState(null);

	useEffect(() => {
		if (success) {
			dispatch(listStakeholderOrganizations(stakeholderId));
			setMessage('Organization has been successfully deleted.');
			dispatch({ type: ORGANIZATION_DELETE_REQUEST });
		} else {
			dispatch(listStakeholderOrganizations(stakeholderId));
		}
	}, [dispatch, stakeholderId, success, message]);

	//delete user
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteOrganization(id));
		}
	};

	return (
		<Card className="my-card">
			{message && <Message>{message}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					{organizations && organizations.length === 0 ? (
						<Empty
							itemLink={'register'}
							url={url}
							type={'Organization'}
							group={'organizations'}
						/>
					) : (
						<Card.Header className="my-card-header">
							<FilterBox searchWord={'StakeholderOrganizations'} />
							<Link
								to={`organizations/register`}
								className="btn btn-primary ml-2"
							>
								<i className="fas fa-plus"></i> Organization
							</Link>
						</Card.Header>
					)}
					<Card.Body>
						<Accordion defaultActiveKey={1}>
							{filtered
								? filtered.map((item, index) => (
										<Card className="table-card" key={index}>
											<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
												<div className="table-card-item">
													<div className="item-one">
														<IconContext.Provider
															value={{ color: '#008cba', size: '2em' }}
														>
															<VscIcons.VscOrganization />
														</IconContext.Provider>
													</div>
													<div className="item-two">
														<div>{item.name}</div>
														<div className="item-category">Organization</div>
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
													{item.location ? (
														<div className="item-two">
															<div>{item.location.location}</div>
															<div className="item-category">Community</div>
														</div>
													) : null}
												</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																<>
																	<Link to={`${url}/${item._id}/view`}>
																		{item.name}
																	</Link>
																</>
																<br />
																<>{item.address}</>
																<br />
																<>{item.email}</>
																<br />
																<>{item.telephone}</>
															</p>
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
								  ))
								: organizations &&
								  organizations.map((item, index) => (
										<Card className="table-card" key={index}>
											<Accordion.Toggle as={Card.Header} eventKey={index + 1}>
												<div className="table-card-item">
													<div className="item-one">
														<IconContext.Provider
															value={{ color: '#008cba', size: '2em' }}
														>
															<VscIcons.VscOrganization />
														</IconContext.Provider>
													</div>
													<div className="item-two">
														<div>{item.name}</div>
														<div className="item-category">Organization</div>
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
													{item.location ? (
														<div className="item-two">
															<div>{item.location.location}</div>
															<div className="item-category">Community</div>
														</div>
													) : null}
												</div>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey={index + 1}>
												<Card.Body>
													<div className="d-flex justify-content-between">
														<div>
															<p>
																<>
																	<Link to={`${url}/${item._id}/view`}>
																		{item.name}
																	</Link>
																</>
																<br />
																<>{item.address}</>
																<br />
																<>{item.email}</>
																<br />
																<>{item.telephone}</>
															</p>
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

export default memo(ListStakeholderOrganizations);
